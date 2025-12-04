import express from "express";
import Settings from "../models/Settings.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

// Public - get settings
router.get("/", async (req, res, next) => {
  try {
    const settings = await Settings.findOne();
    res.json(settings);
  } catch (err) {
    next(err);
  }
});

// Admin - update / create
router.put("/", requireAuth, async (req, res, next) => {
  try {
    const settings = await Settings.findOneAndUpdate({}, req.body, {
      upsert: true,
      new: true,
    });
    res.json(settings);
  } catch (err) {
    next(err);
  }
});

export default router;


