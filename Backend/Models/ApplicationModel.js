const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema({
  _id: ObjectId,
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // reference to User (jobseeker)
  status: {
    type: String,
    enum: ["applied", "reviewed", "accepted", "rejected"],
    default: "applied",
  },
  appliedAt: { type: Date, default: Date.now },
});

const ApplicationModel = mongoose.model("Application", ApplicationSchema);

module.exports = ApplicationModel;
