require("dotenv").config({ path: "./.env" });


const fs = require("fs");

if (!fs.existsSync("uploads")) {
    fs.mkdirSync("uploads");
}
const express = require('express');
const connectDB = require("./config/db");
const applicationRoutes = require('./routes/applicationRoutes');
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const inviteRoutes = require("./routes/inviteRoutes");
const aiRoutes = require("./routes/aiRoutes");
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "CareerNest API is running 🚀"
    });
});

app.use("/api/ai", aiRoutes);
const resumeRoutes =require("./routes/resumeRoutes");
app.use("/api/resume", resumeRoutes);
connectDB();

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth',authRoutes);    
app.use('/api/invites', inviteRoutes);



app.use("/uploads", express.static("uploads"));


app.use('/api/test',require("./routes/testRoutes"))

app.use('/api/jobs',require("./routes/jobRoutes"))
const port = 5000;

app.use('/api/applications',require("./routes/applicationRoutes"))



app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})

