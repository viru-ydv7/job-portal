const User = require('../models/User');
const bcrypt = require('bcryptjs');
const Candidate = require('../models/Candidate');
const Company = require('../models/Company');
const sendOTP = require("../utils/sendOTP");
// const registerUser = async (req,res)=>{
//     const {name,email,password,role} = req.body;
//     try{ 
//         const hashedPassword = await bcrypt.hash(password,10);

//         const userExists = await User.findOne({email})
//         if(userExists)
//             {
//                 return res.status(400).json(
//                     {
//                         success:false,
//                         message:"User already exists",
//                     }
//                 )
//             }
        
//         const user = await User.create(
//             {name,
//             email,
//             password:hashedPassword,
//             role,}
//         );
        
//         res.status(201).json({
//             success:true,
//             message:"User registered successfully",

//         })

//     }
//     catch(error){
//         console.error("Error is :",error);
//         return res.status(500).json({
//             success:false, 
//             message:"Server Error",
//         })
//     }
// };

const jwt = require('jsonwebtoken');
const loginRecruiter = async (req,res)=>{

    // console.log("LOGIN BODY",req.body);
    const {email,password} = req.body;
    try {
        const user = await User.findOne({email}).populate("company");
        if(!user){
            return res.status(400).json({
                success:false,
                message:"Invalid email or password",
            })
        }
        // console.log("USER FOUND:", user);
        // console.log("PLAIN PASSWORD:", password);
        // console.log("HASHED PASSWORD IN DB:", user?.password);

        const isPasswordMatched = await bcrypt.compare(password,user.password);
        if(!isPasswordMatched){
            return res.status(400).json({
                success:false,
                message:"Invalid email or password",
            })
        }
        const token = jwt.sign(
            {
                id:user._id,
                role:user.role,
                company:user.company 
            },
            process.env.JWT_SECRET,
            {expiresIn:'1d'},
        )
        return res.status(200).json({
            success:true,
            message:"User logged in successfully",
            token:token,
            user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            company: user.company
            }
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Server Error",
        })
    }
}

const registerCandidate = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // check if already exists
        const existing = await Candidate.findOne({ email });

    if(existing){

        if(existing.emailVerified){

            return res.status(400).json({
                success:false,
                message:"Candidate already exists"
            });

        }

        // user exists but not verified

        const otp = Math.floor(
            100000 + Math.random()*900000
        ).toString();

        existing.otp = otp;
        existing.otpExpiry = new Date(
            Date.now() + 5*60*1000
        );

        console.log("Register request:", email);
        console.log("Generated OTP:", otp);
        await existing.save();
        console.log("Sending OTP to:", email);
        await sendOTP(email, otp);
        console.log("OTP sent successfully");

    return res.status(200).json({
        success:true,
        message:"Account already exists but is not verified. New OTP sent."
    });

}
        // console.log("Checking email:", email);
        // console.log("Existing candidate:", existing);
        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        //creating otp
        const otp = Math.floor(
            100000 + Math.random() * 900000
        ).toString();

        const otpExpiry = new Date(
            Date.now() + 5 * 60 * 1000
        );

        // create candidate
        const candidate = await Candidate.create({
            name,
            email,
            password: hashedPassword,
            role: "candidate",
            otp,
            otpExpiry,
            emailVerified:false
        });
        // now after candidate creation , need to verify email by sending otp to email
        await sendOTP(email, otp);

        res.status(201).json({
            success: true,
            message: "OTP sent successfully"
        });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

