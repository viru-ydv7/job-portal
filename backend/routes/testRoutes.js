const express = require("express");
const protect = require("../middlewares/authMiddleware");
const router = express.Router();
const sendOTP = require("../utils/sendOTP");
const { analyze } =require("../services/geminiService");

router.get("/send-mail", async(req,res)=>{

    await sendOTP(
        "swarpatel3005.sp@gmail.com",
        "123456"
    );

    res.json({
        success:true
    });

});

router.get("/protected",protect,(req,res)=>{
    res.status(200).json({
        success:true,
        message:"You accessed protected router",
        user:req.user,
    })
})

module.exports = router