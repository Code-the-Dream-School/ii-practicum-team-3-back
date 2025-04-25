import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js'; 
import getCustomizedWorkout  from '../controllers/getCustomizedWorkoutController.js';

const router = express.Router();

// Route to get customized workout
router.post('/', authMiddleware, getCustomizedWorkout);

export default router;