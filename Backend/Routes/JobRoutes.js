const express = require("express");
const {
  createJob,
  getJob,
  getJobById,
  updatedJob,
  deleteJob,
} = require("../Controller/JobController");
const { protect } = require("../Middleware/authMiddleware");

const router = express.Router();
router.get("/", getJob);
router.get("/:id", getJobById);
router.post("/", protect, createJob);
router.put("/:id", protect, updatedJob);
router.delete("/:id", protect, deleteJob);

module.exports = router;
