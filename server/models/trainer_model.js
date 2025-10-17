import mongoose from "mongoose";

const trainerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    specialization: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      default: "5+ years",
    },
    clients: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 4.5,
      min: 0,
      max: 5,
    },
    socialLinks: {
      facebook: String,
      instagram: String,
      twitter: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Trainer", trainerSchema);
