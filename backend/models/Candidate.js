const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: { 
        type: String, 
        unique: true,
        required: true,},
    password: {
        type: String,
        required: true,
    },
    role:{
        type:String,
        required:true,
        default:"candidate"
    },
    emailVerified:{
            type:Boolean,
            default:false
        },

    otp:{
            type:String,
            default:null
        },

    otpExpiry:{
            type:Date,
            default:null
        },
    resetVerified: {
            type: Boolean,
            default: false
        }
    }, 
    { 
        timestamps: true 
    });

module.exports = mongoose.model("Candidate", candidateSchema);