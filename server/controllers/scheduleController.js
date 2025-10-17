import { validationResult } from "express-validator";
import Schedule from "../models/schedule_model.js";
import Trainer from "../models/trainer_model.js";

// Get All Schedules
export const getAllSchedules = async (req, res) => {
  try {
    const { day, category, difficulty } = req.query;

    let query = { isActive: true };
    if (day) query.dayOfWeek = day;
    if (category) query.category = category;
    if (difficulty) query.difficulty = difficulty;

    const schedules = await Schedule.find(query)
      .populate("trainer", "name specialization image")
      .sort({ dayOfWeek: 1, startTime: 1 });

    res.status(200).json({
      success: true,
      schedules,
    });
  } catch (error) {
    console.error("Get schedules error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get Schedule by ID
export const getScheduleById = async (req, res) => {
  try {
    const { scheduleId } = req.params;
    const schedule = await Schedule.findById(scheduleId).populate(
      "trainer",
      "name specialization image"
    );

    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    res.status(200).json({
      success: true,
      schedule,
    });
  } catch (error) {
    console.error("Get schedule error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Create Schedule (Admin only)
export const createSchedule = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Validation failed",
        errors: errors.array(),
      });
    }

    const {
      title,
      description,
      trainer,
      dayOfWeek,
      startTime,
      endTime,
      maxParticipants,
      room,
      difficulty,
      category,
    } = req.body;

    // Verify trainer exists
    const trainerExists = await Trainer.findById(trainer);
    if (!trainerExists) {
      return res.status(400).json({ message: "Trainer not found" });
    }

    const schedule = new Schedule({
      title,
      description,
      trainer,
      dayOfWeek,
      startTime,
      endTime,
      maxParticipants,
      room,
      difficulty,
      category,
    });

    await schedule.save();
    await schedule.populate("trainer", "name specialization image");

    res.status(201).json({
      success: true,
      message: "Schedule created successfully",
      schedule,
    });
  } catch (error) {
    console.error("Create schedule error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update Schedule (Admin only)
export const updateSchedule = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Validation failed",
        errors: errors.array(),
      });
    }

    const { scheduleId } = req.params;
    const updateData = req.body;

    // If trainer is being updated, verify it exists
    if (updateData.trainer) {
      const trainerExists = await Trainer.findById(updateData.trainer);
      if (!trainerExists) {
        return res.status(400).json({ message: "Trainer not found" });
      }
    }

    const schedule = await Schedule.findByIdAndUpdate(scheduleId, updateData, {
      new: true,
      runValidators: true,
    }).populate("trainer", "name specialization image");

    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    res.status(200).json({
      success: true,
      message: "Schedule updated successfully",
      schedule,
    });
  } catch (error) {
    console.error("Update schedule error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete Schedule (Admin only)
export const deleteSchedule = async (req, res) => {
  try {
    const { scheduleId } = req.params;

    const schedule = await Schedule.findByIdAndDelete(scheduleId);

    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    res.status(200).json({
      success: true,
      message: "Schedule deleted successfully",
    });
  } catch (error) {
    console.error("Delete schedule error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get Schedule Categories
export const getScheduleCategories = async (req, res) => {
  try {
    const categories = await Schedule.distinct("category", { isActive: true });
    res.status(200).json({
      success: true,
      categories,
    });
  } catch (error) {
    console.error("Get categories error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
