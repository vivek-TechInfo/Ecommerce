const mongoose =  require("mongoose")

const userSignUpSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    profilePic:{
        type:String

    },
    password:{
        type:String,
        required:true

    },
    role:{
        type:String,
        default:"GENERAL"
    }
},{timestamps:true})



const userModel = mongoose.model("user",userSignUpSchema)


module.exports =  userModel