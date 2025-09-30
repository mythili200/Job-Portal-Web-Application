const express = require("express");
const {
  applyJob,
  getUserApplications,
  getJobApplications,
  updateApplicationStatus,
  getAllApplications,
} = require("../Controller/ApplicationController");
const { protect } = require("../Middleware/AuthMiddleware");

const router = express.Router();

router.post("/apply", protect, applyJob);
router.get("/my-applications", protect, getUserApplications);
router.get("/all", protect, getAllApplications);
router.get("/:jobId/applications", protect, getJobApplications);
router.put("/:applicationId/status", protect, updateApplicationStatus);

module.exports = router;
