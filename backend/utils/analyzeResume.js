const analyzeResume = (userSkills, jobSkills) => {

  const user = userSkills.map(s => s.toLowerCase());
  const job = jobSkills.map(s => s.toLowerCase());

  const matched = job.filter(skill =>
    user.includes(skill)
  );

  const missing = job.filter(skill =>
    !user.includes(skill)
  );

  const matchPercentage = Math.round(
    (matched.length / job.length) * 100
  );

  return {
    matched,
    missing,
    matchPercentage
  };
};

module.exports = analyzeResume;