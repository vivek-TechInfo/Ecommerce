import React from "react";
import { IoClose } from "react-icons/io5";

const DisplayImage = ({ imageUrl, onClosed }) => {
  return (
    <div className=" fixed top-0 bottom-0 left-0 right-0  flex justify-center items-center bg-opacity-50 bg-white">


      <div className="bg-white shadow-lg rounded max-w-5xl  mx-auto p-4">

      <div className="cursor-pointer ml-auto w-fit hover:text-red-500 font-black ">
            <IoClose size={32} onClick={onClosed} />
          </div>

        <div className="flex justify-center flex-wrap p-4 max-w-[80vh] max-h-[80vh]  ">

          <img src={imageUrl} className="w-full h-full" />
        </div>


      </div>
    </div>
  );
};

export default DisplayImage;
