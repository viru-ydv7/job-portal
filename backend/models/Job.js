
const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        salary: {
            type: String,
        },
        jobType: {
            type: String,
            enum: ["full-time", "part-time", "internship"],
            default: "full-time",
        },
        skills: {
            type: [String],
            required: true
        },
        createdBy:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },
    },
    {timestamps:true}
); 

module.exports = mongoose.model("Job",JobSchema);