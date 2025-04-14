const domain = "http://localhost:8080"

const summeryApi = {
    SignUp:{
        url:`${domain}/api/signup`,
        method:"post"
    },
    signIn:{
        url:`${domain}/api/signin`,
        method:"post"
    },
    current_user:{
        url:`${domain}/api/user-details`,
        method:"get"
    },

    logout_user:{
        url:`${domain}/api/userlogout`,
        method:"get"
    },
    all_user:{
        url:`${domain}/api/all-user`,
        method:"get"
    },

    updateUser:{
        url:`${domain}/api//update-user`,
        method:"post"
    },
    uploadProduct:{
        url:`${domain}/api/upload-Product`,
        method:"post"
    },
    getAllProduct:{
        url:`${domain}/api/get-product`,
        method:"get"
    },
    updateProduct:{
        url:`${domain}/api/update-product`,
        method:"post"
    },
    categoryProduct:{
         url:`${domain}/api/get-categoryProduct`,
        method:"get"

    },
    categoryWiseProduct:{
        url:`${domain}/api/category-Product`,
        method:"post"
    },
    productDetails:{
        url:`${domain}/api/product-details`,
        method:"post"
    },
    addToCartProduct:{
        url:`${domain}/api/addtocart`,
        method:"post"


        
        
    },
    countAddToCartProduct:{

     url:`${domain}/api/countAddToCartProduct`,
     method:"get"

    },
    addToCartProductView :{
        url:`${domain}/api/view-cart-product`,
        method:"get"
   
       },
    // updateCartProduct:{
    //     url:`${domain}/api/update-cart-product`,
    //     method:"post",
    //  },
     updateAddCartProduct:{
     url:`${domain}/api/update-cart-product`,
     method:"post"


     },
     deleteAddToCartProduct:{
        url:`${domain}/api/delete-cart-product`,
        method:"post"
      
        },
        SerachProduct:{
          url:`${domain}/api/search`,
         method:"get"
            
          },
          filterProduct:{
            url:`${domain}/api/filter-product`,
           method:"post"
              
            },
    
  






}


export default summeryApi