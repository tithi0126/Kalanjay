import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import AdminUser from "../models/AdminUser.js";

const router = express.Router();

// Seed first admin (one-time, optional)
router.post("/seed-admin", async (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const existing = await AdminUser.findOne({ email });
  if (existing) {
    return res.status(400).json({ message: "Admin already exists" });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const admin = await AdminUser.create({ email, passwordHash, name });

  res.json({ id: admin._id, email: admin.email });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const admin = await AdminUser.findOne({ email });
  console.log(admin);
  if (!admin) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isValid = await bcrypt.compare(password, admin.passwordHash);
  if (!isValid) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: admin._id, email: admin.email },
    process.env.JWT_SECRET || "dev_secret",
    { expiresIn: "7d" }
  );

  res.json({
    token,
    admin: {
      id: admin._id,
      email: admin.email,
      name: admin.name
    }
  });
});

export default router;


