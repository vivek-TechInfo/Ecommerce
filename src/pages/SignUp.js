import React, { useState, } from 'react'
import LoginIcon from "../assets/signin.gif"
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import imageToBase64 from "../helper/imageToBase64"
import summeryApi from '../common';
import { toast } from 'react-toastify';

const SignUp = () => {
  const [showPassword , setShowPassword] =   useState(false)
  const [showConfirmPassword , setShowConfirmPassword] =   useState(false)
//   const [allData , setAllData] =  useState([])
//   console.log(allData)
  const [data, setData] = useState({
      name:"",
      email:"",
      password:"",
      cppassword : "",
      profilePic:""
  })

//   console.log(data.profilePic)


  const navigate =  useNavigate()

//   console.log(data);

  const handleOnChange =  (e)=>{
      let name =  e.target.name
      let value =  e.target.value

      setData((prev)=>({...prev,[name]:value}))

  }


  const submit = async (e)=>{
      e.preventDefault()
    //   setAllData((prev)=>([...prev,{data:data}]))


    if(data.password === data.cppassword){

        const dataResponse = await fetch(summeryApi.SignUp.url,{
            method:summeryApi.SignUp.method,
            headers:{
                'content-type':"application/json"
            },
            body:JSON.stringify(data)
        })


 
    
    
        const dataRes = await dataResponse.json()
        console.log(dataRes);

        if(dataRes.success){

            toast.success(dataRes.message)
            navigate("/login")
            // setData("")
        }else{
            toast.dark(dataRes.message)
        }

   


    }else{
        toast.error("Please check passoword")
    }






  }


  const handleUploadImage = async (e)=>{
    const file  =  e.target.files[0]
    const imagepic = await imageToBase64(file)
    console.log(imagepic);

    setData((prev)=>({...prev,profilePic:imagepic}))

  }
  return (
    <section id='signup'>
        <div className='mx-auto container p-4'>
            <div className=" bg-white mx-auto w-full max-w-sm">

                <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
                    <div>
                    <img className='rounded-full ' src={data.profilePic || LoginIcon} alt=""  width={80}  />

                    </div>
                    <form action="">
                        <label>
                        <div className='text-xs bg-opacity-60 cursor-pointer bg-slate-300 pb-4 text-center absolute bottom-0 w-full'>
                        upload image
                    </div>
                            <input type="file" className='hidden' onChange={handleUploadImage} />
                        </label>

                    </form>

                </div>

                <form className='p-2 pt-6 ' onSubmit={submit}>
                <div className='grid'>
                        <label>Name:</label>
                        <div className='bg-slate-100 p-2'>
                        <input type="text" value={data.name} required name='name' placeholder='enter your name' className='w-full h-full bg-transparent outline-none' onChange={handleOnChange}/>

                        </div>
                    </div>

                    <div className='grid'>
                        <label>Email:</label>
                        <div className='bg-slate-100 p-2'>
                        <input type="email" required value={data.email} name='email' placeholder='enter email' className='w-full h-full bg-transparent outline-none' onChange={handleOnChange}/>

                        </div>
                    </div>
                    <div>
                        <label>Password:</label>
                        <div className='bg-slate-100 p-2 flex items-center'>
                        <input type={showPassword?"text":"password"} required  placeholder='enter password' className='w-full h-full outline-none bg-transparent' name='password' onChange={handleOnChange} value={data.password} autoComplete='off'/>
                        <div className='cursor-pointer'   onClick={()=>setShowPassword(!showPassword)}>
                            <span>{showPassword ? <FaEye /> : <FaEyeSlash /> }</span>
                        
                        </div>

                        </div>

                    </div>

                    <div>
                        <label>Confirm Password:</label>
                        <div className='bg-slate-100 p-2 flex items-center'>
                        <input type={showConfirmPassword?"text":"password"} required placeholder='enter password' className='w-full h-full outline-none bg-transparent' name='cppassword' onChange={handleOnChange} value={data.cppassword} autoComplete='off'/>
                        <div className='cursor-pointer'   onClick={()=>setShowConfirmPassword(!showConfirmPassword)}>
                            <span>{showConfirmPassword ? <FaEye /> : <FaEyeSlash /> }</span>
                        
                        </div>

                        </div>

                    </div>

                    <button type='submit' className='bg-red-600 text-white px-6 w-full max-w-[150px]  py-2 rounded-full hover:scale-110 transition-all mx-auto block mt-6 hover:bg-red-700'>Sign in</button>
                </form>


                <p className='my-4'>Already have account ? <Link to={"/login"} className='hover:text-red-600 hover:underline'>Login</Link></p>

            </div>


        </div>

    </section>
  )
}

export default SignUp