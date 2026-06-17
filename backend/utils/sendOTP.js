const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendOTP = async (email, otp) => {
    try {
        const info = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Email Verification OTP",
            text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
        });

        console.log("OTP sent successfully");
        console.log(info);

    } catch (err) {
        console.error("Email Error:", err);
        throw err;
    }
};

module.exports = sendOTP;