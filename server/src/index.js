import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import mongoose from "mongoose";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/auth.js";
import categoryRoutes from "./routes/categories.js";
import contentRoutes from "./routes/content.js";
import inquiryRoutes from "./routes/inquiries.js";
import productRoutes from "./routes/products.js";
import reviewRoutes from "./routes/reviews.js";
import settingsRoutes from "./routes/settings.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Basic security & parsing
app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "*",
  })
);
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));

// Serve local images from /Images as /uploads
app.use(
  "/uploads",
  express.static(path.join(__dirname, "../../Images"))
);

// Logging
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// Rate limiting for auth & contact
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
});

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

// Mongo connection
const MONGO_URI =
  process.env.MONGO_URI ;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error", err);
  });

// API routes
app.use("/auth", authLimiter, authRoutes);
app.use("/products", productRoutes);
app.use("/categories", categoryRoutes);
app.use("/reviews", reviewRoutes);
app.use("/content", contentRoutes);
app.use("/inquiries", contactLimiter, inquiryRoutes);
app.use("/settings", settingsRoutes);

// Healthcheck
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Global error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  res
    .status(err.status || 500)
    .json({ message: err.message || "Server error occurred" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT,'0.0.0.0',() => {
  console.log(`Server running on port ${PORT}`);
});
