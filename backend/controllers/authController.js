const User = require('../models/User');
const bcrypt = require('bcryptjs');

const registerUser = async (req,res)=>{
    const {name,email,password,role} = req.body;
    try{ 
        const hashedPassword = await bcrypt.hash(password,10);

        const userExists = await User.findOne({email})
        if(userExists)
            {
                return res.status(400).json(
                    {
                        success:false,
                        message:"User already exists",
                    }
                )
            }
        
        const user = await User.create(
            {name,
            email,
            password:hashedPassword,
            role,}
        );
        
        res.status(201).json({
            success:true,
            message:"User registered successfully",

        })

    }
    catch(error){
        console.error("Error is :",error);
        return res.status(500).json({
            success:false, 
            message:"Server Error",
        })
    }
};

const jwt = require('jsonwebtoken');
const loginUser = async (req,res)=>{

    console.log("LOGIN BODY",req.body);
    const {email,password} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                success:false,
                message:"Invalid email or password",
            })
        }
        console.log("USER FOUND:", user);
        console.log("PLAIN PASSWORD:", password);
        console.log("HASHED PASSWORD IN DB:", user?.password);

        const isPasswordMatched = await bcrypt.compare(password,user.password);
        if(!isPasswordMatched){
            return res.status(400).json({
                success:false,
                message:"Invalid email or password",
            })
        }
        const token = jwt.sign(
            {id:user._id},
            process.env.JWT_SECRET,
            {expiresIn:'1d'},
        )
        return res.status(200).json({
            success:true,
            message:"User logged in successfully",
            token:token,
            user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
            }
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Server Error",
        })
    }
}
module.exports = {registerUser,loginUser};