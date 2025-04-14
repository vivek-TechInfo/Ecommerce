import React, { useState,useEffect } from 'react'

import { FaAnglesRight } from "react-icons/fa6";
import { FaAnglesLeft } from "react-icons/fa6";

import image1 from "../assets/banner/img1.webp"
import image2 from "../assets/banner/img2.webp"
import image3 from "../assets/banner/img3.jpg"
import image4 from "../assets/banner/img4.jpg"
import image5 from "../assets/banner/img5.webp"

import image1Mobile from "../assets/banner/img1_mobile.jpg"
import image2Mobile from "../assets/banner/img2_mobile.webp"
import image3Mobile from "../assets/banner/img3_mobile.jpg"
import image4Mobile from "../assets/banner/img4_mobile.jpg"
import image5Mobile from "../assets/banner/img5_mobile.png"

const BannerProduct = () => {
    const [currentImage , setCurrentImage] =  useState(0)
    
    // console.log(currentImage,"currentImage")
    const desktopImages = [
        image1,
        image2,
        image3,
        image4,
        image5

    ]

    const mobileImages = [
        image1Mobile,
        image2Mobile,
        image3Mobile,
        image4Mobile,
        image5Mobile,

    ]

    const nextImage = ()=>{
        

        if(desktopImages.length-1 > currentImage){

            setCurrentImage((prevImage)=> prevImage+1)

        }



    }

    const prevImage = ()=>{
        

        if(currentImage !== 0){

            setCurrentImage((prevImage)=> prevImage-1)

        }



    }


    useEffect(() => {

        const interval = setInterval(()=>{

            if(desktopImages.length-1 > currentImage){

                nextImage()
                // console.log(currentImage,"ewsodkke")
            }else{
                setCurrentImage(0)
            }


        },5000)

        return ()=> clearInterval(interval)
 
    }, [currentImage])
    

  return (
    <div className='container mx-auto px-6 rounded-sm  '>
        <div className=' h-56 md:h-72 w-full bg-slate-200 relative  '>


            <div className=' absolute z-10 h-full w-full md:flex items-center hidden  '>

                <div className='flex justify-between items-center w-full text-2xl p-1'> 

                <button onClick={prevImage} className='bg-white shadow-md rounded-full '><FaAnglesLeft /></button>
                <button onClick={nextImage} className='bg-white shadow-md rounded-full '><FaAnglesRight/></button>

                </div>
            </div>

            {/* desktop tablet version */}

            <div className= 'hidden md:flex h-full  w-full overflow-hidden'>

                {
                    desktopImages.map((imageURL,index)=>{
                        return(

                            <div className='w-full h-full min-w-full min-h-full transition-all duration-500' key={imageURL} style={{transform:`translateX(-${currentImage * 100}%) `}}>
                            <img src={imageURL} alt="" className='w-full h-full' />
                            </div>

                        )
                    })
                }

            </div>

            {/* Mobile  version */}

            <div className='flex h-full  w-full overflow-hidden md:hidden'>

                {
                    mobileImages.map((imageURL,index)=>{
                        return(

                            <div className='w-full h-full min-w-full min-h-full transition-all duration-500' key={imageURL} style={{transform:`translateX(-${currentImage * 100}%) `}}>
                            <img src={imageURL} alt="" className='w-full h-full ' />
                            </div>

                        )
                    })
                }

                </div>


           

        </div>
    </div>
  )
}

export default BannerProduct