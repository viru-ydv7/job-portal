const Job = require('../models/Job');

const createJob = async (req, res) => {
    try {
        // console.log("📦 BODY:", req.body);
        // console.log("👤 USER:", req.user);

        const { title, description, location, salary, jobType , skills } = req.body;
        if (skills && !Array.isArray(skills)) {
            return res.status(400).json({ message: "Skills must be an array" });
        }
        const job = await Job.create({
            title,
            description,
            location,
            salary,
            jobType,
            skills: req.body.skills,
            company:req.user.company,
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

const getCompanyJobs = async (req, res) => {
    try {
        const jobs = await Job.find({
        company: req.user.company,
        }).sort({ createdAt: -1 });

    res.json({
        success: true,
        jobs,
        });
    } 
    catch (error) {
        res.status(500).json({ success: false });
    }
};


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

    const jobs = await Job.find(query).populate("company","name").sort({ createdAt: -1 });

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

const deleteJob = async (req, res) => {
    try {

        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found"
            });
        }

        // Ownership check
        if (job.company.toString() !== req.user.company.toString()) {
            return res.status(403).json({
                success: false,
                message: "Access denied"
            });
        }

        await job.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Job deleted successfully"
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

const updateJob = async (req, res) => {
    try {

        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found"
            });
        }


        // Make sure recruiter belongs to same company
        if (job.company.toString() !== req.user.company.toString()) {
            return res.status(403).json({
                success: false,
                message: "Access denied"
            });
        }


        const {
            title,
            description,
            location,
            salary,
            jobType,
            skills
        } = req.body;


        // Update only if new value exists
        job.title = title || job.title;
        job.description = description || job.description;
        job.location = location || job.location;
        job.salary = salary || job.salary;
        job.jobType = jobType || job.jobType;


        if (skills) {
            job.skills = skills;
        }


        await job.save();


        return res.status(200).json({
            success: true,
            message: "Job updated successfully",
            job
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Server error"
        });

    }
};
module.exports = { createJob, getAllJobs, getJobById , getMyJobs , getCompanyJobs , deleteJob , updateJob };