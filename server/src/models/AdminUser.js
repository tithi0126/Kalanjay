import mongoose from "mongoose";

const adminUserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    name: { type: String, default: "Admin" }
  },
  { timestamps: true }
);

const AdminUser = mongoose.model("AdminUser", adminUserSchema);

export default AdminUser;


