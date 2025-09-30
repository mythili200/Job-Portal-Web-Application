const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, unique: true },
  password: { type: String, unique: true },
  role: {
    type: String,
    enum: ["jobseeker", "employer", "admin"],
    default: "jobseeker",
  },
  profilePhoto: { type: String, default: "" },
  resume: { type: String, default: "" },
  phone: { type: String, default: "" },
  location: { type: String, default: "" },
  linkedin: { type: String, default: "" },
  skills: [{ type: String }],
  bio: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
