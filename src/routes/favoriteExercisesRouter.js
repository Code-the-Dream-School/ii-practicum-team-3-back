import express from "express";
import {
  getAllFavoriteExercises,
  addFavoriteExercise,
  removeFavoriteExercise,
} from "../controllers/exerciseController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getAllFavoriteExercises);

router.post("/:exerciseId", authMiddleware, addFavoriteExercise);

router.delete("/:exerciseId", authMiddleware, removeFavoriteExercise);

export default router;
