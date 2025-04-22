import express from 'express';
import { saveWorkoutForUser } from '../controllers/saveWorkoutController.js';
import authMiddleware from '../middleware/authMiddleware.js'; 
import getSavedWorkouts from '../controllers/allSavedUserWorkoutController.js'
import deleteUserWorkout from "../controllers/deleteUserWorkout.js"

const router = express.Router();


router.post(
  '/:workoutId/save',
  authMiddleware, 
  saveWorkoutForUser 
);
router.get("/saved", authMiddleware, getSavedWorkouts);
router.delete(
  '/saved/:workoutId',
  authMiddleware,
  deleteUserWorkout
);
export default router;