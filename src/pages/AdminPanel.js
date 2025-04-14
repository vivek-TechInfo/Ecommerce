import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { FaUserTie } from "react-icons/fa";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import Role from '../common/role';



const AdminPanel = () => {

    const user = useSelector((state) => state?.user?.user);
    // console.log("User hu mai",user);

    const navigate =  useNavigate()

    useEffect(()=>{
      if(user?.role !== Role.ADMIN){
        navigate("/")
      }

    },[user])

  return (
    <div className='min-h-[calc(100vh-120px)] md:flex hidden' >
        <aside className=' bg-white min-h-full w-full max-w-60 customShadow '>

            <div className='h-32  flex justify-center items-center flex-col'>
            <div className=" cursor-auto flex justify-center relative" >
              {user?.profilePic ? (
                <img
                  src={user?.profilePic}
                  className="w-16 h-16 rounded-full"
                  alt={user?.name}
                />
              ) : (
                <FaUserTie size={"40px"} className="cursor-pointer" />
              )}
            </div>
            <p className='font-semibold capitalize text-lg'>{user?.name}</p>
            <p className='text-sm' >{user?.role}</p>

            </div>


            <div>
                <nav className='grid p-4'>
                    <Link to={"all-users"} className='px-2 py-1 hover:bg-slate-100'>All Users</Link>
                    <Link to={"all-products"} className='px-2 py-1 hover:bg-slate-100'>All Product</Link>
                </nav>
            </div>
           

        </aside>

        <main className='w-full h-full p-2'>

            <Outlet/>

        </main>
    </div>
  )
}

export default AdminPanel