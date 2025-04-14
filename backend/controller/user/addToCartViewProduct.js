const addToCartModel = require("../../models/cartProduct")

const addToCartViewProduct = async (req,res)=>{
    try {

        const currentUser =  req?.userId;

        const allCartProductDeatils = await addToCartModel.find({userId:currentUser}).populate("productId")

        res.json({success:true,message:"All Cart Product" ,data: allCartProductDeatils})
        
    } catch (error) {

        res.json({success:false,message:error})
        
    }
}

module.exports =  addToCartViewProduct