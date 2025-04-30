import { body, validationResult } from 'express-validator';

export const validateWorkoutParams = [
    body('age')
    .isInt({ min: 10, max: 100 })
    .withMessage('Age must be integer between 10-100')
    .toInt(),
    
  body('weight')
    .isFloat({ min: 30, max: 300 })
    .withMessage('Weight must be number between 30-300 kg')
    .toFloat(),
    
  body('level')
    .isIn(['beginner', 'intermediate', 'advanced'])
    .withMessage('Invalid workout level'),
    
  body('gender')
    .isIn(['male', 'female', 'other'])
    .withMessage('Invalid gender specified'),
    
];

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      success: false,
      errors: errors.array() 
    });
  }
  next();
};