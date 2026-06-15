const express = require("express");
const router = express.Router();

const upload = require("../middlewares/upload");

const {
  analyzeResumeForJob,
} = require("../controllers/resumeController");

router.post(
  "/:jobId",
  upload.single("resume"),
  analyzeResumeForJob
);

module.exports = router;