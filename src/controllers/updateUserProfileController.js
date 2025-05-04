import User from "../models/UserModel.js";
import { StatusCodes } from "http-status-codes";

async function updateUserProfile(req, res) {
  const userId = req.user.id;
  const { gender, age, weight, fitnessLevel } = req.body;

  if (!gender || !age || !weight || !fitnessLevel) {
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
  user.fitnessLevel = fitnessLevel;

  await user.save();

  res.status(StatusCodes.OK).json({
    success: true,
    message: "Profile updated",
    shouldRegenerateCustomWorkout: true,
  });
}

export default updateUserProfile;
