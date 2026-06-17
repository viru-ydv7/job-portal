const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",

    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendOTP = async (email, otp) => {
    console.log("EMAIL_USER:", process.env.EMAIL_USER);
    console.log("EMAIL_PASS exists:", !!process.env.EMAIL_PASS);
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Email Verification OTP",

        text: `Your OTP is ${otp}. It will expire in 5 minutes.`
    });

};

module.exports = sendOTP;