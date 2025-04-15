import Workout from "../models/WorkoutModel.js";

export const getAllWorkouts = async (req, res) => {
  try {
    const {
      isTemplate,  
      userId,      
      search,      
      level,
      gender,
      ageFrom,
      ageTo,
      weightFrom,
      weightTo,
      page = 1,
      limit = 10
    } = req.query;

    const query = {};

    if (isTemplate !== undefined) {
      query.isTemplate = isTemplate === 'true';
    }

    if (userId) {
      query.createdBy = userId;
    }

    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    if (level) {
      query.level = level;
    }

    if (gender) {
      query.gender = gender;
    }

    if (ageFrom || ageTo) {
      query["age.from"] = ageFrom ? { $gte: Number(ageFrom) } : undefined;
      query["age.to"] = ageTo ? { $lte: Number(ageTo) } : undefined;
    }

    if (weightFrom || weightTo) {
      query["weight.from"] = weightFrom ? { $gte: Number(weightFrom) } : undefined;
      query["weight.to"] = weightTo ? { $lte: Number(weightTo) } : undefined;
    }

    const skip = (page - 1) * limit;

    // Fetch workouts with pagination and optional filters
    const workouts = await Workout.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("createdBy", "email")
      .populate("exercises.exerciseId")  // Populate exercises' full details
      .lean();

    // Get total count for pagination
    const total = await Workout.countDocuments(query);
    const totalPages = Math.ceil(total / limit);

    const response = {
      success: true,
      count: workouts.length,
      currentPage: page,
      totalPages,
      data: workouts.map(workout => ({
        id: workout._id,
        name: workout.name,
        description: workout.description,
        exerciseCount: workout.exercises?.length || 0,
        isTemplate: workout.isTemplate,
        level: workout.level,
        gender: workout.gender,
        age: workout.age,       // { from, to }
        weight: workout.weight, // { from, to }
        createdBy: workout.createdBy?._id || null,
        createdAt: workout.createdAt,
        originalWorkoutId: workout.originalWorkoutId || null,
        exercises: workout.exercises.map(ex => ({
          exerciseId: ex.exerciseId._id, // populated exerciseId details
          sets: ex.sets,
          reps: ex.reps,
          exerciseName: ex.exerciseId.name, // exercise name from populated data
          exerciseTarget: ex.exerciseId.target // target muscle group
        }))
      }))
    };

    res.status(200).json(response);

  } catch (error) {
    console.error("Error fetching workouts:", error.message);
    res.status(500).json({
      success: false,
      message: "Error fetching workouts:",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};
