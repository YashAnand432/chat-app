import User from "../models/user.models.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const login = async (req,res) =>{
    try {
        const {userName, password} = req.body;
        const user = await User.findOne({userName});
        const isPasswordCorrect = bcrypt.compare(password, user?.password||"");
        if(!user || !isPasswordCorrect){
            return res.status(400).json({error:"Invalid credentials"});
        }
        generateTokenAndSetCookie(user._id,res);
        res.status(200).json({
            _id:user._id,
            fullName: user.fullName,
            userName: user.userName,
            profilePic: user.profilePic
        })
    } catch (error) {
        console.log("Error in login controller");
        res.status(500).json({error : "Internal server error "});
    }
}

export const logout = (req,res) => {
    try {
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message : "Logged out successfully"});
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({error : "Internal server error"});
    }
}

export const signup = async (req, res) => {
    try{
        const {fullName, password, confirmPassword, userName, gender} = req.body;
        if(password != confirmPassword){
            return res.status(400).json({error:"Passwords dont match!"})
        }

        const user = await User.findOne({userName});

        if(user){
            return res.status(400).json({error:"Username already exists!"})
        }

        //hash password here
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`
        
        const newUser = new User({fullName, 
            userName, 
            password:hashedPassword,
            gender,
            profilePic:gender==="Male"?boyProfilePic:girlProfilePic
        })
            if(newUser){
                //generate JWT token
                generateTokenAndSetCookie(newUser._id, res);
                await newUser.save();
                res.status(201).json({
                    _id : newUser._id,
                    fullName : newUser.fullName,
                    username : newUser.userName,
                    profilePic : newUser.profilePic,
                })
            } else {
                res.status(400).json({ error:"Invalid user data"})
            }
    } catch(error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({error:"Internal server error"});
    }
}