const express = require("express");
const protect = require("../middlewares/authMiddleware");
const {recruiterOnly,candidateOnly} = require("../middlewares/roleMiddleware");
const router = express.Router()
const {createJob,getAllJobs,getJobById,getMyJobs,getCompanyJobs , deleteJob , updateJob} = require("../controllers/jobController");


router.post(
    "/create-job",
    protect,
    recruiterOnly,
    // (req, res, next) => {
    //     console.log("✅ ENTERED JOB CONTROLLER");
    //     next();
    // },
    createJob
);

router.get(
    "/all",
    getAllJobs
)

router.get(
    "/my-company-jobs",
    protect,
    recruiterOnly,
    getCompanyJobs
)

router.get(
    "/my-jobs",
    protect,
    recruiterOnly,
    getMyJobs
)

router.get(
    "/:id",
    getJobById
)

router.delete(
    "/:id",
    protect,
    recruiterOnly,
    deleteJob
)

router.put(
    "/:id",
    protect,
    recruiterOnly,
    updateJob
)
module.exports = router;