const extractText = require("../utils/extractText");
const extractSkills = require("../utils/extractSkills");
const analyzeResume = require("../utils/analyzeResume");
const Job = require("../models/Job");
const { generateResumeFeedback } = require("../services/geminiService");
const analyzeResumeForJob = async (req, res) => {
    try {

        if (!req.file) {
            return res.status(400).json({
                message: "No file uploaded",
            });
        }

        const job = await Job.findById(req.params.jobId);

        if (!job) {
            return res.status(404).json({
                message: "Job not found",
            });
        }
        const text = await extractText(req.file.path);
        // console.log(text.length);
        let aiFeedback = null;
        try{
            aiFeedback = await generateResumeFeedback(text);
        }
        catch (error) {
            console.error(
            "Gemini Error:",
            error.message
            );

            aiFeedback = {
                strengths: [],
                weaknesses: [],
                suggestions: [
                "AI feedback temporarily unavailable"
        ]
            };
        }

        const userSkills = extractSkills(text);

        const result = analyzeResume(
            userSkills,
            job.skills
        );

        res.json({
            userSkills,
            jobSkills: job.skills,

            matchedSkills:
                result.matchedSkills,

            missingSkills:
                result.missingSkills,

            matchPercentage:
                result.matchPercentage,

            aiFeedback,
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            message: "Error analyzing resume",
        });

    }
};

module.exports = {
    analyzeResumeForJob,
};