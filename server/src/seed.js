import mongoose from "mongoose";
import dotenv from "dotenv";
import Category from "./models/Category.js";
import Product from "./models/Product.js";

dotenv.config();

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/kalanjay_gifts";

async function run() {
  await mongoose.connect(MONGO_URI);

  console.log("Connected to MongoDB, seeding sample categories and products...");

  // Clear old sample data (optional)
  await Category.deleteMany({});
  await Product.deleteMany({});

  const categories = await Category.insertMany([
    {
      name: "Personalized Gifts",
      slug: "personalized-gifts",
      description: "Custom gifts with names, dates and stories.",
    },
    {
      name: "Hampers",
      slug: "hampers",
      description: "Curated hampers for birthdays, anniversaries and more.",
    },
    {
      name: "Frames",
      slug: "frames",
      description: "Photo frames and collages for your memories.",
    },
    {
      name: "Cakes",
      slug: "cakes",
      description: "Custom cakes to match your theme.",
    },
  ]);

  const catByName = Object.fromEntries(
    categories.map((c) => [c.name, c._id])
  );

  const imageBase = "/uploads";

  await Product.insertMany([
    {
      name: "Pastel Celebration Hamper",
      slug: "pastel-celebration-hamper",
      category: catByName["Hampers"],
      shortDescription: "Curated hamper with candles, chocolates and keepsakes.",
      description:
        "A soft pastel-themed hamper perfect for birthdays and anniversaries. Includes scented candles, artisan chocolates and a small personalized note card.",
      priceFrom: 1499,
      images: [`${imageBase}/WhatsApp Image 2025-11-24 at 11.51.54 AM.jpeg`],
      customizationDetails:
        "Add name, occasion and a short message for the note card. Colour palette can be customized on request.",
      deliveryTime: "3–5 days",
      isTopPick: true,
    },
    {
      name: "Couple Memory Frame",
      slug: "couple-memory-frame",
      category: catByName["Frames"],
      shortDescription: "Minimal frame with your favourite couple photo.",
      description:
        "A clean, modern frame for couples with a soft background and subtle typography. Ideal for anniversaries and weddings.",
      priceFrom: 899,
      images: [`${imageBase}/WhatsApp Image 2025-11-24 at 11.51.55 AM.jpeg`],
      customizationDetails:
        "Share your photo, names and date. We will design and share a preview before printing.",
      deliveryTime: "4–6 days",
      isTopPick: true,
    },
    {
      name: "Birthday Theme Hamper",
      slug: "birthday-theme-hamper",
      category: catByName["Hampers"],
      shortDescription: "Bright and fun hamper for birthdays.",
      description:
        "Includes themed goodies, treats and a mini frame in coordinated colours.",
      priceFrom: 1799,
      images: [`${imageBase}/WhatsApp Image 2025-11-24 at 11.51.56 AM.jpeg`],
      deliveryTime: "3–5 days",
      isTopPick: false,
    },
    {
      name: "Custom Photo Cake",
      slug: "custom-photo-cake",
      category: catByName["Cakes"],
      shortDescription: "Photo or theme-based cake for special days.",
      description:
        "Freshly baked cake with custom topper or photo print. Available in multiple flavours.",
      priceFrom: 1299,
      images: [`${imageBase}/WhatsApp Image 2025-11-24 at 11.51.57 AM.jpeg`],
      options: [
        { label: "Size", values: ["0.5 kg", "1 kg", "2 kg"] },
        { label: "Flavour", values: ["Chocolate", "Red Velvet", "Vanilla"] },
      ],
      deliveryTime: "2–3 days",
      isTopPick: false,
    },
    {
      name: "Personalized Keepsake Box",
      slug: "personalized-keepsake-box",
      category: catByName["Personalized Gifts"],
      shortDescription: "Wooden box to store memories and letters.",
      description:
        "Engraved keepsake box ideal for proposals, anniversaries and milestone gifts.",
      priceFrom: 1599,
      images: [`${imageBase}/WhatsApp Image 2025-11-24 at 11.51.58 AM.jpeg`],
      customizationDetails:
        "Add names, date and a short quote on the lid. Inside engraving optional.",
      deliveryTime: "5–7 days",
      isTopPick: true,
    },
  ]);

  console.log("Seeding completed.");
  await mongoose.disconnect();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});


