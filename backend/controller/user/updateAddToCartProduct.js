const addToCartModel = require("../../models/cartProduct");

const updateAddToCartProduct = async(req,res)=>{

try {


  const currentUserId = req.userId 
  const addToCartProductId = req?.body?._id

  console.log("currentUserId",currentUserId)
  console.log("addToCartProductId",addToCartProductId);

  const qty = req.body.quantity

  const updateProduct = await addToCartModel.updateOne({_id : addToCartProductId},{
      ...(qty && {quantity : qty})
  })

    res.json({success:true,message:"Product Update", data:updateProduct})
    
} catch (error) {

    res.json({success:false,message:error})

    
}

}

module.exports = updateAddToCartProduct;