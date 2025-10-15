import { validationResult } from 'express-validator';
import Booking from '../models/booking_model.js';
import Schedule from '../models/schedule_model.js';
import UserMembership from '../models/user_membership_model.js';

// Get User Bookings
export const getUserBookings = async (req, res) => {
  try {
    const userId = req.user._id;
    const { status } = req.query;

    let query = { user: userId };
    if (status) query.status = status;

    const bookings = await Booking.find(query)
      .populate('schedule', 'title dayOfWeek startTime endTime room category difficulty')
      .populate({
        path: 'schedule',
        populate: {
          path: 'trainer',
          select: 'name specialization image'
        }
      })
      .sort({ bookingDate: -1 });

    res.status(200).json({ bookings });
  } catch (error) {
    console.error('Get user bookings error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create Booking
export const createBooking = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { scheduleId, bookingDate, notes } = req.body;
    const userId = req.user._id;

    // Check if user has active membership
    const activeMembership = await UserMembership.findOne({
      user: userId,
      status: 'active',
      endDate: { $gte: new Date() }
    });

    if (!activeMembership) {
      return res.status(400).json({ 
        message: 'You need an active membership to book classes' 
      });
    }

    // Check if schedule exists and is active
    const schedule = await Schedule.findById(scheduleId);
    if (!schedule || !schedule.isActive) {
      return res.status(400).json({ message: 'Schedule not found or inactive' });
    }

    // Check if class is full
    if (schedule.currentParticipants >= schedule.maxParticipants) {
      return res.status(400).json({ message: 'Class is full' });
    }

    // Check if user already has a booking for this schedule on this date
    const existingBooking = await Booking.findOne({
      user: userId,
      schedule: scheduleId,
      bookingDate: new Date(bookingDate)
    });

    if (existingBooking) {
      return res.status(400).json({ message: 'You already have a booking for this class' });
    }

    // Create booking
    const booking = new Booking({
      user: userId,
      schedule: scheduleId,
      bookingDate: new Date(bookingDate),
      notes: notes || ''
    });

    await booking.save();

    // Update schedule participant count
    await Schedule.findByIdAndUpdate(scheduleId, {
      $inc: { currentParticipants: 1 }
    });

    await booking.populate([
      {
        path: 'schedule',
        populate: {
          path: 'trainer',
          select: 'name specialization image'
        }
      }
    ]);

    res.status(201).json({
      message: 'Booking created successfully',
      booking
    });
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Cancel Booking
export const cancelBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const userId = req.user._id;

    const booking = await Booking.findOne({
      _id: bookingId,
      user: userId
    });

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.status === 'cancelled') {
      return res.status(400).json({ message: 'Booking is already cancelled' });
    }

    // Update booking status
    booking.status = 'cancelled';
    await booking.save();

    // Decrease schedule participant count
    await Schedule.findByIdAndUpdate(booking.schedule, {
      $inc: { currentParticipants: -1 }
    });

    res.status(200).json({
      message: 'Booking cancelled successfully',
      booking
    });
  } catch (error) {
    console.error('Cancel booking error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get All Bookings (Admin only)
export const getAllBookings = async (req, res) => {
  try {
    const { status, date } = req.query;
    
    let query = {};
    if (status) query.status = status;
    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 1);
      query.bookingDate = { $gte: startDate, $lt: endDate };
    }

    const bookings = await Booking.find(query)
      .populate('user', 'name email phone')
      .populate('schedule', 'title dayOfWeek startTime endTime room category')
      .populate({
        path: 'schedule',
        populate: {
          path: 'trainer',
          select: 'name specialization'
        }
      })
      .sort({ bookingDate: -1 });

    res.status(200).json({ bookings });
  } catch (error) {
    console.error('Get all bookings error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
