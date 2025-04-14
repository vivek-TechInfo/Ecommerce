import React,{useEffect, useState} from 'react'
import { useLocation } from 'react-router-dom'
import summeryApi from '../common';
import VerticalCard from '../components/VerticalCard';

const SerachProduct = () => {
    const [data , setdata]  =  useState([])
    const [loading , setLoading] = useState(true)

    const query   =  useLocation()
    console.log("query",query);

    const fetchProduct = async()=>{

        setLoading(true)


        const  response =  await fetch(summeryApi.SerachProduct.url+query.search,{
            method:summeryApi.SerachProduct.method
        })
        const responseData =  await response.json();

        setLoading(false)

        setdata(responseData.data)




        console.log("dataResponse",responseData)

}


useEffect(() => {

    fetchProduct()

}, [query])

    
  return (
    <div className='container mx-auto p-4'>
      {
        loading && (
          <p className='text-lg text-center'>loading....</p>
        )
      }
      <p className='text-lg font-semibold'>Search Result :{data.length}</p>

      {
        data.length === 0 && !loading &&  (

          <p className='bg-white text-lg text-center p-4'>No Data Found</p>


        )
      }

      {
        data.length !== 0 && !loading && (
              <VerticalCard loading={loading} data={data}/>
        )
      }

      

    </div>
  )
}

export default SerachProduct