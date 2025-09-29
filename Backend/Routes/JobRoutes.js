const express = require("express");
const {
  createJob,
  getJob,
  getJobById,
  updatedJob,
  deleteJob,
} = require("../Controller/JobController");
const { protect } = require("../Middleware/AuthMiddleware");
const { adminProtect } = require("../Middleware/AdminMiddleware");

const router = express.Router();
router.get("/", getJob);
router.get("/:id", getJobById);
router.post("/", protect, adminProtect, createJob);
router.put("/:id", protect, adminProtect, updatedJob);
router.delete("/:id", protect, adminProtect, deleteJob);

module.exports = router;
