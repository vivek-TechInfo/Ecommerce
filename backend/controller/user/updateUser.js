const userModel   =  require("../../models/userModel")

const updateUser = async (req,res)=>{
    try {

        const sessionUser  = req.userId


        const {userId,email,name,role}  =  req.body

        const payload = {
            ...(email && {email:email}),
            ...(name && {name:name}),
            ...(role && {role:role}),
        }

        const user =  await userModel.findById(sessionUser)
        // console.log("user ji",user.role);

        const updateUser =  await userModel.findByIdAndUpdate(userId,payload)

        res.json({message:"User Updated", success:true,data:updateUser})

}

        
     catch (error) {

        res.json({success:false,message:error})

        
    }
}


module.exports = updateUser