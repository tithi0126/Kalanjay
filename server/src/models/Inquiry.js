import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    message: { type: String, required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    productName: { type: String },
    status: {
      type: String,
      enum: ["new", "in_progress", "closed"],
      default: "new"
    }
  },
  { timestamps: true }
);

const Inquiry = mongoose.model("Inquiry", inquirySchema);

export default Inquiry;


