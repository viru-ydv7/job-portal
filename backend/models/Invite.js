const mongoose = require("mongoose");

const inviteSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },

  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },

  role: {
    type: String,
    enum: ["recruiter"],
    default: "recruiter",
  },

  token: {
    type: String,
    required: true,
    unique: true,
  },

  status: {
    type: String,
    enum: ["pending", "accepted", "expired"],
    default: "pending",
  },

  expiresAt: {
    type: Date,
    required: true,
  },

}, { timestamps: true });

module.exports = mongoose.model("Invite", inviteSchema);