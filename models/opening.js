const mongoose = require("mongoose");

const OpeningSchema = new mongoose.Schema(
  {
    projectName: { type: String, required: true, unique: true },
    clientName: { type: String, required: true },
    technologies: { type: [String], required: true, default: undefined },
    role: {
      type: String,
      required: true,
      enum: ["ProjectManager", "Frontend", "Backend", "DevOps", "QA"],
    },
    jobDescription: { type: String, required: true },
    status: { type: Boolean, required: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    appliedBy: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Opening", OpeningSchema);
