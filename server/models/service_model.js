import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    features: [{
      type: String,
      required: true,
    }],
    price: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["Personal Training", "Group Classes", "Cardio Training", "Strength Training", "HIIT & CrossFit", "Flexibility & Recovery"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Service", serviceSchema);
