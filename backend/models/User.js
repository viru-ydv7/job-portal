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
            enum: ["candidate", "recruiter"],
            default: "candidate",
        },
    },
    {
        timestamps:true,
    }

);

module.exports = mongoose.model("User", userSchema);