import React, { useState } from "react";
import { MdModeEdit } from "react-icons/md";
import AdminEditProduct from "./AdminEditProduct";
import displayINRCurrency from "../helper/DisplayCurrency";

const AdminProductCard = ({data,key,getAllProduct}) => {

  // console.log(data);

  const [editProduct , setEditProduct] =  useState(false)
  // console.log(editProduct)
  return (
    <div className="bg-white p-4 rounded shadow-lg ">
      <div
        className="w-40 "
        key={key}
      >
        <div className=" h-32 flex justify-center items-center">
        <img src={data?.productImage[0]} width={120} height={120} alt="" className="mx-auto object-fill h-full" />

        </div>
        <h1 className="font-semibold  text-ellipsis line-clamp-6 ">{data.productName}</h1>

        <div>

          <p className="font-semibold">
            {
              displayINRCurrency(data.sellingPrice)
            }
          </p>

        <div onClick={()=>setEditProduct(true)}  className="w-fit ml-auto p-2 bg-green-500 hover:bg-green-600  rounded-full text-white cursor-pointer">
        <MdModeEdit  />
        </div>

        </div>

        
      </div>
      {
        editProduct && <AdminEditProduct getAllProduct={getAllProduct}  onClose={()=> setEditProduct(false)} productData={data}/>
      }
    </div>
  );
};

export default AdminProductCard;
