const productModel = require("../../models/productModel")

const getProductDetails = async(req,res)=>{

    try {

        const {productId} = req.body

        const product  =   await productModel.findById(productId)
        

        res.json({success:true,message:"Ok", data:product})


        
    } catch (error) {
        res.json({success:false,message:"ERROR"})
        
    }
}



module.exports = getProductDetails