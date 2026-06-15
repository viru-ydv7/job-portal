const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    job:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Job',
        required:true,
    },
    applicant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Candidate',
        required:true,
    },
    status:{
        type:String,
        enum:['pending','accepted','rejected'],
        default:'pending',
    },
    resume: {
        e: String
    },
    matchPercentage: {
        type: Number,
        default: 0,
},
},
{
    timestamps:true,

});

module.exports = mongoose.model('Application',applicationSchema);