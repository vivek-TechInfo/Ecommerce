const userModel = require("../../models/userModel");

const allUser = async (req,res)=>{

    try {

        const users =  await userModel.find()

        res.json({success:true,data:users})

        // console.log("userId" ,req.userId);
        
    } catch (error) {

        res.json({success:false,message:error})
        
    }

}


module.exports   =  allUser