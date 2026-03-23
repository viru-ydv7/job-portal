const express = require('express');
const protect = require('../middlewares/authMiddleware');
const { applyToJob } = require('../controllers/applicationController');
const { candidateOnly,recruiterOnly } = require('../middlewares/roleMiddleware');
const { getApplicantsForJob } = require('../controllers/applicationController');
const {updateApplicationStatus} = require('../controllers/applicationController');
const { getMyApplications } = require('../controllers/applicationController');
const { getRecruiterJobs } = require('../controllers/applicationController');
const upload = require('../middlewares/upload');
const router = express.Router();


router.post('/apply/:jobId',protect,candidateOnly,upload.single('resume'),applyToJob);
router.get('/job/:jobId',protect,recruiterOnly,getApplicantsForJob);
router.get("/me", protect, getMyApplications);  
router.get("/my-jobs", protect, recruiterOnly , getRecruiterJobs);
router.put("/:id/status",protect,recruiterOnly,updateApplicationStatus);

router.patch("/:applicationId/status",protect,recruiterOnly,updateApplicationStatus);
module.exports = router;