import mongoose from "mongoose";


const WorkoutSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    exercises: [
      {
        exercise: { type: mongoose.Schema.Types.ObjectId, ref: "Exercise" },
        sets: { type: Number, default: 3 },
        reps: { type: Number, default: 10 },
      },
    ],
    gender: {
        type: String, 
        enum: ["Male", "Female"], 
        required: true
    },
    age: {
        from: { type: Number, required: true },
        to: { type: Number, required: true },
    },

    weight: {
        from: { type: Number, required: true },
        to: { type: Number, required: true },        

    },
    level: {
        type: String, 
        enum: ["Beginner","Intermediate", "Advanced"], 
        required: true 
    },

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });

   const Workout = mongoose.model("Workout", WorkoutSchema);
    export default Workout;