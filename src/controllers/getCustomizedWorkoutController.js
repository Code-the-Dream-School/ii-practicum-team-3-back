import { StatusCodes } from 'http-status-codes';
import Workout from '../models/WorkoutModel.js';
import User from '../models/UserModel.js';

const getCustomizedWorkout = async (req, res) => {
  try {
    const userId = req.user.id;
    let { age, weight, level, gender, target } = req.body;

    // Get and update user data
    const userUpdate = {};
    if (age) userUpdate.age = age;
    if (weight) userUpdate.weight = weight;
    if (level) userUpdate.fitnessLevel = level;
    if (gender) userUpdate.gender = gender;


    if (Object.keys(userUpdate).length > 0) {
      await User.findByIdAndUpdate(userId, userUpdate, { new: true });
    }

    const user = await User.findById(userId).select('age weight fitnessLevel gender');
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: 'User not found',
      });
    }

    age = age || user.age;
    weight = weight || user.weight;
    level = level || user.fitnessLevel;
    gender = gender || user.gender;

    if (!age || !weight || !level || !gender) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: 'Missing required parameters. Please complete your profile.',
      });
    }

    const workoutQuery = {
      isTemplate: true,
      gender,
      level,
      'age.from': { $lte: age },
      'age.to': { $gte: age },
      'weight.from': { $lte: weight },
      'weight.to': { $gte: weight },
    };

    if (target) {
      workoutQuery.target = target;
    }

    const matchedWorkouts = await Workout.find(workoutQuery)
      .populate({
        path: 'exercises.exerciseId',
        select: 'name target bodyPart equipment gifUrl instructions',
      })
      .lean();

    
    if (matchedWorkouts.length === 0) {
      const fallbackQuery = {
        isTemplate: true,
        gender,
        level,
        $or: [
          { 'age.from': { $lte: age + 5 } },
          { 'weight.from': { $lte: weight + 10 } },
        ],
      };

      const fallbackWorkouts = await Workout.find(fallbackQuery)
        .populate({
          path: 'exercises.exerciseId',
          select: 'name target bodyPart equipment gifUrl instructions',
        })
        .limit(3)
        .lean();

      if (fallbackWorkouts.length > 0) {
        return res.status(StatusCodes.OK).json({
          success: true,
          message: 'Showing closest matching workouts',
          data: formatWorkouts(fallbackWorkouts),
        });
      }

      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: 'No suitable workouts found for your profile',
      });
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      data: formatWorkouts(matchedWorkouts),
      userProfile: {
        age,
        weight,
        level,
        gender,
      },
    });
  } catch (error) {
    console.error('Error in getCustomizedWorkout:', error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to generate customized workout',
    });
  }
};

function formatWorkouts(workouts) {
  return workouts.map((workout) => ({
    id: workout._id,
    name: workout.name,
    description: workout.description,
    level: workout.level,
    target: workout.target,
    exercises: workout.exercises.map((ex) => ({
      name: ex.exerciseId.name,
      target: ex.exerciseId.target,
      bodyPart: ex.exerciseId.bodyPart,
      equipment: ex.exerciseId.equipment,
      gifUrl: ex.exerciseId.gifUrl,
      sets: ex.sets,
      reps: ex.reps,
      instructions: ex.exerciseId.instructions,
    })),
  }));
}

export default getCustomizedWorkout;
