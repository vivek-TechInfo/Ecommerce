import React, { useContext, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaUserTie } from "react-icons/fa";

import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import realLogo from "../assets/realLogo.png";
import { useDispatch, useSelector } from "react-redux";
import summeryApi from "../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import Role from "../common/role";
import Context from "../context";

const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  // console.log(user);

  const dispatch = useDispatch();

  const navigate =  useNavigate()
  const searchInput =  useLocation()
  const URLSearch =  new URLSearchParams(searchInput?.search)
  const searchQuery = URLSearch.getAll("q")
  
  const [search,setSearch] =  useState(searchQuery)
  console.log("search",search)

 


  const [menuDisplay, setMenuDisplay] =  useState(false)
  // console.log(menuDisplay);

  const context = useContext(Context)
  // console.log(context)


  const handleLogout = async () => {
    const fetchData = await fetch(summeryApi.logout_user.url, {
      method: summeryApi.logout_user.method,
      credentials: "include",
    });

    const data = await fetchData.json();
    // console.log(data);

    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      navigate("/")
    }

    if (data.error) {
      toast.error(data.message);
    }
  };

  const handleSearch    = (e)=>{

    const {value} = e.target
    console.log(value)
    setSearch(value)

    if(value){
      navigate(`/search?q=${value}`)

    }else{
      navigate("/search")
    }

  }
  return (
    <header className="h-16 shadow-md bg-white fixed  w-full z-40 ">
      <div className=" h-full  container mx-auto  flex items-center justify-between px-8">
        <div className="mt-8 ">
          <Link to={"/"}>
            <img className=" " src={realLogo} alt="" width={100} height={40} />
          </Link>
        </div>

        <div className=" hidden lg:flex items-center w-full justify-between max-w-sm">
          <input
            type="text"
            placeholder="Serach product here..."
            className="w-full outline-none pl-4 border  focus-within:shadow-md h-8 rounded-l-full"
            onChange={handleSearch}
            value={search}
          />
          <div className="bg-red-500 min-w-[50px] flex items-center justify-center rounded-r-full h-8 text-white">
            <CiSearch size={"24px"} className="cursor-pointer" />
          </div>
        </div>

        <div className="flex items-center  gap-x-9">
          <div className="relative  flex justify-center" >
            {
              user?._id && (

                <div className="cursor-pointer"  onClick={()=> setMenuDisplay((prev)=>!prev)} >
                {user?.profilePic ? (
                  <img
                    src={user?.profilePic}
                    className="w-10 h-10 rounded-full"
                    alt={user?.name}
  
                  />
                ) : (
                  <FaUserTie size={"30px"} className="cursor-pointer" />
                )}
              </div>

              )
            }



            {
                menuDisplay && (

                    <div className=" cursor-pointer absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded  ">

                    <nav>
                      {
                        user?.role===Role.ADMIN && ( 
                        <Link to={"/admin-panel/all-products"} className="whitespace-nowrap hidden md:block hover:bg-slate-100 p-2" onClick={()=> setMenuDisplay((prev)=>!prev)}>Admin panel</Link>
                      )
                      }

                    </nav>
                 </div>

                )
            }

          </div>

          {
              user?._id && (

                <Link to={"/cart"} className="mt-6 cursor-pointer">
                <span>
                  <FaShoppingCart size={"24px"} />
                </span>
    
                <div className="bg-red-600 text-white flex w-5 h-5 p-1 bottom-9 left-5 justify-center items-center rounded-full relative">
                  <p className="text-sm absolute">{context?.cartProductCount}</p>
                </div>
              </Link>
                
              )
            }



          <div className="">
            {user?._id ? (
              <button
                onClick={handleLogout}
                className="px-3 py-1 rounded-full text-center bg-red-600 text-white hover:bg-red-700"
              >
                Logout
              </button>
            ) : (
              <Link to={"/login"}>
                <button className="px-3 py-1 rounded-full text-center bg-red-600 text-white hover:bg-red-700">
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
