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
 * /api/v1/customized-workout/create:
 *   post:
 *     summary: Create a customized workout plan
 *     description: Creates a personalized workout based on user's profile and fitness level
 *     tags: [CustomWorkouts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - level
 *               - gender
 *               - age
 *               - weight
 *             properties:
 *               level:
 *                 type: string
 *                 enum: [Beginner, Intermediate, Advanced]
 *                 example: "Intermediate"
 *               gender:
 *                 type: string
 *                 enum: [Male, Female]
 *                 example: "Male"
 *               age:
 *                 type: integer
 *                 minimum: 13
 *                 maximum: 100
 *                 example: 30
 *               weight:
 *                 type: integer
 *                 minimum: 30
 *                 maximum: 300
 *                 example: 75
 *     responses:
 *       201:
 *         description: Custom workout created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CustomWorkout'
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized: Missing token"
 *       409:
 *         description: Conflict - User already has a custom workout
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "You already have a customized workout"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Failed to generate customized workout"
 *
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     CustomWorkout:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: "Customized workout created successfully"
 *         data:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *               example: "507f1f77bcf86cd799439011"
 *             name:
 *               type: string
 *               example: "Custom Intermediate Workout"
 *             exercises:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Exercise'
 *             workoutType:
 *               type: string
 *               example: "custom"
 *     Exercise:
 *       type: object
 *       properties:
 *         exerciseId:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               example: "Push-ups"
 *             target:
 *               type: string
 *               example: "chest"
 *             bodyPart:
 *               type: string
 *               example: "upper body"
 *             equipment:
 *               type: string
 *               example: "body weight"
 *             gifUrl:
 *               type: string
 *               example: "http://example.com/pushup.gif"
 *         sets:
 *           type: number
 *           example: 3
 *         reps:
 *           type: number
 *           example: 12
 * /api/v1/customized-workout/all:
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
 * /api/v1/customized-workout/{id}:
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


