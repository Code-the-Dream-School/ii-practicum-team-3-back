import User from "../models/UserModel.js";
import { StatusCodes } from "http-status-codes";

async function updateUserProfile(req, res) {
  const userId = req.user.userId;
  const { gender, age, weight, level } = req.body;

  if (!gender || !age || !weight || !level) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "Please provide all required fields",
    });
  }

  const user = await User.findById(userId);
  if (!user) {
    return res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      message: "User not found",
    });
  }

  user.gender = gender;
  user.age = age;
  user.weight = weight;
  user.level = level;

  await user.save();

  res.status(StatusCodes.OK).json({
    success: true,
    message: "Profile updated",
    shouldRegenerateCustomWorkout: true,
  });
}

export default updateUserProfile;
