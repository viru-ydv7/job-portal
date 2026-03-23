const express = require("express");
const protect = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/protected",protect,(req,res)=>{
    res.status(200).json({
        success:true,
        message:"You accessed protected router",
        user:req.user,
    })
})

const upload = require("../middlewares/upload") // check path
const extractText = require("../utils/extractText");
const extractSkills = require("../utils/extractSkills");
const analyzeResume = require("../utils/analyzeResume");
const Job = require("../models/Job");
router.post("/resume/:jobId", upload.single("resume"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // 1. Get job
    const job = await Job.findById(req.params.jobId);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // 2. Extract text
    const text = await extractText(req.file.path);

    // 3. Extract skills
    const userSkills = extractSkills(text);

    // 4. Analyze
    const result = analyzeResume(userSkills, job.skills);

    res.json({
      userSkills,
      jobSkills: job.skills,
      ...result
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error analyzing resume" });
  }
});
module.exports = router