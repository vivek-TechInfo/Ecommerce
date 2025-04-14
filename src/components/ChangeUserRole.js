import React, { useState } from 'react'
import Role from '../common/role'
import { IoClose } from "react-icons/io5";
import summeryApi from '../common';
import { toast } from 'react-toastify';

const ChangeUserRole = ({name,email,role,onClose,userId,callfunction}) => {
    const [userRole ,setUserRole] =  useState(role)
    // console.log(userRole);

    const handleOnChange =  (e)=>{
        setUserRole(e.target.value)

    }


    const updateUserRole =  async ()=>{
        
        const fetchData =  await fetch(summeryApi.updateUser.url,{
            method:summeryApi.updateUser.method,
            credentials:"include",

            headers:{
                'content-type':"application/json"
            },
            body: JSON.stringify({
                userId:userId,
                role:userRole,

            })



        })


        const responseData = await fetchData.json()
        // console.log("role",responseData)


        if(responseData.success){
            toast.success(responseData.message)
            onClose()
            callfunction()
        }




    }

  return (
    <div className='fixed top-0 right-0 bottom-0  w-full h-full z-10  flex justify-center items-center bg-slate-200 bg-opacity-60 '>
        <div className='bg-white p-4 shadow-md w-full  max-w-sm '>

            <button className='block ml-auto' onClick={onClose}>
            <IoClose />
            </button>


            <h1 className='pb-4 text-lg font-medium text-center  mb-4'>Change User Role</h1>


            <p className='font-semibold'>Name:  {name}</p>
            <p className='font-semibold'>Email: {email} </p>

            <div className='flex items-center justify-between my-6'>
                <p className='font-semibold'>Role:</p>
            <select className='border ' value={userRole} onChange={handleOnChange}>
                {
                    Object.values(Role).map((item)=>{
                        return(
                            <option value={item} key={item} >{item}</option>
                        )
                    })
                }

            </select>
            </div>

            <button className='border text-center w-fit mx-auto block py-1 px-2 rounded-lg bg-yellow-400 hover:bg-yellow-500 font-semibold' onClick={updateUserRole}>Change Role</button>




        </div>

    </div>
  )
}

export default ChangeUserRole