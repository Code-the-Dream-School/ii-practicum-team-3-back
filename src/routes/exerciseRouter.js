import express from "express";
import {
  getAllExercises,
  getExercisesByBodyPart,
  getExercisesByEquipment,
  searchExercises,
  getExercisesByTargetMuscle,
} from "../controllers/exerciseController.js";

const router = express.Router();

router.get("/", getAllExercises );
router.get("/bodyPart/:bodyPart", getExercisesByBodyPart );
router.get("/equipment/:equipment", getExercisesByEquipment );
router.get("/search", searchExercises);
router.get("/target/:target", getExercisesByTargetMuscle);

export default router;