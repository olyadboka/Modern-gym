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
