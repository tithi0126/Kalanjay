import express from "express";
import Review from "../models/Review.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

// Public - approved reviews
router.get("/", async (req, res, next) => {
  try {
    const reviews = await Review.find({ isApproved: true }).sort("-createdAt");
    res.json(reviews);
  } catch (err) {
    next(err);
  }
});

// Public - submit review (optional)
router.post("/", async (req, res, next) => {
  try {
    const review = await Review.create({
      ...req.body,
      isApproved: false,
      source: "manual",
    });
    res.status(201).json(review);
  } catch (err) {
    next(err);
  }
});

// Admin - list all
router.get("/admin", requireAuth, async (req, res, next) => {
  try {
    const reviews = await Review.find().sort("-createdAt");
    res.json(reviews);
  } catch (err) {
    next(err);
  }
});

// Admin - update (approve/reject)
router.put("/:id", requireAuth, async (req, res, next) => {
  try {
    const updated = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

// Admin - delete
router.delete("/:id", requireAuth, async (req, res, next) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

export default router;


