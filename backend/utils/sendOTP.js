const { Resend } = require("resend");

console.log("USING RESEND VERSION");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendOTP = async (email, otp) => {
    console.log("Sending OTP via Resend");

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Email Verification OTP",
        text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
    });
};

module.exports = sendOTP;