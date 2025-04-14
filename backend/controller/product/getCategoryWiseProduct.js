const productModel = require("../../models/productModel")

const getCategoryWiseProduct = async (req,res)=>{

    try {

        const {category} = req?.body || req?.query

        // console.log(category)

        const product = await productModel.find({category})

        res.json({success:true,message:"Product",data:product})

        
    } catch (error) {

        res.json({success:false,message:"Error"})
        
    }

}

module.exports = getCategoryWiseProduct