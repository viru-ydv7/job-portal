const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
});

const generateResumeFeedback = async (resumeText) => {
    try {
            const prompt = `
    Analyze this resume.

    Return ONLY valid JSON.

    {
        "strengths": [],
        "weaknesses": [],
        "suggestions": []
    }

    Resume:
    ${resumeText}
    `;

            const result = await model.generateContent(prompt);
            let responseText= result.response.text();
            responseText = responseText
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

            return JSON.parse(responseText);
    } catch (error) {
        throw error;
    }
};

const generateInterviewQuestions = async (job) => {
    try {

        const prompt = `
            You are an experienced technical recruiter.

            Generate a concise list of interview questions for the following job.

            Return ONLY valid JSON in this format:

            {
            "technicalQuestions": [],
            "behavioralQuestions": [],
            "scenarioQuestions": []
            }

            Rules:
            - Generate exactly 5 technical questions.
            - Generate exactly 3 behavioral questions.
            - Generate exactly 2 scenario-based questions.
            - Questions should be practical and relevant to the job skills.
            - Do not repeat similar questions.
            - Keep each question under 25 words.

            Job Title:
            ${job.title}

            Job Description:
            ${job.description}

            Required Skills:
            ${job.skills.join(", ")}
            `;

            const result =
                await model.generateContent(prompt);

            let responseText =
                result.response.text();

            responseText = responseText
                .replace(/```json/g, "")
                .replace(/```/g, "")
                .trim();

            return JSON.parse(responseText);

    } catch (error) {
        throw error;
    }
};

module.exports = {
    generateResumeFeedback,
    generateInterviewQuestions
};