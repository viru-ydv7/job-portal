const express = require("express");
const protect = require("../middlewares/authMiddleware");
const {recruiterOnly,candidateOnly} = require("../middlewares/roleMiddleware");
const router = express.Router()
const {createJob,getAllJobs,getJobById,getMyJobs} = require("../controllers/jobController");
router.post('/create-job',protect , recruiterOnly,createJob);

router.post(
    "/create-job",
    protect,
    recruiterOnly,
    (req, res, next) => {
        console.log("✅ ENTERED JOB CONTROLLER");
        next();
    },
    createJob
);

router.get(
    "/all",
    protect,
    getAllJobs
)

router.get(
    "/my-jobs",
    protect,
    recruiterOnly,
    getMyJobs
)

router.get(
    "/:id",
    protect,
    getJobById
)


module.exports = router;