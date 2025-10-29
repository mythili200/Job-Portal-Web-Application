const express = require("express");
const {
  registerUser,
  userLogin,
  getProfile,
} = require("../Controller/UserController");
const { authMiddleware } = require("../Middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", userLogin);
router.get("/profile", authMiddleware, getProfile);

module.exports = router;
