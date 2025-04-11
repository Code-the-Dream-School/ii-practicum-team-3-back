import Exercise from "../models/ExerciseModel.js";

// Get all exercises
export const getAllExercises = async (req, res) => {
  try {
    const { name, bodyPart, equipment, target} = req.query;
    let result = await Exercise.find();

    if (name) {
      result = result.filter((ex) =>
        ex.name.toLowerCase().includes(name.toLowerCase())
      );
    }

    if (bodyPart) {
      result = result.filter(
        (ex) => ex.bodyPart.toLowerCase() === bodyPart.toLowerCase()
      );
    }

    if (equipment) {
      result = result.filter(
        (ex) =>
          ex.equipment.toLowerCase() === equipment.toLowerCase()
      );
    }

    if (target) {
      result = result.filter(
        (ex) => ex.target.toLowerCase() === target.toLowerCase()
      );
    }

    res.json({
      success: true,
      count: result.length,
      data: result,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};



