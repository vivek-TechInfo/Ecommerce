const jwt = require('jsonwebtoken')


const authToken = async (req,res,next)=>{
    try {

        const token  =  req.cookies?.token 
        // console.log("token",token);

        if(!token){
            return res.json({message:"Please Login.....!",success:false , error:false})
        
        }


        jwt.verify(token,process.env.TOKEN_SECRET_KEY,function(err,decoded){
            // console.log(err);
            // console.log("Decoded",decoded);


            
        if(err){
            // console.log(err,"authToken");

        }
        req.userId = decoded?._id

        // console.log(req.userId);

        next()
        })




        
    } catch (error) {

        res.json({success:false,message:error})

        
    }
}


module.exports = authToken