import express from 'express';
import {
  getUserBookings,
  createBooking,
  cancelBooking,
  getAllBookings
} from '../controllers/bookingController.js';
import { authenticateToken, authorizeRoles } from '../middlewares/auth.js';
import { validateBooking } from '../middlewares/validation.js';

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// User routes
router.get('/my-bookings', getUserBookings);
router.post('/', validateBooking, createBooking);
router.put('/:bookingId/cancel', cancelBooking);

// Admin routes
router.get('/', authorizeRoles('admin'), getAllBookings);

export default router;
