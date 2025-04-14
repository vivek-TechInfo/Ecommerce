import summeryApi from "../common"

const fetchCategoryWiseProduct = async(category)=>{

    const response = await fetch(summeryApi.categoryWiseProduct.url,{
        method:summeryApi.categoryWiseProduct.method,
        headers:{
            "content-type":"application/json"
        },

        body:JSON.stringify({
            category:category
        })
    })

    const responseData =  await response.json()

    
    return responseData


}


export default   fetchCategoryWiseProduct