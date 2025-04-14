const addToCartModel = require("../../models/cartProduct")

const addToCartController = async(req,res)=>{

     try {

        const { productId } =  req?.body
        const currentUser =  req.userId

        // console.log("currentUser",currentUser)

        const isProductAvaialble =  await addToCartModel.findOne({productId:productId})

        // console.log("isProductAvaialble", isProductAvaialble)

        if(isProductAvaialble){
           return res.json({success:false ,message:"Already exists in your cart" ,error:false})
        }

        const payload  = {
            productId : productId,
            quantity : 1,
            userId : currentUser,
        }

        const newAddToCart = new addToCartModel(payload)
        const saveProduct = await newAddToCart.save()

        res.json({success:true,message:"Product Added in Cart",data:saveProduct})





        
    } catch (error) {

        res.json({success:false,message:"error"})
        
    }

}


module.exports =   addToCartController