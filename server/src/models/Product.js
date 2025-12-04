import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    description: { type: String },
    shortDescription: { type: String },
    priceFrom: { type: Number },
    priceTo: { type: Number },
    images: [{ type: String }],
    customizationDetails: { type: String },
    options: [{ label: String, values: [String] }],
    deliveryTime: { type: String },
    isTopPick: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;


