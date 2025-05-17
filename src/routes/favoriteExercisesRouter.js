import express from "express";
import {
  getAllFavoriteExercises,
  addFavoriteExercise,
  removeFavoriteExercise,
} from "../controllers/exerciseController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import userValidater from "../middleware/userValidator.js";

const router = express.Router();



/**
 * @swagger
 * /api/favorites:
 *   get:
 *     summary: Get all favorite exercises of authenticated user
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of favorite exercises
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   exerciseId:
 *                     type: string
 *                     example: "abc123"
 *                   name:
 *                     type: string
 *                     example: "Push-up"
 *                   description:
 *                     type: string
 *                     example: "A basic push-up exercise"
 *       401:
 *         description: Unauthorized - missing or invalid token
 * 
 *   post:
 *     summary: Add an exercise to favorites
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: exerciseId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the exercise to add to favorites
 *     responses:
 *       200:
 *         description: Exercise added to favorites
 *       401:
 *         description: Unauthorized - missing or invalid token
 *       404:
 *         description: Exercise not found
 * 
 *   delete:
 *     summary: Remove an exercise from favorites
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: exerciseId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the exercise to remove from favorites
 *     responses:
 *       200:
 *         description: Exercise removed from favorites
 *       401:
 *         description: Unauthorized - missing or invalid token
 *       404:
 *         description: Exercise not found
 */

router.use(authMiddleware, userValidater);

router.get("/", getAllFavoriteExercises);
router.post("/:exerciseId", addFavoriteExercise);
router.delete("/:exerciseId", removeFavoriteExercise);

export default router;

