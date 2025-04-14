import React, { useState , useEffect} from 'react'
import UploadProduct from '../components/UploadProduct'
import summeryApi from '../common'
import AdminProductCard from '../components/AdminProductCard'

const AllProduct = () => {

  const [openUploadProduct,setopenUploadProduct] =  useState(false)
  const [allProduct,setAllProduct ]=  useState([])


  const getAllProduct =  async(req,res)=>{

    const responseData =  await fetch(summeryApi.getAllProduct.url,{
      method:summeryApi.getAllProduct.method,

    })

    const allProduct =  await responseData.json()

      console.log(allProduct.data);


        setAllProduct(allProduct?.data || [] )


     
    
  }


  useEffect(() => {

    getAllProduct()

  }, [])
  
  



  return (
    <div>
      <div className="bg-white py-2 px-4 flex justify-between items-center">
        <h2 className="font-bold text-lg">All Product</h2>
        <button onClick={()=> setopenUploadProduct(true)} className='border-2 border-red-600 text-white-600 py-1 px-3  hover:bg-red-600 hover:text-white rounded-3xl font-semibold transition-all duration-300'>Upload Product</button>
      </div>


      {/* all product */}


      <div className='flex gap-6  justify-center flex-wrap py-4 bg-blue-100 h-[calc(100vh-200px)] overflow-y-scroll '>
        {
          allProduct.map((product,index)=>{
            return(
              <AdminProductCard getAllProduct={getAllProduct} data={product} key={index + "allProduct"}/>

            )
          })
        }

      </div>





      {/* {upload product component} */}
      {
        openUploadProduct && (  <UploadProduct fetchData={getAllProduct} onClose={()=>setopenUploadProduct(false)} />  )
      }

    </div>
  )
}

export default AllProduct