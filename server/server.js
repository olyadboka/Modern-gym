import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import { DbConnection } from "./configs/dbconnection.js";
import bcrypt from "bcryptjs";
import User from "./models/user_model.js";
import seedData from "./seed-data.js";

// Import routes
import userRoutes from "./routes/userRoutes.js";
import trainerRoutes from "./routes/trainerRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import membershipRoutes from "./routes/membershipRoutes.js";
import scheduleRoutes from "./routes/scheduleRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";

const app = express();

app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);

// CORS configuration
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://modern-gym-frontend-1.onrender.com/",
      "https://modern-gym-backend.onrender.com",
      "http://localhost:3001",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);

// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Routes
app.get("/", (req, res) => {
  res.json({
    message: "FitFat Gym API Server is running!",
    version: "1.0.0",
    endpoints: {
      users: "/api/users",
      trainers: "/api/trainers",
      contacts: "/api/contacts",
      memberships: "/api/memberships",
      schedules: "/api/schedules",
      bookings: "/api/bookings",
      services: "/api/services",
    },
  });
});

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/trainers", trainerRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/memberships", membershipRoutes);
app.use("/api/schedules", scheduleRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/services", serviceRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
    path: req.originalUrl,
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Something went wrong!",
    error:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Internal server error",
  });
});

const port = process.env.SERVER_PORT || 3000;

app.listen(port, async () => {
  console.log(`🚀 FitFat Gym API Server is running on port ${port}`);
  console.log(`📊 Health check: http://localhost:${port}/health`);
  console.log(`🌐 API Base URL: http://localhost:${port}/api`);

  // Connect to database
  await DbConnection();

  // Ensure an admin user exists for dashboard login
  try {
    const adminEmail = process.env.ADMIN_EMAIL || "admin@fitfatgym.com";
    const adminPassword = process.env.ADMIN_PASSWORD || "Admin123";
    let admin = await User.findOne({ email: adminEmail });
    if (!admin) {
      const hashed = await bcrypt.hash(adminPassword, 12);
      admin = await User.create({
        name: "Admin",
        email: adminEmail,
        phone: "0000000000",
        password: hashed,
        role: "admin",
        membershipType: "vip",
      });
      console.log("👑 Seeded default admin:", adminEmail);
    } else {
      console.log("👑 Admin user already exists:", adminEmail);
    }

    // Seed default data
    await seedData();
  } catch (e) {
    console.error("Failed to ensure admin user:", e.message);
  }
});
