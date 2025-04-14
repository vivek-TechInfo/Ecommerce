import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import productCategory from "../helper/ProductCategory";
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from "../helper/uploadImage";
import DisplayImage from "./DisplayImage";
import { MdDelete } from "react-icons/md";
import summeryApi from "../common";
import { toast } from "react-toastify";

const UploadProduct = ({ onClose,fetchData }) => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  });

  
  // console.log(data)

  // console.log(data.productImage);

  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");

  const onChangeHandler = (e) => {
    const name = e.target.name;
    // console.log(name);
    const value = e.target.value;
    // console.log(value);

    setData((prev)=>{

      return{
        ...prev,
        [name]:value
      }

    })


  };

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];

    const uploadImageCloudnary = await uploadImage(file);
    // console.log(uploadImageCloudnary);

    setData((prev) => {
      return {
        ...prev,
        productImage: [...prev.productImage, uploadImageCloudnary.url],
      };
    });
    
  };


  const handleDeleteProduct =  async (index)=>{


    const  newProductImage = [...data.productImage]

    newProductImage.splice(index,1)

    setData((prev) => {
      return {
        ...prev,
        productImage: [...newProductImage],

      };
    });
    
    // console.log(data.productImage);
    
  }


  const handleSubmit = async (e)=>{
    e.preventDefault()

    // console.log(e);

    const responseData =  await fetch(summeryApi.uploadProduct.url,{

      method:summeryApi.uploadProduct.method,
      credentials: "include",

        headers:{
          'content-type':"application/json"
      },
      body:JSON.stringify(data)

    })


    const productData =  await responseData.json()

    console.log(productData);


    if(productData.success){
      toast.success(productData?.message)
      onClose()
      fetchData()

      
    }


    if(productData.error){
      toast.error(productData?.message)

      
    }




    

  }
  

  return (
    <div className="fixed w-full bg-blue-100 bg-opacity-35 h-full top-0 bottom-0 left-0 right-0 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-full max-w-xl h-full max-h-[80%] overflow-hidden ">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-lg ">Upload Product</h1>
          <div className="cursor-pointer hover:text-red-500 font-bold text-lg">
            <RxCross2 onClick={onClose} />
          </div>
        </div>

        <form className="grid p-4 gap-2 overflow-y-scroll h-full pb-20" onSubmit={handleSubmit}>
          <label htmlFor="productName">Product Name :</label>
          <input
            className="p-1 bg-slate-100 border rounded"
            type="text"
            id="productName"
            placeholder="Enter product name"
            name="productName"
            value={data.productName}
            onChange={onChangeHandler}
            required
          />

          <label htmlFor="brandName">Brand Name :</label>
          <input
            className="p-1 bg-slate-100 border rounded"
            type="text"
            id="brandName"
            placeholder="Enter brandName name"
            name="brandName"
            value={data.brandName}
            onChange={onChangeHandler}
            required
          />

          <label htmlFor="category">Category :</label>
          <select
            className="p-1 bg-slate-100 border rounded"
            name="category"
            id="category"
            value={data.category}
            onChange={onChangeHandler}
            required
          >
            <option value="">Select Catagory</option>
            {productCategory.map((item, index) => {
              return (
                <option
                  className="text-black"
                  key={item.value + index}
                  value={item.value}
                >
                  {item.label}
                </option>
              );
            })}
          </select>

          <label htmlFor="productImage">Product image :</label>
          <label htmlFor="uploadImageInput">
            <div className="p-2 bg-slate-100 rounded border h-32 w-full flex justify-center items-center cursor-pointer ">
              <div className="text-slate-500 flex justify-center items-center h-full flex-col ">
                <span className="text-4xl ">
                  <FaCloudUploadAlt />
                </span>

                <p className="text-sm">Upload Product image</p>

                <input
                  type="file"
                  name="productImage"
                  id="uploadImageInput"
                  hidden
                  onChange={handleUploadProduct}
                />
              </div>
            </div>
          </label>

          <div>
            {data?.productImage[0] ? (
              <div className="flex gap-3 items-center ">
                {data.productImage.map((image, index) => {
                  return (
                    <div className="relative group">
                      <img
                        key={index + "image"}
                        src={image}
                        width={80}
                        height={80}
                        className="bg-slate-100 border rounded cursor-pointer "
                        onClick={() => {
                          setOpenFullScreenImage(true);
                          setFullScreenImage(image);
                        }}
                      />

                      <div className="absolute bottom-0 right-0 p-1 rounded-full text-white bg-orange-700 hover:bg-orange-600 hidden group-hover:block cursor-pointer " onClick={()=>handleDeleteProduct(index)}>
                        <MdDelete size={18} />
                      </div>

                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-red-600 text-xs ">
                * Please upload product Image
              </p>
            )}
          </div>

          <label htmlFor="price">Price :</label>
          <input
            className="p-1 bg-slate-100 border rounded"
            type="number"
            id="price"
            placeholder="Enter price "
            name="price"
            value={data.price}
            onChange={onChangeHandler}
            required
          />

          <label htmlFor="sellingPrice">Selling Price :</label>
          <input
            className="p-1 bg-slate-100 border rounded"
            type="number"
            id="sellingPrice"
            placeholder="Enter selling price "
            name="sellingPrice"
            value={data.sellingPrice}
            onChange={onChangeHandler}
            required
          />


            <label htmlFor="description">Description :</label>

            <textarea className="h-28 bg-slate-100 border p-2" rows={3}  cols={5}  placeholder="Enter description "  value={data.description}  onChange={onChangeHandler} name="description" id="description">

            </textarea>
          {/* <input
            className="p-1 bg-slate-100 border rounded"
            type="text"
            id="description"
           
            name="description"

           
          /> */}


          <button type="submit" className="py-1 px-3 bg-red-600 mt-4 text-white font-semibold hover:bg-red-700">
            Upload Product
          </button>
        </form>
      </div>

      {/* {... display full image pf product} */}

      {openFullScreenImage && (
        <DisplayImage
          onClosed={() => setOpenFullScreenImage(false)}
          imageUrl={fullScreenImage}
        />
      )}



    </div>
  );
};

export default UploadProduct;
