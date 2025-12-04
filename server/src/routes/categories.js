import express from "express";
import Category from "../models/Category.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

// Public - list active categories
router.get("/", async (req, res, next) => {
  try {
    const categories = await Category.find({ isActive: true }).sort("name");
    res.json(categories);
  } catch (err) {
    next(err);
  }
});

// Admin - list all
router.get("/admin", requireAuth, async (req, res, next) => {
  try {
    const categories = await Category.find().sort("name");
    res.json(categories);
  } catch (err) {
    next(err);
  }
});

// Admin - create
router.post("/", requireAuth, async (req, res, next) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (err) {
    next(err);
  }
});

// Admin - update
router.put("/:id", requireAuth, async (req, res, next) => {
  try {
    const updated = await Category.findByIdAndUpdate(req.params.id, req.body, {
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
    await Category.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

export default router;


