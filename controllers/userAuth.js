const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel.js");
const connectDB = require("../config/DB.js");
require("dotenv").config();
const register = async (req, res) => {
    try {
        await connectDB()
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required i.e name, email, password" });
        }

        const emailExist = await userModel.findOne({email});
        if (emailExist){
            return res.status(401).json({message:"email is existing, please use another email"});
        }

        const userExist = await userModel.find({ email });
        if (!userExist) {
            return res.status(400).json({ message: "user already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new userModel({
            name,
            email,
            password: hashedPassword
        })

        await user.save();

        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        )
        res.status(201).json({
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            },
            token,
        })

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

const login = async (req,res) =>{
    try {
        await connectDB()
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({message:"email and password are required"});
        }
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(400).json({message:"invalid email"})
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(!isPasswordMatch){
            return res.status(400).json({message:"invalid password"});
        }
        const token = jwt.sign(
            {id:user._id, email:user.email},
            process.env.JWT_SECRET,
            {expiresIn:"1h"}
        )
        res.status(200).json({
            message:"Login",
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
            },
            token,
        })
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

module.exports = {register,login};