const loginCandidate = async (req, res) => {
    const { email, password } = req.body;

    try {
        const candidate = await Candidate.findOne({ email });
//         if (!candidate.emailVerified) {
//             return res.status(403).json({
//                 success: false,
//                 message: "Please verify your email first"
//         });
// }

        if (!candidate) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const isMatch = await bcrypt.compare(password, candidate.password);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            { id: candidate._id, role: "candidate" },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.status(200).json({
            success: true,
            message: "Candidate logged in successfully",
            token,
            user: {
                _id: candidate._id,
                name: candidate.name,
                email: candidate.email,
                role: "candidate"
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

const createCompany = async (req,res)=>{
    const { name, email, password, companyName } = req.body;

    try {
        // check existing recruiter
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        // domain check
        const domain = email.split("@")[1];
        if (["yahoo.com"].includes(domain)) {
            return res.status(400).json({
                success: false,
                message: "Use company email"
            });
        }

        // check if company already exists
        const existingCompany = await Company.findOne({ domain });
        if (existingCompany) {
            return res.status(400).json({
                success: false,
                message: "Company already exists"
            });
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // otp thing
        const otp = Math.floor(
            100000 + Math.random() * 900000
        ).toString();

        const otpExpiry = new Date(
            Date.now() + 5 * 60 * 1000
        );
        // create company
        const company = await Company.create({
            name: companyName,
            email,
            domain,
            otp,
            otpExpiry,
            emailVerified: false

        });

        // create admin user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: "admin",
            company: company._id
        });
        await sendOTP(email, otp);

        res.status(201).json({
            success: true,
            message: "Company created. Verification OTP sent to email.",
            user
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}

const verifyCandidateOTP = async (req, res) => {

    const { email, otp } = req.body;

    try {

        const candidate = await Candidate.findOne({ email });

        if (!candidate) {
            return res.status(404).json({
                success: false,
                message: "Candidate not found"
            });
        }

        if (candidate.otp !== otp) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP"
            });
        }

        if (candidate.otpExpiry < Date.now()) {
            return res.status(400).json({
                success: false,
                message: "OTP expired"
            });
        }

        candidate.emailVerified = true;
        candidate.otp = null;
        candidate.otpExpiry = null;

        await candidate.save();

        return res.status(200).json({
            success: true,
            message: "Email verified successfully"
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }
};

const resendCandidateOTP = async (req, res) => {

    const { email } = req.body;

    try {

        const candidate = await Candidate.findOne({ email });

        if (!candidate) {
            return res.status(404).json({
                success: false,
                message: "Candidate not found"
            });
        }

        if (candidate.emailVerified) {
            return res.status(400).json({
                success: false,
                message: "Email already verified"
            });
        }

        const otp = Math.floor(
            100000 + Math.random() * 900000
        ).toString();

        candidate.otp = otp;

        candidate.otpExpiry = new Date(
            Date.now() + 5 * 60 * 1000
        );

        await candidate.save();

        await sendOTP(email, otp);

        return res.status(200).json({
            success: true,
            message: "New OTP sent successfully"
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }
};

const verifyRecruiterOTP = async (req, res) => {

    const { email, otp } = req.body;

    try {

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        if (user.otp !== otp) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP"
            });
        }

        if (user.otpExpiry < Date.now()) {
            return res.status(400).json({
                success: false,
                message: "OTP expired"
            });
        }

        user.emailVerified = true;
        user.otp = null;
        user.otpExpiry = null;

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Email verified successfully"
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }
};

const resendRecruiterOTP = async (req, res) => {

    const { email } = req.body;

    try {

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        if (user.emailVerified) {
            return res.status(400).json({
                success: false,
                message: "Email already verified"
            });
        }

        const otp = Math.floor(
            100000 + Math.random() * 900000
        ).toString();

        user.otp = otp;

        user.otpExpiry = new Date(
            Date.now() + 5 * 60 * 1000
        );

        await user.save();

        await sendOTP(email, otp);

        return res.status(200).json({
            success: true,
            message: "New OTP sent successfully"
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }
};

const forgotCandidatePassword = async (req, res) => {
    const { email } = req.body;

    try {

        const candidate = await Candidate.findOne({ email });
        
        if (!candidate) {
            return res.status(404).json({
                success: false,
                message: "Candidate not found"
            });
        }

        const otp = Math.floor(
            100000 + Math.random() * 900000
        ).toString();

        candidate.otp = otp;

        candidate.otpExpiry = new Date(
            Date.now() + 5 * 60 * 1000
        );
        candidate.resetVerified = false;
        await candidate.save();

        await sendOTP(email, otp);

        return res.status(200).json({
            success: true,
            message: "Password reset OTP sent successfully"
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

const verifyCandidateResetOTP = async (req, res) => {

    const { email, otp } = req.body;

    try {

        const candidate = await Candidate.findOne({ email });

        if (!candidate) {
            return res.status(404).json({
                success: false,
                message: "Candidate not found"
            });
        }


        // Check OTP match
        if (candidate.otp !== otp) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP"
            });
        }


        // Check expiry
        if (candidate.otpExpiry < Date.now()) {
            return res.status(400).json({
                success: false,
                message: "OTP expired"
            });
        }

        candidate.resetVerified = true;

        await candidate.save();

        return res.status(200).json({
            success: true,
            message: "OTP verified successfully"
        });


    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

const resetCandidatePassword = async (req, res) => {

    const { email, newPassword } = req.body;

    try {

        const candidate = await Candidate.findOne({ email });

        if (!candidate) {
            return res.status(404).json({
                success: false,
                message: "Candidate not found"
            });
        }

        if (!candidate.resetVerified) {
            return res.status(403).json({
                success: false,
                message: "Please verify OTP before resetting password"
            });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(
            newPassword,
            10
        );

        // Update password
        candidate.password = hashedPassword;

        // Clear OTP because reset is complete
        candidate.otp = null;
        candidate.otpExpiry = null;
        candidate.resetVerified = false;

        await candidate.save();

        return res.status(200).json({
            success: true,
            message: "Password reset successfully"
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

const forgotRecruiterPassword = async (req, res) => {
    const { email } = req.body;

    try {

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const otp = Math.floor(
            100000 + Math.random() * 900000
        ).toString();

        user.otp = otp;
        user.otpExpiry = new Date(
            Date.now() + 5 * 60 * 1000
        );

        user.resetVerified = false;

        await user.save();

        await sendOTP(email, otp);

        return res.status(200).json({
            success: true,
            message: "Password reset OTP sent"
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

const verifyRecruiterResetOTP = async (req, res) => {

    const { email, otp } = req.body;

    try {

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        if (user.otp !== otp) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP"
            });
        }

        if (user.otpExpiry < Date.now()) {
            return res.status(400).json({
                success: false,
                message: "OTP expired"
            });
        }

        user.resetVerified = true;

        await user.save();

        return res.status(200).json({
            success: true,
            message: "OTP verified successfully"
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

const resetRecruiterPassword = async (req, res) => {

    const { email, newPassword } = req.body;

    try {

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        if (!user.resetVerified) {
            return res.status(403).json({
                success: false,
                message: "Please verify OTP first"
            });
        }

        const hashedPassword = await bcrypt.hash(
            newPassword,
            10
        );

        user.password = hashedPassword;

        user.otp = null;
        user.otpExpiry = null;
        user.resetVerified = false;

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Password reset successfully"
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};
module.exports = {registerCandidate, loginCandidate, loginRecruiter, createCompany , verifyCandidateOTP, resendCandidateOTP, verifyRecruiterOTP,resendRecruiterOTP, forgotCandidatePassword, verifyCandidateResetOTP, resetCandidatePassword , forgotRecruiterPassword, verifyRecruiterResetOTP, resetRecruiterPassword};