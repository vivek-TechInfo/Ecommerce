const addToCartModel = require("../../models/cartProduct");

const deleteAddToCartProduct = async (req,res)=>{

    try {

        const userId = req?.userId;
        const addToCartProductId =  req?.body?._id;


        const deleteProduct =  await addToCartModel.deleteOne({_id:addToCartProductId})

        res.json({success:true, message:"Product delete" ,data:deleteProduct})

        
    } catch (error) {

        res.json({success:false,message:error})
        
    }
}

module.exports = deleteAddToCartProduct;