import React,{useEffect, useState} from 'react'
import summeryApi from '../common'
import {toast} from "react-toastify"
import moment from "moment"
import { BsPencilFill } from "react-icons/bs";
import ChangeUserRole from '../components/ChangeUserRole';

const AllUsers = () => {

    const [alluser , setAllUser]  =  useState([])
    const [openUpdateRole,setOpenUpdateRole] =  useState(false)
    const [updateUserDetails, setUpdateUserDetails] =  useState({
      name:"",
      email:"",
      role:"",
      _id:""
    })
    console.log(alluser);

    const fetchAllUsers =  async (req,res)=>{

        const users =  await fetch(summeryApi.all_user.url,{
            method:summeryApi.all_user.method,
            credentials: "include",
        })

        const alluserData =  await users.json()
        
        if(alluserData.success){
          setAllUser(alluserData.data)
        }


        if(alluserData.error){

          toast.error(alluserData.message)
          
          
        }

    }

    useEffect(() => {

        fetchAllUsers()

    },[])
    
  return (
    <div className='bg-white pb-6 '>
      <table className='w-full userTable'>
        <thead>
          <tr  className='bg-blue-900 text-white'>
          <th>Sr.</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Created Date</th>
          <th>Action</th>
          </tr>

        </thead>
        <tbody className=''>
          {

            alluser.map((users,index)=>{
              return( 
                <tr className=' ' key={index}>
                  <td>{index +1 }</td>
                  <td>{users?.name}</td>
                  <td>{users?.email}</td>
                  <td>{users?.role}</td>
                  <td>{moment(users?.createdAt).format('LL')}</td>
                  <td className=''>

                    <button onClick={()=>{
                      setOpenUpdateRole((prev)=>!prev)               
                    
                      setUpdateUserDetails(users)
                    
                    }
                      }
                      
                      className=' bg-green-500 hover:bg-green-600 hover:text-white p-2 rounded-3xl' ><BsPencilFill /></button>
                    
                     </td>
                </tr>
              )
            })

          }
        </tbody>
      </table>

      {
        openUpdateRole && (

          <ChangeUserRole onClose={()=>setOpenUpdateRole((prev)=>!prev)} name={updateUserDetails.name} email={updateUserDetails.email} role={updateUserDetails.role} userId={updateUserDetails._id} callfunction={fetchAllUsers} />
        )
      }

    </div>
  )
}

export default AllUsers