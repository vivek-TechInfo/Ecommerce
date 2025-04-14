const mongoose =  require("mongoose")

const productSighma = new mongoose.Schema({
    productName: String,
    brandName: String,
    category: String,
    productImage: [],
    description: String,
    price: Number,
    sellingPrice: Number,
},{timestamps:true})



const productModel = mongoose.model("product",productSighma)


module.exports =  productModel