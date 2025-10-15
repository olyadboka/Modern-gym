import express from 'express';
import {
  getAllTrainers,
  getTrainerById,
  createTrainer,
  updateTrainer,
  deleteTrainer,
  getTrainerSpecializations
} from '../controllers/trainerController.js';
import { authenticateToken, authorizeRoles } from '../middlewares/auth.js';
import { validateTrainer } from '../middlewares/validation.js';

const router = express.Router();

// Public routes
router.get('/', getAllTrainers);
router.get('/specializations', getTrainerSpecializations);
router.get('/:trainerId', getTrainerById);

// Protected routes (Admin only)
router.use(authenticateToken); // All routes below require authentication

router.post('/', authorizeRoles('admin'), validateTrainer, createTrainer);
router.put('/:trainerId', authorizeRoles('admin'), validateTrainer, updateTrainer);
router.delete('/:trainerId', authorizeRoles('admin'), deleteTrainer);

export default router;
