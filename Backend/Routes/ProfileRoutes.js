const express = require("express");
const router = express.Router();
const {
  getProfile,
  updateProfile,
} = require("../Controller/Profilecontroller");
const { protect } = require("../Middleware/AuthMiddleware");
const upload = require("../Middleware/UploadMiddleware");

router.get("/users", protect, getProfile);

router.put(
  "/upload",
  protect,
  upload.fields([
    { name: "profilePhoto", maxCount: 1 },
    { name: "resume", maxCount: 1 },
  ]),
  updateProfile
);

module.exports = router;
