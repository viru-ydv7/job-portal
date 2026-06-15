const Invite = require("../models/Invite");
const User = require("../models/User");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const sendInviteEmail = require("../utils/sendEmail");

// ======================
// SEND INVITE
// ======================
const sendInvite = async (req, res) => {
  try {
    const { email } = req.body;

    // 1. Check duplicate pending invite
    const existingInvite = await Invite.findOne({
      email,
      company: req.user.company,
      status: "pending",
    });

    if (existingInvite) {
      return res.status(400).json({
        message: "Invite already sent to this email",
      });
    }

    // 2. Check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // 3. Generate secure token
    const token = crypto.randomBytes(32).toString("hex");

    // 4. Set expiry (24 hours)
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    // 5. Save invite in DB
    const invite = await Invite.create({
      email,
      company: req.user.company,
      token,
      expiresAt,
    });

    // 6. Create invite link
    const inviteLink = `${process.env.FRONTEND_URL}/invites/accept/${token}`;

    // 🔥 DEBUG LOG (you should see this)
    // console.log("EMAIL FUNCTION CALLING...");

    // 7. Send email
    await sendInviteEmail(email, inviteLink);

    // 8. Response
    res.json({
      message: "Invite sent successfully via email",
    });

  } catch (error) {
    console.log("❌ SEND INVITE ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// ======================
// ACCEPT INVITE
// ======================
const acceptInvite = async (req, res) => {
  try {
    const { token, name, password } = req.body;

    // 1. Find invite
    const invite = await Invite.findOne({ token });

    if (!invite) {
      return res.status(400).json({
        message: "Invalid invite token",
      });
    }

    // 2. Check if already used
    if (invite.status !== "pending") {
      return res.status(400).json({
        message: "Invite already used or expired",
      });
    }

    // 3. Check expiry
    if (invite.expiresAt < new Date()) {
      invite.status = "expired";
      await invite.save();

      return res.status(400).json({
        message: "Invite has expired",
      });
    }

    // 4. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5. Create recruiter user
    const user = await User.create({
      name,
      email: invite.email,
      password: hashedPassword,
      role: invite.role,
      company: invite.company,
    });

    // 6. Mark invite as accepted
    invite.status = "accepted";
    await invite.save();

    res.json({
      message: "Account created successfully",
      user,
    });

  } catch (error) {
    console.log("❌ ACCEPT INVITE ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { sendInvite, acceptInvite };