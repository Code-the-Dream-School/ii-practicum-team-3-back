import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js'; 
import createCustomizedWorkout  from '../controllers/createCustomizedWorkoutController.js';
import { handleValidationErrors } from '../middleware/workoutValidator.js';

const router = express.Router();

// Route to get customized workout
router.post('/', 
    authMiddleware, 
    handleValidationErrors,
    createCustomizedWorkout);

export default router;