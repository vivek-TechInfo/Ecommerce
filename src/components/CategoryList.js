import React, { useState , useEffect} from 'react'
import summeryApi from '../common'
import { Link } from 'react-router-dom'

const CategoryList = () => {

  const [categoryProduct , setCategoryProduct] =  useState([])

  const [loading , setLoading] = useState(false)

  const categoryLoading = new Array(13).fill(null)
  // console.log("ARRAY",categoryLoading);
  

  const fetchCategoryProduct  =  async(req,res)=>{
    setLoading(true)
    const response =  await fetch(summeryApi.categoryProduct.url)
    const dataResponse =  await response.json()

    setLoading(false)

    if(dataResponse.success){

      setCategoryProduct(dataResponse.data)
      // console.log(categoryProduct)
    }

  }

  useEffect(() => {

    fetchCategoryProduct()


  }, [])
  
  return (
    <div className='container mx-auto p-4'>
      {/* Jai Sri RadhaKrishn */}

      <div className='flex items-center gap-4 justify-between overflow-scroll scrollbar-none '>
      {
        loading ? (


            categoryLoading.map((item,index)=>{

              return(


                    <div className='h-16 w-16 md:h-20 md:w-20 rounded-full overflow-hidden bg-slate-200 animate-pulse' key={"categoryLoading"+index}>


                    </div>

              )

              

            })



        ):(
          categoryProduct.map((item,index)=>{
            return(
              <Link key={item?.category} to={"/product-category?category="+item?.category} className='cursor-pointer'>
                <div className=' w-16 h-16 md:w-20 md:h-20  rounded-full overflow-hidden p-4 bg-slate-200 flex items-center justify-center '>
                  <img src={item?.productImage[0]} alt={item?.category} className='h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all '  />
                </div>
                  <p className='text-center text-sm md:text-base capitalize'>{item?.category}</p>
              </Link>
            )
          })
        )

      }
      </div>

      </div>
  )
}

export default CategoryList