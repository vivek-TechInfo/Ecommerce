const userModel = require("../../models/userModel");
const bcrypt  =  require("bcrypt");
const jwt = require('jsonwebtoken');

//login1


const userSignInController = async (req,res)=>{
    const {email,password} =  req.body

    try {
        if(!email){
            // throw new Error("please provide email")
            return res.json({success:false,message:"please provide email"})
        }
        if(!password){
            return res.json({success:false,message:"Please provide password"})
        }

        const user = await userModel.findOne({email})
        if(!user){
            return res.json({success:false,message:"User doesn't exist"})
        }

        const isMatch  = await bcrypt.compare(password,user.password)

        if(!isMatch){
            return res.json({success:false,message:"Password doesn't match"})
        }

        const tokenData = {
            _id:user._id,
            email:user.email

        }

        const token =  await jwt.sign(tokenData , process.env.TOKEN_SECRET_KEY,{expiresIn:60*60*8})
        const tokenOption = {
            httpOnly:true,
            secure:true
        }

        res.cookie("token",token,tokenOption).json({success:true,message:"Login successful", token})

        
    } catch (error) {
        res.json({success:false,message:"Error"})
        
    }


}


module.exports =   userSignInController