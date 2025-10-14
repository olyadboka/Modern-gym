import mongoose from "mongoose";

export const DbConnection = () => {
  try {
    mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/gymwebsite"
    );
  } catch (error) {
    console.log("error while connecting to the database", error);
  }
};
