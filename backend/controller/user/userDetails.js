const userModel = require("../../models/userModel")

const userDetailController = async (req,res)=>{
    try {


        const user  = await userModel.findById(req.userId)

        res.json({success:true,message:"User Details",data:user})

        // console.log(user);

        
    } catch (error) {
        res.json({success:false,message:error})
        
    }
}


module.exports = userDetailController