const productModel = require("../../models/productModel");

const filterProductController = async(req,res)=>{

    try {

        const categoryList = req?.body?.category || [];
        // "$in" is the Array

        const product  =  await productModel.find({
            category:{
                "$in":categoryList
            }
        })


        res.json({success:true, data:product,message:"product"});
        
    } catch (error) {
        res.json({success:false, message:error})
        
    }

}

module.exports = filterProductController;