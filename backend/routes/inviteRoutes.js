const express = require("express");
const router = express.Router();

const { sendInvite, acceptInvite } = require("../controllers/inviteController");
const authMiddleware = require("../middlewares/authMiddleware");
const isAdmin = require("../middlewares/isAdmin");

router.post("/send", authMiddleware, isAdmin, sendInvite);
router.post("/accept", acceptInvite);

module.exports = router;