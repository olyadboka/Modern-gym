import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  updateUserStatus,
  deleteUser,
} from "../controllers/userController.js";
import { authenticateToken, authorizeRoles } from "../middlewares/auth.js";
import {
  validateUserRegistration,
  validateUserLogin,
  validateProfileUpdate,
} from "../middlewares/validation.js";

const router = express.Router();

// Public routes
router.post("/register", validateUserRegistration, registerUser);
router.post("/login", validateUserLogin, loginUser);
router.post("/logout", logoutUser);

// Protected routes
router.use(authenticateToken); // All routes below require authentication

// User profile routes
router.get("/profile", getUserProfile);
router.put("/profile", validateProfileUpdate, updateUserProfile);

// Admin only routes
router.get("/", authorizeRoles("admin"), getAllUsers);
router.put("/:userId/status", authorizeRoles("admin"), updateUserStatus);
router.delete("/:userId", authorizeRoles("admin"), deleteUser);

export default router;
