import { validationResult } from 'express-validator';
import Trainer from '../models/trainer_model.js';

// Get All Trainers
export const getAllTrainers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const specialization = req.query.specialization;

    let query = { isActive: true };
    if (specialization && specialization !== 'all') {
      query.specialization = specialization;
    }

    const trainers = await Trainer.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Trainer.countDocuments(query);

    res.status(200).json({
      trainers,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    console.error('Get trainers error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get Trainer by ID
export const getTrainerById = async (req, res) => {
  try {
    const { trainerId } = req.params;

    const trainer = await Trainer.findById(trainerId);
    
    if (!trainer) {
      return res.status(404).json({ message: 'Trainer not found' });
    }

    res.status(200).json({ trainer });
  } catch (error) {
    console.error('Get trainer error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create Trainer (Admin only)
export const createTrainer = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { name, specialization, image, socialLinks } = req.body;

    const trainer = new Trainer({
      name,
      specialization,
      image,
      socialLinks: socialLinks || {}
    });

    await trainer.save();

    res.status(201).json({
      message: 'Trainer created successfully',
      trainer
    });
  } catch (error) {
    console.error('Create trainer error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update Trainer (Admin only)
export const updateTrainer = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { trainerId } = req.params;
    const { name, specialization, image, socialLinks, isActive } = req.body;

    const updateData = {};
    if (name) updateData.name = name;
    if (specialization) updateData.specialization = specialization;
    if (image) updateData.image = image;
    if (socialLinks) updateData.socialLinks = socialLinks;
    if (typeof isActive === 'boolean') updateData.isActive = isActive;

    const trainer = await Trainer.findByIdAndUpdate(
      trainerId,
      updateData,
      { new: true, runValidators: true }
    );

    if (!trainer) {
      return res.status(404).json({ message: 'Trainer not found' });
    }

    res.status(200).json({
      message: 'Trainer updated successfully',
      trainer
    });
  } catch (error) {
    console.error('Update trainer error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete Trainer (Admin only)
export const deleteTrainer = async (req, res) => {
  try {
    const { trainerId } = req.params;

    const trainer = await Trainer.findByIdAndDelete(trainerId);
    
    if (!trainer) {
      return res.status(404).json({ message: 'Trainer not found' });
    }

    res.status(200).json({ message: 'Trainer deleted successfully' });
  } catch (error) {
    console.error('Delete trainer error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get Trainer Specializations
export const getTrainerSpecializations = async (req, res) => {
  try {
    const specializations = await Trainer.distinct('specialization', { isActive: true });
    
    res.status(200).json({ specializations });
  } catch (error) {
    console.error('Get specializations error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
