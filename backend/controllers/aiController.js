const Job = require("../models/Job");

const {
    generateResumeFeedback,
    generateInterviewQuestions
} = require("../services/geminiService");


const getResumeFeedback = async (req, res) => {
    try {
        const { resumeText } = req.body;

        if (!resumeText) {
            return res.status(400).json({
                success: false,
                message: "Resume text is required"
            });
        }

        const feedback = await generateResumeFeedback(resumeText);

        res.status(200).json({
            success: true,
            feedback
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


const getInterviewQuestions = async (req, res) => {
    try {

        const { jobId } = req.params;

        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found"
            });
        }


        let questions;

        try {
            questions = await generateInterviewQuestions(job);

        } catch (error) {

            console.error("Gemini Error:", error.message);

            questions = {
                technicalQuestions: [
                    "AI is temporarily unavailable. Please try again later."
                ],
                behavioralQuestions: [],
                scenarioQuestions: []
            };
        }


        return res.status(200).json({
            success: true,
            questions
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


module.exports = {
    getResumeFeedback,
    getInterviewQuestions
};