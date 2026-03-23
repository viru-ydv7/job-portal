const Job = require('../models/Job');

const createJob = async (req, res) => {
    try {
        console.log("📦 BODY:", req.body);
        console.log("👤 USER:", req.user);

        const { title, description, location, salary, jobType } = req.body;

        const job = await Job.create({
            title,
            description,
            location,
            salary,
            jobType,
            skills: req.body.skills,
            createdBy: req.user._id,
        })
        return res.status(201).json({
            success: true,
            message: "Job created successfully",
            job,
        });
    } catch (error) {
        console.error("Error is :", error);
        return res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
}


const getAllJobs = async (req, res) => {
    try {
    const { search, location, jobType } = req.query;

    let query = {};

    // 🔍 Search by title
    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    // 📍 Filter by location
    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    // 💼 Filter by job type
    if (jobType) {
      query.jobType = jobType;
    }

    const jobs = await Job.find(query).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: jobs.length,
      jobs,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}

const getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        res.status(200).json({ job });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

const getMyJobs = async (req, res) => {
    try {

        const jobs = await Job.find({ createdBy: req.user._id })
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            jobs
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

module.exports = { createJob, getAllJobs, getJobById , getMyJobs };