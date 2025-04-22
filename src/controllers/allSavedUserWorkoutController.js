import Workout from "../models/WorkoutModel.js";
import { StatusCodes } from "http-status-codes";

const getUserSavedWorkouts = async (req, res) => {
  try {
    // Auth
    if (!req.user?.id) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ 
        message: "Unauthorized: User ID missing" 
      });
    }

    const userId = req.user.id;
    console.log("Fetching workouts for user:", userId);

    // Find and populate
    const workouts = await Workout.find(
      { createdBy: userId, isTemplate: false },
      { __v: 0 }
    ).populate({
      path: "exercises.exerciseId",
      select: "-__v" 
    });

    const formattedWorkouts = workouts.map(workout => ({
      ...workout.toObject(),
      exercises: workout.exercises.map(ex => ({
        ...ex,
        exerciseName: ex.exerciseId?.name,
        exerciseTarget: ex.exerciseId?.target,
        bodyPart: ex.exerciseId?.bodyPart,
        equipment: ex.exerciseId?.equipment,
        gifUrl: ex.exerciseId?.gifUrl,
        secondaryMuscles: ex.exerciseId?.secondaryMuscles,
        instructions: ex.exerciseId?.instructions,
        exerciseId: ex.exerciseId?._id
      }))
    }));

    res.status(StatusCodes.OK).json({
        success: true,
        count: workouts.length,
        data: formattedWorkouts
    });

  } catch (error) {
    console.error("Error fetching user workouts:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Failed to fetch workouts",
      error: process.env.NODE_ENV === "development" ? error.message : undefined
    });
  }
};

export default getUserSavedWorkouts;