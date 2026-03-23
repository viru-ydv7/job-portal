const skillsList = [
    "javascript", "react", "node", "mongodb",
    "express", "html", "css", "sql",
    "java", "python", "c++", "docker", "aws"
];

const extractSkills = (text) => {
    const lowerText = text.toLowerCase();

    const foundSkills = skillsList.filter(skill =>
        lowerText.includes(skill)
    );

    return foundSkills;
};

module.exports = extractSkills;