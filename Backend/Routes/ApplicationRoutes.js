const express = require("express");
const {
  applyJob,
  getUserApplications,
  getJobApplications,
  updateApplicationStatus,
} = require("../Controller/ApplicationController");
const { protect } = require("../Middleware/authMiddleware");

const router = express.Router();

router.post("/apply", protect, applyJob);
router.get("/my-applications", protect, getUserApplications);
router.get("/:jobId/applications", protect, getJobApplications);
router.put("/:applicationId/status", protect, updateApplicationStatus);

module.exports = router;
