#!/usr/bin/env node

const { spawn } = require("child_process");
const path = require("path");

console.log("🚀 Starting FitFat Gym Server...");

// Check if MongoDB is running
const checkMongoDB = () => {
  return new Promise((resolve) => {
    const mongodb = spawn("mongod", ["--version"], { stdio: "pipe" });
    mongodb.on("close", (code) => {
      resolve(code === 0);
    });
    mongodb.on("error", () => {
      resolve(false);
    });
  });
};

// Start the server
const startServer = async () => {
  try {
    const mongoRunning = await checkMongoDB();
    if (!mongoRunning) {
      console.log(
        "⚠️  MongoDB might not be running. Please start MongoDB first."
      );
      console.log("   On Windows: net start MongoDB");
      console.log("   On Mac/Linux: brew services start mongodb-community");
    }

    console.log("📦 Installing dependencies...");
    const install = spawn("npm", ["install"], {
      cwd: path.join(__dirname, "server"),
      stdio: "inherit",
    });

    install.on("close", (code) => {
      if (code === 0) {
        console.log("✅ Dependencies installed");
        console.log("🔧 Starting server...");

        const server = spawn("npm", ["start"], {
          cwd: path.join(__dirname, "server"),
          stdio: "inherit",
        });

        server.on("error", (err) => {
          console.error("❌ Failed to start server:", err);
        });
      } else {
        console.error("❌ Failed to install dependencies");
      }
    });
  } catch (error) {
    console.error("❌ Error starting server:", error);
  }
};

startServer();
