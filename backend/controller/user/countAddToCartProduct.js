const addToCartModel = require("../../models/cartProduct");

const countAddToCartProduct = async(req,res)=>{
    try {


        const userId =  req?.userId;

        const count =  await addToCartModel.countDocuments({userId : userId})

        res.json({success:true,message:"ALl cart product", data:{ count }})

        
    } catch (error) {

        res.json({success:false,message:error})
        
    }
}


module.exports =  countAddToCartProduct