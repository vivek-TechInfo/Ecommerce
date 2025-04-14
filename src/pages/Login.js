import React, { useState , useContext} from 'react'
import LoginIcon from "../assets/signin.gif"
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import summeryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';

const Login = () => {
    const [showPassword , setShowPassword] =   useState(false)
    // const [allData , setAllData] =  useState([])
    // console.log(allData)
    const [data, setData] = useState({
        email:"",
        password:""
    })

    const navigate =  useNavigate()
    const {fetchUserDetails , fetchUserAddToCart} = useContext(Context)

    // console.log(data);

    const handleOnChange =  (e)=>{
        let name =  e.target.name
        let value =  e.target.value

        setData((prev)=>({...prev,[name]:value}))

    }


    const submit = async (e)=>{
        e.preventDefault()


        const dataResponse = await fetch(summeryApi.signIn.url,{
            method:summeryApi.signIn.method,
            credentials:"include",
            headers:{
                'content-type':"application/json"
            },
            body:JSON.stringify(data)
        }) 


        const dataRes  =  await dataResponse.json()

        if(dataRes.success){
            toast.success(dataRes.message)
            navigate("/")
            fetchUserDetails()
            fetchUserAddToCart()

        }else{
            toast.error(dataRes.message)
        }



    }
  return (

    <section id='login'>
        <div className='mx-auto container p-4'>
            <div className="p-2 bg-white  py-5 mx-auto w-full max-w-sm rounded">
                <div className='flex items-center justify-center '>
                    <img className='rounded-full ' src={LoginIcon} alt=""  width={50} />
                </div>

                <form className='p-2 flex flex-col gap-4' onSubmit={submit}>
                    <div className='grid'>
                        <label>Email:</label>
                        <div className='bg-slate-100 p-2'>
                        <input type="email" value={data.email} name='email' placeholder='enter email' className='w-full h-full bg-transparent outline-none' onChange={handleOnChange}/>

                        </div>
                    </div>
                    <div>
                        <label>Password:</label>
                        <div className='bg-slate-100 p-2 flex items-center'>
                        <input type={showPassword?"text":"password"} placeholder='enter password' className='w-full h-full outline-none bg-transparent' name='password' onChange={handleOnChange} value={data.password} autoComplete='off'/>
                        <div className='cursor-pointer'   onClick={()=>setShowPassword(!showPassword)}>
                            <span>{showPassword ? <FaEye /> : <FaEyeSlash /> }</span>
                        
                        </div>

                        </div>
                        <Link className='block w-fit mx-auto hover:underline hover:text-blue-600 mt-2' to={"/forgot-password"}>Forgot Password?</Link>
                    </div>

                    <button type='submit' className='bg-red-600 text-white px-6 w-full max-w-[150px]  py-2 rounded-full hover:scale-110 transition-all mx-auto block mt-6 hover:bg-red-700'>Login</button>
                </form>


                <p className='my-4'>Don't have account ? <Link to={"/sign-up"} className='hover:text-red-600 hover:underline'>Sign Up</Link></p>

            </div>


        </div>

    </section>

  )
}

export default Login