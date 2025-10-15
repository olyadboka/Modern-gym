import express from 'express';
import {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService
} from '../controllers/serviceController.js';
import { authenticateToken, authorizeRoles } from '../middlewares/auth.js';
import { validateService } from '../middlewares/validation.js';

const router = express.Router();

// Public routes
router.get('/', getAllServices);
router.get('/:serviceId', getServiceById);

// Protected routes (Admin only)
router.use(authenticateToken); // All routes below require authentication

router.post('/', authorizeRoles('admin'), validateService, createService);
router.put('/:serviceId', authorizeRoles('admin'), validateService, updateService);
router.delete('/:serviceId', authorizeRoles('admin'), deleteService);

export default router;
