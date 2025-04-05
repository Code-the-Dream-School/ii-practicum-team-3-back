import User from "../models/UserModel.js";
import {
  getUserById,
  findByEmail,
  createUser,
  updateUser,
} from "../../services/userService.js";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const loginAttempts = {};
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000;
const LOCK_TIME = 15 * 60 * 1000;

async function register(req, res) {
  try {
    const { email, password, firstName, lastName } = req.body;

    if (!email || !password || !firstName || !lastName) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Please provide all required fields" });
    }

    const existingUser = await findByEmail(email);
    if (existingUser) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Email or user already exists" });
    }

    const newUserData = {
      email,
      password,
      firstName,
      lastName,
    };

    const user = await createUser(newUserData);

    const accessToken = user.createJWT();
    const refreshToken = user.createRefreshToken();

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(StatusCodes.CREATED).json({
      user: {
        id: user._id.toString(),
        firstName: user.firstName,
        lastName: user.lastName,
      },
      accessToken,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: error.message });
    }
    console.error("Register error:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Registration failed" });
  }
}
// i think we should to use a Redis . I can change this login for that .
async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Email and password are required" });
    }
    const ip = req.ip;
    const now = Date.now();

    if (
      loginAttempts[ip] &&
      loginAttempts[ip].lockUntil &&
      now < loginAttempts[ip].lockUntil
    ) {
      return res
        .status(StatusCodes.TOO_MANY_REQUESTS)
        .json({ message: "Too many login attempts. Please try again later." });
    }

    const user = await findByEmail(email, true);
    if (!user || !(await user.comparePassword(password))) {
      if (!loginAttempts[ip]) {
        loginAttempts[ip] = { count: 1, firstAttempt: now };
      } else {
        if (now - loginAttempts[ip].firstAttempt > WINDOW_MS) {
          loginAttempts[ip].count = 1;
          loginAttempts[ip].firstAttempt = now;
          delete loginAttempts[ip].lockUntil;
        } else {
          loginAttempts[ip].count += 1;
        }
      }

      if (loginAttempts[ip].count >= MAX_ATTEMPTS) {
        loginAttempts[ip].lockUntil = now + LOCK_TIME;
        return res.status(StatusCodes.TOO_MANY_REQUESTS).json({
          message: "Too many login attempts. Please try again later.",
        });
      }
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Invalid credentials" });
    }

    if (loginAttempts[ip]) {
      delete loginAttempts[ip];
    }

    const accessToken = user.createJWT();
    const refreshToken = user.createRefreshToken();

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(StatusCodes.OK).json({
      user: {
        id: user._id.toString(),
        firstName: user.firstName,
        lastName: user.lastName,
      },
      accessToken,
    });
  } catch (error) {
    console.error("Login error:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Login failed" });
  }
}

async function logout(req, res) {
  try {
    const { refreshToken } = req.cookies;
    if (refreshToken) {
      try {
        const decoded = jwt.verify(
          refreshToken,
          process.env.JWT_REFRESH_SECRET
        );

        await updateUser(decoded.userId, { refreshToken: "" });
      } catch (err) {}
    }
    res.clearCookie("refreshToken", { httpOnly: true, sameSite: "Strict" });
    return res
      .status(StatusCodes.OK)
      .json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Logout failed" });
  }
}

async function refresh(req, res) {
  const token = req.cookies.refreshToken;

  if (!token) {
    return res.status(401).json({ message: "No refresh token provided" });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const user = await getUserById(payload.userId, true);

    if (!user || user.refreshToken !== token) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const newAccessToken = user.createJWT();
    res.status(200).json({ accessToken: newAccessToken });
  } catch (err) {
    console.error("Refresh token error:", err);
    res.status(403).json({ message: "Token expired or invalid" });
  }
}

export { register, login, logout, refresh };
