import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true },
    customerImageUrl: { type: String },
    rating: { type: Number, min: 1, max: 5, required: true },
    text: { type: String, required: true },
    source: { type: String, enum: ["manual", "google"], default: "manual" },
    isApproved: { type: Boolean, default: false }
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);

export default Review;


