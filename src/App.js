import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import summeryApi from "./common";
import Context from "./context";
import { useDispatch} from "react-redux";
import { setUserDetails } from "./store/userSlice";

function App() {
  const dispatch =  useDispatch()
  const [cartProductCount, setcartProductCount] =  useState(0)
  // console.log(cartProductCount);
  

  const fetchUserDetails = async () => {
    const dataResponse = await fetch(summeryApi.current_user.url, {
      method: summeryApi.current_user.method,
      credentials: "include",
    });

    const dataApi = await dataResponse.json();
    // console.log(dataApi, "   user data details");
    if(dataApi.success){

      dispatch(setUserDetails(dataApi.data))


    }
  };

  const fetchUserAddToCart = async()=>{

    const response =  await fetch(summeryApi.countAddToCartProduct.url,{
      method:summeryApi.countAddToCartProduct.method,
      credentials : "include"
    })


    const responseData = await response.json()

    // console.log("countAddToCartProduct" , responseData.data)

    if(responseData.success){
      setcartProductCount(responseData?.data?.count)
    }



  }
  useEffect(() => {
    // user Details
    fetchUserDetails();
    //user cart details
    fetchUserAddToCart();
  },[]);



  return (
    <>
      <Context.Provider
        value={{
          fetchUserDetails, //user details fetch
          cartProductCount , // current user add to cart product count,
          fetchUserAddToCart

        }}
      >
        <ToastContainer position="top-center" />
        <Header  />

        <main className="min-h-[calc(100vh-120px)] pt-16">
          <Outlet />
        </main>

        <Footer />
      </Context.Provider>
    </>
  );
}

export default App;
