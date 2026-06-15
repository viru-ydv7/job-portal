const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            require:true
        },

        email:{
            type:String,
            require:true,
            unique:true
        },

        password:{
            type:String,
            require:true
        },

        role: {
            type: String,
            enum: ["admin", "recruiter"],
        },
        company:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Company"
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
        timestamps:true,
    }

);

module.exports = mongoose.model("User", userSchema);
