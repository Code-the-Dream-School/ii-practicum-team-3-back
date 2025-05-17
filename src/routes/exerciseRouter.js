


/**
 * @swagger
 * /api/v1/exercises:
 *   get:
 *     summary: Get all exercises
 *     tags: [Exercises]
 *     responses:
 *       200:
 *         description: A list of exercises
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "exercise123"
 *                   name:
 *                     type: string
 *                     example: "Push-up"
 *                   description:
 *                     type: string
 *                     example: "A basic push-up exercise"
 */

import express from "express";
import {
  getAllExercises,
} from "../controllers/exerciseController.js";

const router = express.Router();



router.get("/", getAllExercises );


export default router;

