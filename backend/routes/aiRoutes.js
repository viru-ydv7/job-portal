const express = require("express");
const router = express.Router();

const { getResumeFeedback,getInterviewQuestions} = require("../controllers/aiController");

router.post("/resume-feedback", getResumeFeedback);
router.get("/interview-questions/:jobId", getInterviewQuestions);

module.exports = router;