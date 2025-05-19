import express from "express";
import updateUserProfile from "../controllers/updateUserProfileController.js";
import authenticateUser from "../middleware/authMiddleware.js";
import {
  validateProfileUpdate,
  handleValidationErrors,
} from "../middleware/updateUserProfileValidator.js";
const router = express.Router();




/**
 * @swagger
 * /api/v1/profile:
 *   patch:
 *     summary: Update user profile
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Fields to update in the user profile
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               gender:
 *                 type: string
 *                 enum: [Male, Female]
 *                 example: Male
 *               age:
 *                 type: integer
 *                 minimum: 10
 *                 maximum: 100
 *                 example: 28
 *               weight:
 *                 type: number
 *                 minimum: 30
 *                 maximum: 300
 *                 example: 75.5
 *               fitnessLevel:
 *                 type: string
 *                 enum: [Beginner, Intermediate, Advanced]
 *                 example: Intermediate
 *             minProperties: 1
 *     responses:
 *       200:
 *         description: User profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 user:
 *                   type: object
 *                   description: Updated user data
 *       400:
 *         description: Validation errors or bad request
 *       401:
 *         description: Unauthorized (invalid or missing token)
 */


router.patch(
  "/",
  authenticateUser,
  validateProfileUpdate,
  handleValidationErrors,
  updateUserProfile
);

export default router;


