import express from 'express';
import {
  getAllMemberships,
  getMembershipById,
  createMembership,
  updateMembership,
  deleteMembership
} from '../controllers/membershipController.js';
import { authenticateToken, authorizeRoles } from '../middlewares/auth.js';
import { validateMembership } from '../middlewares/validation.js';

const router = express.Router();

// Public routes
router.get('/', getAllMemberships);
router.get('/:membershipId', getMembershipById);

// Protected routes (Admin only)
router.use(authenticateToken); // All routes below require authentication

router.post('/', authorizeRoles('admin'), validateMembership, createMembership);
router.put('/:membershipId', authorizeRoles('admin'), validateMembership, updateMembership);
router.delete('/:membershipId', authorizeRoles('admin'), deleteMembership);

export default router;
