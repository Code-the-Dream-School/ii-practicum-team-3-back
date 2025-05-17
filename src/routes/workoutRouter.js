import express from "express";
import {
    getAllWorkouts,
    getWorkoutById
} from "../controllers/workoutController.js"

const router = express.Router();


/**
 * @swagger
 * /api/workouts:
 *   get:
 *     summary: Get all workouts
 *     tags: [Workouts]
 *     responses:
 *       200:
 *         description: A list of all workouts
 */

router.get("/", getAllWorkouts );


/**
 * @swagger
 * /api/workouts/{id}:
 *   get:
 *     summary: Get a workout by ID
 *     tags: [Workouts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The workout ID
 *     responses:
 *       200:
 *         description: A workout object
 *       404:
 *         description: Workout not found
 */

router.get("/:id", getWorkoutById);


export default router;