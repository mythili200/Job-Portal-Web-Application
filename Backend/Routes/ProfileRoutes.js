const express = require("express");
const router = express.Router();
const {
  getProfile,
  updateProfile,
} = require("../Controller/Profilecontroller");
const { authMiddleware } = require("../Middleware/AuthMiddleware");
const upload = require("../Middleware/UploadMiddleware");

router.get("/users", authMiddleware, getProfile);

router.put(
  "/upload",
  authMiddleware,
  upload.fields([
    { name: "profilePhoto", maxCount: 1 },
    { name: "resume", maxCount: 1 },
  ]),
  updateProfile
);

module.exports = router;
