import { validationResult } from 'express-validator';
import Membership from '../models/membership_model.js';

// Get All Memberships
export const getAllMemberships = async (req, res) => {
  try {
    const memberships = await Membership.find({ isActive: true }).sort({ price: 1 });
    res.status(200).json({ memberships });
  } catch (error) {
    console.error('Get memberships error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get Membership by ID
export const getMembershipById = async (req, res) => {
  try {
    const { membershipId } = req.params;
    const membership = await Membership.findById(membershipId);
    
    if (!membership) {
      return res.status(404).json({ message: 'Membership not found' });
    }

    res.status(200).json({ membership });
  } catch (error) {
    console.error('Get membership error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create Membership (Admin only)
export const createMembership = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { name, description, price, duration, features, isPopular, maxUsers } = req.body;

    const membership = new Membership({
      name,
      description,
      price,
      duration,
      features,
      isPopular: isPopular || false,
      maxUsers: maxUsers || null
    });

    await membership.save();

    res.status(201).json({
      message: 'Membership created successfully',
      membership
    });
  } catch (error) {
    console.error('Create membership error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update Membership (Admin only)
export const updateMembership = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { membershipId } = req.params;
    const updateData = req.body;

    const membership = await Membership.findByIdAndUpdate(
      membershipId,
      updateData,
      { new: true, runValidators: true }
    );

    if (!membership) {
      return res.status(404).json({ message: 'Membership not found' });
    }

    res.status(200).json({
      message: 'Membership updated successfully',
      membership
    });
  } catch (error) {
    console.error('Update membership error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete Membership (Admin only)
export const deleteMembership = async (req, res) => {
  try {
    const { membershipId } = req.params;

    const membership = await Membership.findByIdAndDelete(membershipId);
    
    if (!membership) {
      return res.status(404).json({ message: 'Membership not found' });
    }

    res.status(200).json({ message: 'Membership deleted successfully' });
  } catch (error) {
    console.error('Delete membership error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
