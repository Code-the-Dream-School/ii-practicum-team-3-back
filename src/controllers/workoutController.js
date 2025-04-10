import mongoose from "mongoose";
import Exercise from "../models/ExerciseModel.js";
import Workout from "../models/WorkoutModel.js";


const generateWorkout = async () => {
  try {
 
    const exercises = await Exercise.find({ target: "chest" }).limit(5);
    const workoutExercises = exercises.map((ex) => ({
      exerciseId: ex.id,
      sets: 3,
      reps: 10,
    }));

    const newWorkout = new Workout({
      name: "Chest Focus Beginner Workout",
      description: "Beginner workout focused on chest muscles",
      exercises: workoutExercises,
      gender: "Male",
      age: { from: 20, to: 35 },
      weight: { from: 60, to: 85 },
      level: "Beginner",
      createdBy: new mongoose.Types.ObjectId("660702f7c84e0b23de61e111") 
    });

    await newWorkout.save();
    console.log("Workout created:", newWorkout);
  } catch (error) {
    console.error("Error generating workout:", error);
  } finally {
    mongoose.disconnect();
  }
};

generateWorkout();
