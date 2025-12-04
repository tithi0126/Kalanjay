import express from "express";
import ContentBlock from "../models/ContentBlock.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

// Public - get by key
router.get("/:key", async (req, res, next) => {
  try {
    const block = await ContentBlock.findOne({ key: req.params.key });
    if (!block) {
      return res.status(404).json({ message: "Content not found" });
    }
    res.json(block);
  } catch (err) {
    next(err);
  }
});

// Admin - upsert by key
router.put("/:key", requireAuth, async (req, res, next) => {
  try {
    const block = await ContentBlock.findOneAndUpdate(
      { key: req.params.key },
      req.body,
      { upsert: true, new: true }
    );
    res.json(block);
  } catch (err) {
    next(err);
  }
});

export default router;


