import express from "express";
import updateUserProfile from "../controllers/updateUserProfileController.js";
import authenticateUser from "../middleware/authMiddleware.js";

const router = express.Router();

router.patch("/profile", authenticateUser, updateUserProfile);

export default router;
