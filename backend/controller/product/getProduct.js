const productModel = require("../../models/productModel")


const getProductController = async (req,res)=>{

    try {

        const allProduct  = await productModel.find().sort({crearedAt : -1})

        res.json({message:"All Product", success:true, data:allProduct})
        
    } catch (error) {
        res.json({success:false,message:error})

        
    }


}

module.exports =  getProductController