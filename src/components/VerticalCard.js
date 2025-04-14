import React, { useContext } from 'react'
import scrollTop from '../helper/scrollTop'
import Context from '../context'
import addToCart from '../helper/AddToCart'
import { Link } from 'react-router-dom'
import displayINRCurrency from '../helper/DisplayCurrency'

const VerticalCard = ({loading,data= []}) => {
    const loadingList = new Array(13).fill(null)

    const { fetchUserAddToCart } = useContext(Context)

    const handleAddToCart = async (e,id)=>{
     await addToCart(e,id)
  
     fetchUserAddToCart()
  
  
    }

    
  return (

    <div className='px-6  relative '>

    <div className=' grid grid-cols-[repeat(auto-fit,minmax(300px,300px))] gap-4 justify-center  md:justify-around  overflow-x-scroll scrollbar-none transition-all  duration-300 ' >


          
    {
      loading ? (
        loadingList.map((item,index)=>{
          return(

            <div className="w-full min-w-[280px] md:min-w-[320px] m-2   max-w-[280px] md:max-w-[320px]   bg-white rounded-lg shadow-lg ">

            <div className="bg-slate-200  h-44 p-4 min-w-[280px] md:min-w-[145px] cursor-pointer flex justify-center items-center animate-pulse  ">



            </div>
            <div className='p-4 grid gap-3 '>

            <h2 className='font-medium animate-pulse text-base md:text-lg text-ellipsis line-clamp-1 text-black py-2 bg-slate-200 rounded-full  w-full '></h2>
            <p className='capitalize text-slate-500 animate-pulse rounded-full py-2   w-full p-1 bg-slate-200'></p>

            <div className='flex gap-3 '>
              <p className='text-red-600 font-semibold rounded-full py-2   animate-pulse w-full p-1 bg-slate-200 '></p>
              <p className='text-slate-500 line-through  rounded-full py-2  animate-pulse w-full p-1 bg-slate-200'></p>

            </div>
            <button className='p-1 animate-pulse bg-slate-200 rounded-full py-2   duration-200 transition-all text-white px-2  text-sm   my-2'> </button>

            </div>
            
        </div>

          )
        })
      ):(

        data.map((item,index)=>{
          return(

            <Link to={"/product/"+item?._id} className="w-full min-w-[280px] md:min-w-[320px] m-2   max-w-[280px] md:max-w-[320px]   bg-white rounded-lg shadow-lg " onClick={()=>scrollTop()}>

            <div className="bg-slate-200  h-44 p-4 min-w-[280px] md:min-w-[145px] cursor-pointer flex justify-center items-center  ">

                <img src={item.productImage[0]} alt="" className='object-scale-down h-full hover:scale-125 duration-300 transition-all mix-blend-darken' />

            </div>
            <div className='p-4 grid gap-3'>

            <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>{item?.productName}</h2>
            <p className='capitalize text-slate-500'> {item?.category}</p>

            <div className='flex gap-3 '>
              <p className='text-red-600 font-semibold'>{displayINRCurrency(item?.sellingPrice)}</p>
              <p className='text-slate-500 line-through'>{displayINRCurrency(item?.price)}</p>

            </div>
            <button className='bg-red-500 hover:bg-green-700 duration-200 transition-all text-white px-2 py-1 text-sm  rounded-md my-2'onClick={(e)=> handleAddToCart(e,item?._id)}>Add To Cart</button>

            </div>
            
        </Link>

          )
        })

      )

    }
    </div>

    </div>

  )
}

export default VerticalCard