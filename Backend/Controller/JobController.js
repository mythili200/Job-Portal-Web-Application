const Job = require("../Models/JobModel");

const createJob = async (req, res) => {
  try {
    const { title, company, location, description, salary } = req.body;
    const job = new Job({
      title,
      company,
      location,
      description,
      salary,
      postedBy: req.user?._id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await job.save();
    res
      .status(201)
      .json({ success: true, data: job, message: "Job Created successfully" });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Job Creation Failed",
    });
  }
};

const getJob = async (req, res) => {
  try {
    const jobs = await Job.find().populate("postedBy", "name email");
    res.status(200).json({ success: true, data: jobs });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to Fetch jobs",
    });
  }
};
const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate(
      "postedBy",
      "name email"
    );
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json({ success: true, data: job });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to Fetch job",
    });
  }
};
const updatedJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Job updated successfully", data: job });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to Update job",
    });
  }
};

const deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json({
      success: true,
      message: "Job deleted successfully",
      data: job,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to delete job",
    });
  }
};

module.exports = { createJob, getJob, getJobById, updatedJob, deleteJob };
