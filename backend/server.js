const express = require('express');
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const applicationRoutes = require('./routes/applicationRoutes');
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

dotenv.config(); // 👈 FIRST load env variables

connectDB();

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth',authRoutes);    



app.use("/uploads", express.static("uploads"));


app.use('/api/test',require("./routes/testRoutes"))

app.use('/api/jobs',require("./routes/jobRoutes"))
const port = 5000;

app.use('/api/applications',require("./routes/applicationRoutes"))

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})

