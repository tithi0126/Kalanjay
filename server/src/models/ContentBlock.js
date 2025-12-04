import mongoose from "mongoose";

const contentBlockSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true },
    title: { type: String },
    body: { type: String },
    imageUrl: { type: String },
    extra: { type: Object }
  },
  { timestamps: true }
);

// Keys we might use:
// hero_banner, offers_section, about_section, services_section, homepage_intro

const ContentBlock = mongoose.model("ContentBlock", contentBlockSchema);

export default ContentBlock;


