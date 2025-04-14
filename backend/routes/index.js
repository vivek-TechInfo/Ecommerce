const express =  require('express')
const router =  express.Router()
const userSignUpController  = require("../controller/user/userSignUp")
const userSignInController  =  require("../controller/user/userSignIn")
const userDetailController = require('../controller/user/userDetails')
const authToken = require('../middleware/authToken')
const userLogout = require('../controller/user/userLogout')
const allUser = require('../controller/user/allUsers')
const updateUser = require('../controller/user/updateUser')
const uploadProductController = require('../controller/product/uploadProduct')
const getProductController = require('../controller/product/getProduct')
const updateProductController = require('../controller/product/updateProduct')
const getCategoryProductOne = require('../controller/product/getCategoryProductOne')
const getCategoryWiseProduct = require('../controller/product/getCategoryWiseProduct')
const getProductDetails = require('../controller/product/getProductDetails')
const addToCartController = require('../controller/user/addToCartController')
const countAddToCartProduct = require('../controller/user/countAddToCartProduct')
const addToCartViewProduct = require('../controller/user/addToCartViewProduct')
const updateAddToCartProduct = require('../controller/user/updateAddToCartProduct')
const deleteAddToCartProduct = require('../controller/user/deleteAddToCartProduct')
const SerachProduct = require('../controller/product/searchProduct')
const filterProductController = require('../controller/product/filterProduct')


router.post("/signup",userSignUpController)

router.post("/signin",userSignInController) 

router.get("/user-details",authToken,userDetailController)

router.get('/userlogout',userLogout)



//admin panel
router.get("/all-user",authToken,allUser)


router.post("/update-user",authToken,updateUser)


//upload product

router.post("/upload-Product",authToken,uploadProductController)


router.get("/get-product",getProductController)

//updateProduct

router.post("/update-product",authToken,updateProductController)


router.get("/get-categoryProduct",getCategoryProductOne)

router.post("/category-Product",getCategoryWiseProduct)

router.post("/product-details",getProductDetails)
router.get("/search",SerachProduct)

router.post("/filter-product",filterProductController);


//user addToCart

router.post("/addtocart",authToken,addToCartController)


router.get("/countAddToCartProduct",authToken,countAddToCartProduct)

router.get("/view-cart-product", authToken,addToCartViewProduct)

router.post("/update-cart-product",authToken,updateAddToCartProduct)

router.post("/delete-cart-product",authToken,deleteAddToCartProduct)





module.exports =  router