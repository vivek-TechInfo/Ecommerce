const userLogout = async(req,res)=>{
    try {


        res.clearCookie("token")

        res.json({success:true,message:"Logout successfully" , data:[]})

        
    } catch (error) {
        res.json({success:false,message:"Error"})
        
    }
}


module.exports =  userLogout