import React, { useState ,useEffect, useContext} from 'react'
import summeryApi from '../common'
import  Context from "../context"
import displayINRCurrency from '../helper/DisplayCurrency'
import { MdDelete } from "react-icons/md";

const Cart = () => {

  const [data , setData] =  useState([])
  console.log(data)

  const [loading , setLoading]  =  useState(false)

  const context = useContext(Context)
  const loadingCart  =  new Array(context.cartProductCount).fill(null)

  // const { fetchUserAddToCart } = useContext(Context)


  const delteCartProduct = async(id)=>{
    
    const response =  await fetch(summeryApi.deleteAddToCartProduct.url,{
      method:summeryApi.deleteAddToCartProduct.method,
      credentials:"include",

      headers:{
      "content-type":"application/json"
      },

      body:JSON.stringify(

        {
          _id:id
        }

      )
    })

    const responseData =  await response.json();

    if(responseData.success){

      fetchData()
      context.fetchUserAddToCart()
    }


  }


  const fetchData = async ()=>{
 
    // setLoading(true)
    
    const response =  await fetch(summeryApi.addToCartProductView.url,{
      method:summeryApi.addToCartProductView.method,
      credentials:"include",
      headers:{
        "content-type":"application/json"
    },

    })

    // setLoading(false)

    const responseData =  await response.json()

    if(responseData.success){

      setData(responseData.data)

    }



  }


  const loadingData =  async()=>{
    await fetchData()
  }


  useEffect(() => {

    setLoading(true)

    loadingData()
    setLoading(false)


   
    
  },[])

  const increseQty = async(id,qty) =>{
    const response = await fetch(summeryApi.updateAddCartProduct.url,{
        method :summeryApi.updateAddCartProduct.method,
        credentials : 'include',
        headers : {
            "content-type" : 'application/json'
        },
        body : JSON.stringify(
            {   
                _id : id,
                quantity : qty + 1
            }
        )
    })

    const responseData = await response.json()


    if(responseData.success){
        fetchData()
    }
}

  const decreaseOty =  async(id ,qty)=>{

    console.log("qty",qty)
    console.log("id",id)

    if(qty >= 2){

      const response = await fetch(summeryApi.updateAddCartProduct.url,{
        method :summeryApi.updateAddCartProduct.method,
        credentials : 'include',
        headers : {
            "content-type" : 'application/json'
        },
        body : JSON.stringify(
            {   
                _id : id,
                quantity : qty - 1
            }
        )
    })

    const responseData = await response.json()


    if(responseData.success){
        fetchData()
    }

    }



  }


  const totalQty = data.reduce((previousValue,currentValue)=> previousValue + currentValue.quantity,0)
  const totalPrice = data.reduce((previousValue, currentValue)=> previousValue  + (currentValue?.productId?.sellingPrice * currentValue?.quantity),0)
  
  return (
    <div className='container mx-auto'>

      <div className='text-center text-lg my-3'>
          {
            data.length === 0 && !loading && (
              <p className='bg-white py-5'>No Data</p>
            )
          }

      </div>

      <div className=' flex flex-col lg:flex-row gap-10 lg:justify-between p-4'>

          {/* // ViewProduct */}
        <div className='w-full max-w-3xl '>
          {
            
              loading ? (
                loadingCart.map((count , index)=>{
                  return(
                    <div key={count + index + "ai" } className='w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded'>


                    </div>

                  )
                })


              ):(

                data.map((product , index)=>{
                  return(

                    <div key={product?._id + "AddToCartLoading"} className='w-full bg-white h-32 my-2 border border-slate-200 rounded grid grid-cols-[128px,1fr]'>

                      <div className='w-32 h-32 bg-slate-200'>

                        <img src={product?.productId?.productImage[0]} alt="" className='w-full h-full object-scale-down mix-blend-multiply' />

                      </div>

                      <div className='px-4 py-2  relative '>

                      <div onClick={()=>delteCartProduct(product?._id)} className='absolute right-0 cursor-pointer hover:bg-red-500 rounded-full p-2 hover:text-white'>

                        <MdDelete />

                      </div>

                        <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1'>{product?.productId?.productName}</h2>
                        <p className='capitalize text-slate-500'>{product?.productId?.category}</p>

                        <div className='flex items-start justify-between '>
                        <p className='text-red-600 font-medium text-lg '>{displayINRCurrency(product?.productId?.sellingPrice)}</p>

                        <p className='text-slate-600 font-semibold text-lg '>{displayINRCurrency(product?.productId?.sellingPrice * product.quantity)}</p>

                        </div>


                        <div className='flex items-center gap-3 mt-1'>

                          
                          <button onClick={()=>decreaseOty(product?._id, product.quantity)} className=' border border-red-600 hover:bg-red-500 font-extrabold  hover:text-white text-red-600 w-6 h-6 text-center flex justify-center items-center rounded'>-</button>
                          <span>{product?.quantity}</span>
                          <button onClick={()=>increseQty(product?._id , product?.quantity)} className=' border border-red-600 hover:bg-green-500 font-extrabold hover:text-white text-red-600 w-6 h-6 text-center flex justify-center items-center rounded'>+</button>


                        </div>
                      </div>


                    </div>

                  )
                })

              )
            

          }

        </div>

        {/* {summery product} */}

        <div className='mt-5 lg:mt-0 w-full max-w-sm'>


        {
          loading ?(

            <div className='h-36 bg-slate-200 border border-slate-300 animate-pulse'>
            
  
          </div>

          ):(
            <div className='h-36 bg-white'>
            
            <h2 className='text-white bg-red-600 px-4 py-1 text-center'>Summery</h2>

            <div className='flex items-center justify-between px-4  font-medium text-lg text-slate-600 gap-2'>
              <p>Quantity</p>
              <p>{totalQty}</p>
            </div>

            <div className='flex items-center justify-between px-4  font-medium text-lg text-slate-600 gap-2'>
              <p>Total Price</p>
              <p>{displayINRCurrency(totalPrice)}</p>

            </div>

            <button className='bg-blue-600  p-2 rounded-sm mt-6 hover:bg-green-500  transition-all  duration-150  text-white w-full'>Payment</button>
  
          </div>
          )
        }

        </div>





      </div>



    </div>
  )
}

export default Cart