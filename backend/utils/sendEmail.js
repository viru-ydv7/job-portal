const nodemailer = require("nodemailer");

// ✅ Safely load env variables
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

// ✅ Check if missing
if (!EMAIL_USER || !EMAIL_PASS) {
  // console.log("❌ EMAIL CONFIG MISSING");
  // console.log("EMAIL_USER:", EMAIL_USER);
  // console.log("EMAIL_PASS:", EMAIL_PASS);
}

// ✅ Create transporter (safe version)
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

// ✅ Verify connection
transporter.verify((error, success) => {
  if (error) {
    console.log("❌ Email transporter error:", error);
  } else {
    // console.log("✅ Email server is ready to send messages");
  }
});

// ✅ Send email function
const sendInviteEmail = async (toEmail, inviteLink) => {
  try {
    // console.log("📩 Sending email to:", toEmail);

    const mailOptions = {
      from: `"Job Portal" <${EMAIL_USER}>`,
      to: toEmail,
      subject: "You're invited 🚀",
      html: `
        <div style="font-family: Arial; padding: 20px;">
          <h2>🚀 You're Invited!</h2>
          <p>You’ve been invited to join a company as a recruiter.</p>

          <a href="${inviteLink}" 
             style="padding:10px 20px;background:#007bff;color:white;text-decoration:none;border-radius:5px;">
             Accept Invite
          </a>

          <p style="margin-top:20px;">⏳ This link expires in 24 hours.</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);

    // console.log("✅ Email sent:", info.response);

  } catch (error) {
    console.log("❌ Email sending failed:", error);
    throw error;
  }
};

module.exports = sendInviteEmail;