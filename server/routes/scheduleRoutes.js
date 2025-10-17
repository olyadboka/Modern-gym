import express from "express";
import {
  getAllSchedules,
  getScheduleById,
  createSchedule,
  updateSchedule,
  deleteSchedule,
  getScheduleCategories,
} from "../controllers/scheduleController.js";
import { authenticateToken, authorizeRoles } from "../middlewares/auth.js";
import { validateSchedule } from "../middlewares/validation.js";

const router = express.Router();

// Public routes
router.get("/", getAllSchedules);
router.get("/categories", getScheduleCategories);
router.get("/:scheduleId", getScheduleById);

// Protected routes (Admin only)
router.use(authenticateToken);

router.post("/", authorizeRoles("admin"), validateSchedule, createSchedule);
router.put(
  "/:scheduleId",
  authorizeRoles("admin"),
  validateSchedule,
  updateSchedule
);
router.delete("/:scheduleId", authorizeRoles("admin"), deleteSchedule);

export default router;
