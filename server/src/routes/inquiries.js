import express from "express";
import Inquiry from "../models/Inquiry.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

// Public - contact form submit
router.post("/", async (req, res, next) => {
  try {
    const inquiry = await Inquiry.create(req.body);
    res.status(201).json(inquiry);
  } catch (err) {
    next(err);
  }
});

// Admin - list inquiries
router.get("/", requireAuth, async (req, res, next) => {
  try {
    const inquiries = await Inquiry.find().sort("-createdAt");
    res.json(inquiries);
  } catch (err) {
    next(err);
  }
});

// Admin - update status
router.put("/:id", requireAuth, async (req, res, next) => {
  try {
    const updated = await Inquiry.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

export default router;


