import Exercise from "../models/ExerciseModel.js";
import { StatusCodes } from "http-status-codes"; 

// Get all exercises

export const getAllExercises = async (req, res) => {
  try {
    const { name, bodyPart, equipment, target, secondaryMuscles } = req.query;
    const filters = {};

    if (name) {
      filters.name = { $regex: new RegExp(name, "i") };
    }

    if (bodyPart) {
      filters.bodyPart = { $regex: new RegExp(bodyPart, "i") };
    }

    if (equipment) {
      filters.equipment = { $regex: new RegExp(equipment, "i") };
    }

    if (target) {
      filters.target = { $regex: new RegExp(target, "i") };
    }

    if (secondaryMuscles) {
      filters.secondaryMuscles = { $regex: new RegExp(secondaryMuscles, "i") };
    }

    // respond

    const result = await Exercise.find(filters);

    res.json({
      success: true,
      count: result.length,
      data: result,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Server error",
    });
  }
};
