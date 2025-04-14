import summeryApi from "../common"
import { toast } from "react-toastify";


const addToCart =  async (e,id)=>{

    console.log("id h product ka",id)

    e?.stopPropagation()
    e?.preventDefault()


    const response =  await fetch(summeryApi.addToCartProduct.url,{
        method:summeryApi.addToCartProduct.method,
        credentials : 'include',

        headers : {
            "content-type" : 'application/json'
        },
        body : JSON.stringify(
            { productId : id }
        )

        
    })


    const responseData = await response.json()



    console.log(responseData.success)

    if(responseData.success){
        toast.success(responseData.message)
    }
    if(responseData.success === false){
        toast.error(responseData.message)
    }


    return responseData



    



    

}



export default addToCart