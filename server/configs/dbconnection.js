import mongoose from "mongoose";

export const DbConnection = async () => {
  try {
    const mongoURI =
      process.env.MONGODB_URI || "mongodb://localhost:27017/gymwebsite";

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Database connected successfully");

    mongoose.connection.on("error", (err) => {
      console.error("❌ Database connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("⚠️ Database disconnected");
    });

    process.on("SIGINT", async () => {
      await mongoose.connection.close();
      console.log("Database connection closed due to app termination");
      process.exit(0);
    });
  } catch (error) {
    console.error("❌ Error connecting to database:", error);
    process.exit(1);
  }
};
