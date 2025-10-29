const express = require("express");
const {
  applyJob,
  getUserApplications,
  getJobApplications,
  updateApplicationStatus,
  getAllApplications,
} = require("../Controller/ApplicationController");
const { authMiddleware } = require("../Middleware/authMiddleware");

const router = express.Router();

router.post("/apply", authMiddleware, applyJob);
router.get("/my-applications", authMiddleware, getUserApplications);
router.get("/all", authMiddleware, getAllApplications);
router.get("/:jobId/applications", authMiddleware, getJobApplications);
router.put("/:applicationId/status", authMiddleware, updateApplicationStatus);

module.exports = router;
