const express = require("express");
const {
  registerUser,
  userLogin,
  getProfile,
} = require("../Controller/UserController");
const { protect } = require("../Middleware/AuthMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", userLogin);
router.get("/profile", protect, getProfile);

module.exports = router;
