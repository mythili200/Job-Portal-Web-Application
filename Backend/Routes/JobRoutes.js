const express = require("express");
const {
  createJob,
  getJob,
  getJobById,
  updatedJob,
  deleteJob,
} = require("../Controller/JobController");
const { authMiddleware } = require("../Middleware/AuthMiddleware");
const { adminProtect } = require("../Middleware/AdminMiddleware");

const router = express.Router();
router.get("/", getJob);
router.get("/:id", getJobById);
router.post("/", authMiddleware, adminProtect, createJob);
router.put("/:id", authMiddleware, adminProtect, updatedJob);
router.delete("/:id", authMiddleware, adminProtect, deleteJob);

module.exports = router;
