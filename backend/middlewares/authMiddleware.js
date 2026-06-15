const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Candidate = require("../models/Candidate");

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "No token",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("DECODED:", decoded);

    let user;

    // 🔥 DECIDE MODEL BASED ON ROLE
    if (decoded.role === "candidate") {
      user = await Candidate.findById(decoded.id).select("-password");
    } else {
      user = await User.findById(decoded.id).select("-password");
    }

    console.log("DB USER:", user);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    req.user = {
      _id: user._id,
      role: decoded.role,
      company: user.company || null,
    };

    next();

  } catch (error) {
    console.log("PROTECT ERROR:", error);
    return res.status(401).json({
      success: false,
      message: "Not authorized",
    });
  }
};

module.exports = protect;