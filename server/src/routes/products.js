import express from "express";
import Product from "../models/Product.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

// Public - list products with optional filters
router.get("/", async (req, res, next) => {
  try {
    const { category, top, q } = req.query;
    const filter = { isActive: true };

    if (category) {
      filter.category = category;
    }
    if (top === "true") {
      filter.isTopPick = true;
    }
    if (q) {
      filter.$or = [
        { name: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
      ];
    }

    const products = await Product.find(filter)
      .populate("category")
      .sort("-createdAt");
    res.json(products);
  } catch (err) {
    next(err);
  }
});

// Public - single product by slug
router.get("/slug/:slug", async (req, res, next) => {
  try {
    const product = await Product.findOne({
      slug: req.params.slug,
      isActive: true,
    }).populate("category");
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    next(err);
  }
});

// Admin - list all
router.get("/admin", requireAuth, async (req, res, next) => {
  try {
    const products = await Product.find().populate("category").sort("-createdAt");
    res.json(products);
  } catch (err) {
    next(err);
  }
});

// Admin - create
router.post("/", requireAuth, async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
});

// Admin - update
router.put("/:id", requireAuth, async (req, res, next) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
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
    await Product.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

export default router;
