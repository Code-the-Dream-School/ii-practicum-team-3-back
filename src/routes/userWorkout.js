import express from 'express';
import { saveWorkoutForUser } from '../controllers/saveWorkoutController.js';
import authMiddleware from '../middleware/authMiddleware.js'; 
import getSavedWorkouts from '../controllers/allSavedUserWorkoutController.js'
import deleteUserWorkout from "../controllers/deleteUserWorkout.js"

const router = express.Router();




/**
 * @swagger
 * tags:
 *   name: SavedWorkouts
 *   description: Operations related to saving and managing user workouts
 */

/**
 * @swagger
 * /api/v1/saved-workouts/{workoutId}:
 *   post:
 *     summary: Save a workout for the authenticated user
 *     tags: [SavedWorkouts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: workoutId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the workout to save
 *     responses:
 *       200:
 *         description: Workout saved successfully
 *       401:
 *         description: Unauthorized - user must be logged in
 *       404:
 *         description: Workout not found
 */

/**
 * @swagger
 * /api/v1/saved-workouts/all:
 *   get:
 *     summary: Get all saved workouts for the authenticated user
 *     tags: [SavedWorkouts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of saved workouts
 *       401:
 *         description: Unauthorized - user must be logged in
 */

/**
 * @swagger
 * /api/v1/saved-workouts/{workoutId}:
 *   delete:
 *     summary: Delete a saved workout for the authenticated user
 *     tags: [SavedWorkouts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: workoutId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the saved workout to delete
 *     responses:
 *       200:
 *         description: Workout deleted successfully
 *       401:
 *         description: Unauthorized - user must be logged in
 *       404:
 *         description: Saved workout not found
 */

router.post(
  '/:workoutId',
  authMiddleware, 
  saveWorkoutForUser 
);
router.get("/all", authMiddleware, getSavedWorkouts);
router.delete(
  '/:workoutId',
  authMiddleware,
  deleteUserWorkout
);
export default router;

