const uploadProductPermission = require("../../helper/permission")
const productModel = require("../../models/productModel")

const updateProductController = async (req,res)=>{
    try {
        
        if(!uploadProductPermission(req.userId)){
            res.json({success:true,message:"Permission denied"})         
            
        }

        const {_id , ...resbody} = req.body

        // console.log(_id);

        const updateProduct =  await productModel.findByIdAndUpdate(_id,resbody)

        res.json({success:true, message:"Product Update Successfully", data: updateProduct})
        



        
    } catch (error) {

        res.json({success:false,message:error})

        
    }

}


module.exports =  updateProductController