const Application = require('../models/Application');
const Job = require('../models/Job');
const upload = require ('../middlewares/upload');

const extractText = require("../utils/extractText");
const extractSkills = require("../utils/extractSkills");
const analyzeResume = require("../utils/analyzeResume");


const applyToJob = async (req,res)=>{
    try {
        
        const { jobId } = req.params;
        const job = await Job.findById(jobId);
        if(!job){
            return res.status(404).json({
                success:false,
                message:"Job not found"
            }
            )
        }

        if(!job.company){
          return res.status(400).json({
            success:false,
            message:"Job does not have a company associated"
          })
        }

        const existingApplication = await Application.findOne({
            job:jobId,
            applicant:req.user._id,
        })
        if(existingApplication){
            return res.status(400).json({
                success:false,
                message:"You have already applied to this job"
            })
        }
        let matchPercentage = 0;
        if (req.file) {

              const text = await extractText(req.file.path);

              const userSkills = extractSkills(text);

              const analysis = analyzeResume(
                  userSkills,
                  job.skills
              );

              matchPercentage = analysis.matchPercentage;
        }
        const application = await Application.create({
            job: jobId,
            applicant: req.user._id,
            resume: req.file ? req.file.path : null,
            matchPercentage
        });

        return res.status(201).json({
            success:true,
            message:"Application submitted successfully",
            application,
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Server error"
        })
    }
}

const getApplicantsForJob = async (req,res)=>{
    try {
        const {jobId}=req.params;

        const job = await Job.findById(jobId);
        if(!job){
            return res.status(404).json({
                success:false,
                message:"Job not found"
            })
        }
        if(job.company.toString() !== req.user.company.toString()){
            return res.status(403).json({
                success:false,
                message:"Access denied"
            })
        }
        const applications = await Application.find({job:jobId}).sort({matchPercentage: -1}).populate("applicant", "name email role").populate("job", "title");

        const rankedApplications =
        applications.map(
            (application, index) => ({
                rank: index + 1,
                ...application.toObject()
            })
        );

        return res.status(200).json({
            success:true,
            count:applications.length,
            applications,
        });
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Server error",
        });
    }
}

const updateApplicationStatus = async (req, res) => {
  try {

    const { id } = req.params;
    const { status } = req.body;

    if (!["pending", "accepted", "rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value"
      });
    }

    const application = await Application.findById(id).populate("job");

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found"
      });
    }

    // ownership check
    if (application.job.company.toString() !== req.user.company.toString()) {
      return res.status(403).json({
        success: false,
        message: "Access denied"
      });
    }

    // prevent re-update
    if (application.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: "Application already processed"
      });
    }

    application.status = status;
    await application.save();

    res.json({
      success: true,
      message: "Status updated successfully",
      application
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

const getMyApplications = async (req, res) => {
    try {

        const applications = await Application
            .find({ applicant: req.user._id })
            .populate("job", "title company location createdAt");

        return res.status(200).json({
            success: true,
            count: applications.length,
            applications
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

const getRecruiterJobs = async (req, res) => {
    // console.log("Recruiter jobs route hit");
  try {

    const jobs = await Job.find({ company: req.user.company }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: jobs.length,
      jobs
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server error"
    });

  }
};
module.exports={applyToJob, getApplicantsForJob,updateApplicationStatus,getMyApplications,getRecruiterJobs};