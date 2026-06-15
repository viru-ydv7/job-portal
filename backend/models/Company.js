const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
    {
    name: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    domain:{
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("Company", companySchema);