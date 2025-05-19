import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  getUserInfo,
  getUsersCount,
} from "../controllers/userInfoController.js";

const router = express.Router();



/**
 * @swagger
 * /api/v1/user/profile:
 *   get:
 *     summary: Get authenticated user's profile info
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved user profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                   example: 67e0618f1eece49be5f7d290
 *                 username:
 *                   type: string
 *                   example: johndoe
 *                 email:
 *                   type: string
 *                   example: johndoe@example.com
 *           
 *       401:
 *         description: Unauthorized - missing or invalid token
 */

/**
 * @swagger
 * /api/v1/user/count:
 *   get:
 *     summary: Get total count of registered users
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Successfully retrieved users count
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                   example: 150
 */


router.get("/profile", authMiddleware, getUserInfo);
router.get("/count", getUsersCount);

export default router;



