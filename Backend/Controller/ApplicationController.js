const Application = require("../Models/ApplicationModel");
const Job = require("../Models/JobModel");

const applyJob = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { jobId } = req.body;
    if (!jobId) return res.status(400).json({ message: "jobId is required" });
    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    const existing = await Application.findOne({
      jobId,
      userId: req.user._id,
    });
    if (existing)
      return res
        .status(400)
        .json({ message: "You Already applied for this job" });
    const application = await Application.create({
      jobId,
      userId: req.user._id,
    });

    res.status(201).json({
      message: "Application submitted successfully",
      application,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error applying for job",
      error: error.message,
    });
  }
};

const getUserApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      userId: req.user._id,
    }).populate("jobId");
    res.json(applications);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching applications",
      error: error.message,
    });
  }
};
const getJobApplications = async (req, res) => {
  try {
    const { jobId } = req.params;
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    if (job.postedBy.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Not authorized to view applicants for this job",
      });
    }

    const applications = await Application.find({ job: jobId }).populate(
      "user"
    );
    res.json(applications);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching job applications",
      error: error.message,
    });
  }
};

const updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status } = req.body;

    const application = await Application.findById(applicationId).populate(
      "job"
    );
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }
    if (application.job.postedBy.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Not authorized to update this application",
      });
    }

    application.status = status;
    await application.save();

    res.json({
      message: "Application status updated successfully",
      application,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating status",
      error: error.message,
    });
  }
};

module.exports = {
  getUserApplications,
  getJobApplications,
  updateApplicationStatus,
  applyJob,
};
