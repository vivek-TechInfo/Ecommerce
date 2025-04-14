const productModel = require("../../models/productModel");

const SerachProduct =  async (req,res)=>{

    try {

        const query =  req.query.q

        console.log(query);

        const regex =  new RegExp(query,'i','g')

        console.log("regex",regex)

        const product  =  await productModel.find({
            "$or": [
                {
                    productName : regex
                },
                {
                    category : regex

                }

            ]
        })

        res.json({success:true,data:product})

         
        

        
    } catch (error) {
        res.json({success:false,message:error})
        
    }
}

module.exports = SerachProduct