import express from "express";
import {
  getAllFavoriteExercises,
  addFavoriteExercise,
  removeFavoriteExercise,
} from "../controllers/exerciseController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import userValidater from "../middleware/userValidator.js";

const router = express.Router();

// /**
//  * @swagger
//  * tags:
//  *   name: Favorites
//  *   description: Manage user's favorite exercises
//  * /api/v1/favorites:
//  *   get:
//  *     summary: Get all favorite exercises of authenticated user
//  *     tags: [Favorites]
//  *     security:
//  *       - bearerAuth: []
//  *     responses:
//  *       200:
//  *         description: List of favorite exercises
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: array
//  *               items:
//  *                 type: object
//  *                 properties:
//  *                   exerciseId:
//  *                     type: string
//  *                     example: "abc123"
//  *                   name:
//  *                     type: string
//  *                     example: "Push-up"
//  *                   description:
//  *                     type: string
//  *                     example: "A basic push-up exercise"
//  *       401:
//  *         description: Unauthorized - missing or invalid token

//  * /api/v1/favorites/{exerciseId}:
//  *   post:
//  *     summary: Add an exercise to favorites
//  *     tags: [Favorites]
//  *     security:
//  *       - bearerAuth: []
//  *     parameters:
//  *       - in: path
//  *         name: exerciseId
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: ID of the exercise to add to favorites
//  *     responses:
//  *       200:
//  *         description: Exercise added to favorites
//  *       401:
//  *         description: Unauthorized - missing or invalid token
//  *       404:
//  *         description: Exercise not found
//  *
//  *   delete:
//  *     summary: Remove an exercise from favorites
//  *     tags: [Favorites]
//  *     security:
//  *       - bearerAuth: []
//  *     parameters:
//  *       - in: path
//  *         name: exerciseId
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: ID of the exercise to remove from favorites
//  *     responses:
//  *       200:
//  *         description: Exercise removed from favorites
//  *       401:
//  *         description: Unauthorized - missing or invalid token
//  *       404:
//  *         description: Exercise not found
//  */


/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Exercise:
 *       type: object
 *       properties:
 *         exerciseId:
 *           type: string
 *           example: "507f1f77bcf86cd799439011"
 *         name:
 *           type: string
 *           example: "Push-up"
 *         description:
 *           type: string
 *           example: "A basic upper body exercise"
 *         bodyPart:
 *           type: string
 *           example: "chest"
 *         equipment:
 *           type: string
 *           example: "body weight"
 *         gifUrl:
 *           type: string
 *           example: "http://example.com/exercise.gif"
 *     Error:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Error message"
 */

/**
 * @swagger
 * tags:
 *   name: Favorites
 *   description: Manage user's favorite exercises
 */

/**
 * @swagger
 * /api/v1/favorites:
 *   get:
 *     summary: Get all favorite exercises
 *     description: Returns all favorite exercises for authenticated user
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
 *                 $ref: '#/components/schemas/Exercise'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /api/v1/favorites/{exerciseId}:
 *   post:
 *     summary: Add exercise to favorites
 *     description: Add an exercise to user's favorites
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: exerciseId
 *         schema:
 *           type: string
 *           format: mongoId
 *           example: "507f1f77bcf86cd799439011"
 *         required: true
 *         description: MongoDB ID of the exercise
 *     responses:
 *       200:
 *         description: Exercise added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Exercise added to favorites"
 *       400:
 *         description: Exercise already in favorites
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Exercise not found
 *       500:
 *         description: Internal server error
 * 
 *   delete:
 *     summary: Remove exercise from favorites
 *     description: Remove an exercise from user's favorites
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: exerciseId
 *         schema:
 *           type: string
 *           format: mongoId
 *           example: "507f1f77bcf86cd799439011"
 *         required: true
 *         description: MongoDB ID of the exercise
 *     responses:
 *       200:
 *         description: Exercise removed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Exercise removed from favorites"
 *       400:
 *         description: Exercise not in favorites
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Exercise not found
 *       500:
 *         description: Internal server error
 */


router.use(authMiddleware, userValidater);

router.get("/", getAllFavoriteExercises);
router.post("/:exerciseId", addFavoriteExercise);
router.delete("/:exerciseId", removeFavoriteExercise);

export default router;
