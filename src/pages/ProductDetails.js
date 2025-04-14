import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import summeryApi from "../common";
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import displayINRCurrency from "../helper/DisplayCurrency"
import VerticalCartProduct from "../components/VerticalCartProduct";
import CategoryWiseProductDisplay from "../components/CategoryWiseProductDisplay";
import addToCart from "../helper/AddToCart";
import Context from "../context";

const ProductDetails = () => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  });

  const params = useParams();
  console.log("product Id", params);

  const [loading, setLoading] = useState(false);

  const productImageLoading = new Array(4).fill(null);

  const [activeImage , setActiveImage] = useState("")

  const [zoomImage , setZoomImage] = useState({
    x:0,
    y:0
  })

  const [zommZoomImage , setZoomZoomImage] =  useState(false)

  const fetchProductDetails = async (req, res) => {
    setLoading(true);

    const responseData = await fetch(summeryApi.productDetails.url, {
      method: summeryApi.productDetails.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        productId: params?.id,
      }),
    });

     setLoading(false)

    const dataRes = await responseData.json();

    if (dataRes.success) {
      setData(dataRes?.data);
      setActiveImage(dataRes?.data?.productImage[0])
    }
  };

  console.log("data", data);

  useEffect(() => {
    fetchProductDetails();
  }, [params]);


  const handleMouseEnterProduct =  (imageURL)=>{

    setActiveImage(imageURL)


  }

  const { fetchUserAddToCart } = useContext(Context)
  const navigate =  useNavigate()

  const handleAddToCart = async(e,id)=>{

    await addToCart(e,id)
    fetchUserAddToCart()
    
    

  }
  

  const handleBuyProduct =  async(e,id)=>{
    await addToCart(e,id)
    fetchUserAddToCart()
    navigate("/cart")

  }


  const handleZoomImage = useCallback((e)=>{
    setZoomZoomImage(true)
    const {left , top , width, height} = e.target.getBoundingClientRect()
    console.log("cordinate ", left , top, width , height)

    const x  =  (e.clientX - left) / width
    const y =  (e.clientY - top) / height

    setZoomImage({
      x,
      y
    },



    )


  },[zoomImage])

  console.log(data,"DATTAAAAAAAAAAA");
  


  const halneLeaveImage  = ()=>{
    setZoomZoomImage(false)
  }

  return (
    <div className="container mx-auto p-4 ">
      <div className="min-h-[200px] flex flex-col lg:flex-row gap-4">

        {/* product Image */}
        <div className="h-96 flex flex-col lg:flex-row-reverse gap-4 ">

          <div className="h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 p-2">
            <img src={activeImage} alt="" className="h-full w-full object-scale-down mix-blend-darken cursor-pointer" onMouseMove={handleZoomImage} onMouseLeave={halneLeaveImage}/>

         {/*Product Zoom  */}

         {
          zommZoomImage && (

            
          <div className=" hidden lg:block absolute min-w-[500px] overflow-hidden min-h-[400px] bg-slate-200 p-1 -right-[-390px] top-20">

          <div className="w-full h-full min-h-[400px] min-w-[500px] scale-120 mix-blend-multiply" style={{background:`url(${activeImage})`,backgroundRepeat:`no-repeat`,backgroundPosition:`${zoomImage.x * 100}%  ${zoomImage.y * 100}%`}}>

          </div>

        </div>

          )
         }


          </div>



          <div className="h-full ">
            {loading ? (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full" >

                {
                productImageLoading?.map((el,index) => {
                  return (
                    <div className="h-20 w-20 bg-slate-300 animate-pulse  rounded" key={"loadingImage"+index}>

                    </div>
                  );
                })
                }

              </div>
            ) : (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">

              {
              data?.productImage?.map((imageURL,index) => {
                return (
                  <div className="h-20 w-20 bg-slate-200 p-1  rounded" key={imageURL}>
                    <img src={imageURL} alt="" className="w-full h-full object-scale-down mix-blend-darken cursor-pointer" onClick={()=>handleMouseEnterProduct(imageURL)} onMouseEnter={()=> handleMouseEnterProduct(imageURL)}/>

                  </div>
                );
              })
              }

            </div>
            )}
          </div>
        </div>

        {/* product details */}

        {
          loading ? (
            <div className="flex flex-col  gap-1">

            <p className=" bg-slate-200 animate-pulse  my-2 w-full py-4   "></p>
            <h2 className=" text-2xl bg-slate-200 animate-pulse   my-2 w-full py-4  "></h2>
            <p className="bg-slate-200 animate-pulse   my-2 w-full py-4 "></p>
  
            <div className="bg-slate-200 animate-pulse w-full py-4   flex items-center gap-1">
  
  
            </div>
  
            <div className="flex items-center gap-4 text-2xl lg:text-3xl font-medium my-1 bg-slate-200 animate-pulse  w-56 py-4  ">

            </div>
  
            <div className="flex  items-center my-2 gap-3 animate-pulse py-4">
              <button className=" px-3  min-w-[200px]  font-medium  bg-slate-200 animate-pulse py-4"></button>
              <button className=" px-3 min-w-[200px] font-medium bg-slate-200 animate-pulse py-4"></button>
            </div>
  
            <div className="bg-slate-200 animate-pulse   w-[800px] py-16">
              <p className="py-4 bg-slate-200"> </p>
              <p className="bg-slate-200"></p>
            </div>
  
          </div>
          ):(
            <div className="flex flex-col  gap-1">

            <p className="capitalize text-red-600 bg-red-200 font-semibold rounded-full px-2 w-fit">{data?.brandName}</p>
            <h2 className="text-2xl lg:text-4xl font-medium">{data?.productName}</h2>
            <p className="capitalize text-slate-400">{data?.category}</p>
  
            <div className="text-red-600 flex items-center gap-1 ">
  
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStarHalf />
  
            </div>
  
            <div className="flex items-center gap-4 text-2xl lg:text-3xl font-medium my-1">
              <p className=" text-red-600">{displayINRCurrency(data.sellingPrice)}</p>
              <p className="text-slate-400 line-through">{displayINRCurrency(data.price)}</p>
            </div>
  
            <div className="flex items-center my-2 gap-3">
              <button className="border-2  bg-white text-red-500 border-red-600 rounded px-3 duration-150 min-w-[100px] py-2 font-medium " onClick={(e)=>handleBuyProduct(e,data._id)} >Buy</button>
              <button className="border-2 bg-red-500 text-white border-red-600 rounded px-3 hover:bg-white hover:text-red-500 min-w-[100px] py-2 font-medium " onClick={(e)=>handleAddToCart(e,data._id)}>Add To Cart</button>
            </div>
  
            <div>
              <p className="text-slate-600 font-medium my-1">Description: </p>
              <p>{data?.description}</p>
            </div>
  
          </div>
          )
        }

      </div>


      {
        data.category && (

          <CategoryWiseProductDisplay  category={data.category} heading={"Recommend Product"}  />
        )
      }





    </div>
  );
};

export default ProductDetails;
