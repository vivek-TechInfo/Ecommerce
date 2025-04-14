const productModel = require("../../models/productModel")

 

 const  getCategoryProductOne = async (req,res)=>{

    try {

        const productCategory = await productModel.distinct("category")
        // gives different product
        // console.log(productCategory)

        
        
        
        //array to stote 1 product from each category
        const productByCategory = []
        
        for(const category of productCategory){
            const product =  await productModel.findOne({category})
            
            if(product){
                productByCategory.push(product)
            }
        }
        
        // console.log("productByCategory ==>>>",productByCategory)
        res.json({message:"Category Product", data:productByCategory,success:true})

        
    } catch (error) {

        res.json({success:false,message:error})
        
    }
 }


module.exports =   getCategoryProductOne