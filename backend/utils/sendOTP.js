const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendOTP = async (email, otp) => {
    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Email Verification OTP",
        text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
    });
};

module.exports = sendOTP;