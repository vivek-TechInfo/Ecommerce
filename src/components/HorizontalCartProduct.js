import React ,{useContext, useEffect,useRef,useState}from 'react'
import fetchCategoryWiseProduct from '../helper/fetchCategoryWiseProduct';
import DisplayCurrency from "../helper/DisplayCurrency"
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import { Link } from 'react-router-dom';
import AddToCart from "../helper/AddToCart"
import Context from '../context';


const HorizontalCartProduct = ({category,heading}) => {


  const [data, setData] =  useState([])
  const [loading, setloading] =  useState(false)
  // console.log(data);

  const loadingList = new Array(13).fill(null)

  const [scroll, setScroll] =  useState(0)
  const scrollElement =  useRef()

  const { fetchUserAddToCart } = useContext(Context)

  const handleAddToCart = async (e,id)=>{
    await AddToCart(e,id)
    fetchUserAddToCart()

  }


  

  




const fetchData = async()=>{
  setloading(true)
  const categoryProduct = await fetchCategoryWiseProduct(category)
  setloading(false)
  setData(categoryProduct?.data)
}

  useEffect(()=>{

    fetchData()
  },[])

  const scrollRight = ()=>{
    scrollElement.current.scrollLeft +=300
  }

  const scrollLeft = ()=>{
    scrollElement.current.scrollLeft -=300
  }

  return (
    <div className='container mx-auto px-6 my-6 relative  '>
        <h2 className='font-semibold  text-2xl py-4 font-serif'>{heading}</h2>

        <div className='flex items-center shadow-sm gap-4 overflow-scroll scrollbar-none transition-all  duration-300 ' ref={scrollElement}>
        <button onClick={scrollLeft}  className='bg-white shadow-md rounded-full absolute left-0  text-lg hidden md:block transition-all  duration-300'><FaAngleLeft /></button>
        <button onClick={scrollRight}  className='bg-white transition-all  duration-300 shadow-md rounded-full absolute right-0 text-lg hidden md:block '><FaAngleRight/></button>

          
        {
          loading ? (
            loadingList.map((item,index)=>{
              return(
  
                <div key={index + "product"} className="w-full min-w-[280px] md:min-w-[320px]   max-w-[280px] md:max-w-[320px] h-36  bg-white rounded-sm shadow-sm flex ">
  
                <div className="bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] cursor-pointer animate-pulse  ">
    
    
                </div>
                <div className='p-4 grid w-full gap-2'>
  
                <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black bg-slate-200 animate-pulse  rounded-full p-1'></h2>
                <p className='capitalize bg-slate-200 p-1 w-full animate-pulse  rounded-full  '></p>
  
                <div className='flex gap-3 w-full animate-pulse  rounded-full '>
                  <p className='text-red-600 font-semibold p-1 w-full  bg-slate-200 animate-pulse  rounded-full'></p>
                  <p className='text-slate-500 line-through p-1 w-full  bg-slate-200 animate-pulse  rounded-full'></p>
  
                </div>
                <button className=' duration-200  bg-slate-200 transition-all text-white px-2 py-1 text-sm   my-2 w-full animate-pulse rounded-full'></button>
  
                </div>
                
            </div>
  
              )
            })
            
          ):(

            data.map((item,index)=>{
              return(
  
                <Link key={index + "product"} to={"/product/"+item?._id} className="w-full min-w-[280px] md:min-w-[320px]   max-w-[280px] md:max-w-[320px] h-36  bg-white rounded-sm shadow-sm flex">
  
                <div className="bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] cursor-pointer  ">
    
                    <img src={item.productImage[0]} alt="" className='object-scale-down h-full hover:scale-125 duration-300 transition-all' />
    
                </div>
                <div className='p-4 grid '>
  
                <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1  text-black'>{item?.productName}</h2>
                <p className='capitalize text-slate-500'> {item?.category}</p>
  
                <div className='flex gap-3 '>
                  <p className='text-red-600 font-semibold'>{DisplayCurrency(item?.sellingPrice)}</p>
                  <p className='text-slate-500 line-through'>{DisplayCurrency(item?.price)}</p>
  
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

export default HorizontalCartProduct