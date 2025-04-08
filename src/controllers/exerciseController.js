import Exercise from "../models/ExerciseModel.js";


// Get all exercises
export const getAllExercises = async (req, res) => {
    try {
        const exercises = await Exercise.find();
        res.json(exercises)
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
}

// Get exercises by body part
export const getExercisesByBodyPart = async (req, res) => {
    try {
        const exercises = await Exercise.find({ bodyPart: req.params.bodyPart});
        res.json(exercises)
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
};

// Get exercises by equipment
export const getExercisesByEquipment = async (req, res) => {
    try {
        const exercises = await Exercise.find ({ equipment: req.params.equipment })
        res.json(exercises)
    } catch(error) {
        res.status(500).json({ message: error.message });
    }
};

// Search exercises by name
export const searchExercises = async (req, res) => {
    try {
      const searchTerm = req.query.name;
      const exercises = await Exercise.find({
        name:  { $regex: searchTerm, $options: "i" },
      });
      res.json(exercises);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get exercises by target muscle
export const getExercisesByTargetMuscle = async (req, res) => {
    try{
        const exercises = await Exercise.find( {target: req.params.target });
        res.json(exercises)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


