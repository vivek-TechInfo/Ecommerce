const uploadProductPermission = require("../../helper/permission")
const productModel = require("../../models/productModel")

const uploadProductController = async (req,res)=>{
    try {

        const sessionUserId = req.userId

        if(!uploadProductPermission(sessionUserId)){
            res.json({success:true,message:"Permission denied"})         

        }

        const uploadProduct  = new productModel(req.body)
        const saveProduct = await uploadProduct.save()

        res.json({success:true,message:"Product upload successfully" ,data:saveProduct})




        
    } catch (error) {

        res.json({success:false,message:error})

        
    }
}


module.exports =  uploadProductController
