import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  getUserInfo,
  getUsersCount,
} from "../controllers/userInfoController.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/profile", getUserInfo);
router.get("/count", getUsersCount);

export default router;
