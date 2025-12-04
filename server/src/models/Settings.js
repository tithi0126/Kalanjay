import mongoose from "mongoose";

const seoSchema = new mongoose.Schema(
  {
    metaTitle: String,
    metaDescription: String,
    keywords: [String]
  },
  { _id: false }
);

const settingsSchema = new mongoose.Schema(
  {
    businessName: { type: String, default: "Kalanjay" },
    phone: String,
    email: String,
    whatsappNumber: String,
    instagramUrl: String,
    address: String,
    googleMapsEmbedUrl: String,
    socialLinks: {
      facebook: String,
      instagram: String,
      whatsapp: String
    },
    seo: {
      home: seoSchema,
      products: seoSchema,
      about: seoSchema,
      services: seoSchema,
      reviews: seoSchema,
      contact: seoSchema
    }
  },
  { timestamps: true }
);

const Settings = mongoose.model("Settings", settingsSchema);

export default Settings;


