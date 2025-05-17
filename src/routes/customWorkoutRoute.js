import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js'; 
import {
    createCustomizedWorkout,
    getCustomWorkouts,
    saveCustomWorkout,
    deleteCustomWorkout
}
    from '../controllers/customWorkoutController.js';
import { handleValidationErrors , validateWorkoutParams} from '../middleware/workoutValidator.js';

const router = express.Router();




/**
 * @swagger
 * /customized-workout/create:
 *   post:
 *     summary: Create a customized workout
 *     tags: [CustomWorkouts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Morning Full Body"
 *               exercises:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     exerciseId:
 *                       type: string
 *                     sets:
 *                       type: integer
 *                     reps:
 *                       type: integer
 *             required:
 *               - name
 *               - exercises
 *     responses:
 *       201:
 *         description: Customized workout created successfully
 *       400:
 *         description: Validation error
 * 
 * /api/custom-workouts/save/{id}:
 *   post:
 *     summary: Save a customized workout for user
 *     tags: [CustomWorkouts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Customized workout ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Workout saved successfully
 *       401:
 *         description: Unauthorized
 * 
 * /api/custom-workouts/all:
 *   get:
 *     summary: Get all customized workouts for authenticated user
 *     tags: [CustomWorkouts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of customized workouts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   exercises:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         exerciseId:
 *                           type: string
 *                         sets:
 *                           type: integer
 *                         reps:
 *                           type: integer
 *       401:
 *         description: Unauthorized
 * 
 * /api/custom-workouts/{id}:
 *   delete:
 *     summary: Delete a customized workout
 *     tags: [CustomWorkouts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Customized workout ID to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Workout deleted successfully
 *       401:
 *         description: Unauthorized
 */

// Route to create customized workout
router.post('/create', 
    authMiddleware, 
    ...validateWorkoutParams,
    handleValidationErrors,
    createCustomizedWorkout);


// Route to save customized workout    

router.post("/save/:id", authMiddleware, saveCustomWorkout);     

// Get customized workout

router.get("/all", authMiddleware, getCustomWorkouts); 

// Route to delete customized workout

router.delete("/:id", authMiddleware, deleteCustomWorkout);    

export default router;


