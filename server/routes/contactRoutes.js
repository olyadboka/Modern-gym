import express from 'express';
import {
  submitContactForm,
  getAllContacts,
  getContactById,
  updateContactStatus,
  deleteContact,
  getContactStats
} from '../controllers/contactController.js';
import { authenticateToken, authorizeRoles } from '../middlewares/auth.js';
import { validateContactForm } from '../middlewares/validation.js';

const router = express.Router();

// Public routes
router.post('/', validateContactForm, submitContactForm);

// Protected routes (Admin only)
router.use(authenticateToken); // All routes below require authentication

router.get('/', authorizeRoles('admin'), getAllContacts);
router.get('/stats', authorizeRoles('admin'), getContactStats);
router.get('/:contactId', authorizeRoles('admin'), getContactById);
router.put('/:contactId/status', authorizeRoles('admin'), updateContactStatus);
router.delete('/:contactId', authorizeRoles('admin'), deleteContact);

export default router;
