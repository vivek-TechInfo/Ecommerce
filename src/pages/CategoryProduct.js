import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import summeryApi from "../common";
import productCategory from "../helper/ProductCategory";

import VerticalCard from "../components/VerticalCard";

const CategoryProduct = () => {
  const params = useParams();
  const navigate   =  useNavigate()

  const loacation =  useLocation()
  const urlSearch = new URLSearchParams(loacation.search)
  const urlCategoryListinArray = urlSearch.getAll("category")


  // console.log("urlCategoryListinArray",urlCategoryListinArray);
  
  // console.log("categoryName", params.categoryName);
  // params?.categoryName

  const urlCategoryListObject = {}

  urlCategoryListinArray.forEach(el=>{
    urlCategoryListObject[el]  = true
  })

  // console.log("urlCategoryListObject",urlCategoryListObject)

  const [data , setdata] =  useState([])
  const [loading , setLoading] =  useState(false)
  const [selectCategory , setSelectCategory] =  useState(urlCategoryListObject)
  // console.log(selectCategory);

  const [filtercategoryList,setFilterCategoryList] =  useState([])
  // console.log( typeof filtercategoryList,"erfihuaehf");
  
  


  const fetchData = async ()=>{
    const responseData =  await fetch(summeryApi.filterProduct.url,{
      method:summeryApi.filterProduct.method,
      headers:{
        "content-type":"application/json"
      },

      body:JSON.stringify({
        category:filtercategoryList
      })
    })
    const response =  await responseData.json()

    setdata(response.data || []);
    console.log("product Category Data", response.data);
    
  }

  const handleSearchCategory  = (e)=>{

    const {name , value , checked} =  e.target
    console.log("selectCategory",name , value,checked);

    setSelectCategory((prev)=>{
      return(
        {...prev,[value]:checked}
      )
    })
    


  }


  const [sortBy , setSortBy]  =  useState("")
  console.log("sortBy",sortBy);




  useEffect(() => {

    const arrayCategory =  Object.keys(selectCategory).map((categoryKeyName)=>{
      console.log(categoryKeyName);

      if(selectCategory[categoryKeyName]){
        return categoryKeyName

      }

      return null
      

    }).filter((el)=>el)

    setFilterCategoryList(arrayCategory)

    console.log("selected c ",arrayCategory)

    const urlFormat =  arrayCategory.map((el,index)=>{

      if((arrayCategory.length-1) === index){
        console.log((arrayCategory.length-1) === index)
        console.log(index)
        console.log(arrayCategory.length)
        return`category=${el}`
      }
      return `category=${el}&&`

    })

    console.log("urlFormat",urlFormat);
    

    navigate("/product-category?"+urlFormat.join(""))

    // http://localhost:3000/product-category?category=refrigenator



  }, [selectCategory])

  useEffect(() => {

    fetchData()

  }, [filtercategoryList])


  const handleOnChangeSortBy = (e)=>{

    const { value } =  e.target
    console.log(value)
    setSortBy(value)

    if(value === 'asc'){
      setdata(preve=> preve.sort((a,b)=> a.sellingPrice
      - b.sellingPrice
      ))



  }

  if(value === 'dsc'){
    setdata(preve=> preve.sort((a,b)=> b.sellingPrice
    - a.sellingPrice
    ))
}

}


useEffect(()=>{


},[sortBy])


   
  

  return (
    <div className="container mx-auto p-4">
      {/* Desktop Version */}
      <div className="hidden lg:grid grid-cols-[200px,1fr]">
        {/* ..left side... */}

        <div className="bg-white p-2 min-h-[calc(100vh-150px)] overflow-y-scroll">
          {/* sort by */}

          <div className="">
            <h3 className="text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300">
              Sort by
            </h3>

            <form className="text-sm flex flex-col gap-2 py-2 cursor-pointer">
              <div className="flex items-center gap-2">
                <input type="radio" name="sortBy" checked={sortBy === "asc"} value={"asc"} onChange={handleOnChangeSortBy} />
                <label>Price - Low to High</label>
              </div>

              <div className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="sortBy" checked={sortBy === "dsc"} value={"dsc"} onChange={handleOnChangeSortBy} />
                <label>Price - High to Low</label>
              </div>
            </form>
          </div>

          {/* filter by */}

          <div className="">
            <h3 className="text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300">
              Category 
            </h3>

            <form className="text-sm flex flex-col gap-2 py-2">
              {
                productCategory.map((categoryName , index)=>{
                  return(
                    <div className="flex items-center gap-3">
                      <input type="checkbox" name={"category"} checked={selectCategory[categoryName?.value]} value={categoryName?.value} id={categoryName?.value} className="cursor-pointer" onChange={handleSearchCategory} />
                      <label htmlFor={categoryName?.value}>{categoryName?.label}</label>
                    </div>
                  )
                })
              }

            </form>
          </div>
        </div>

        {/* right side */}

        <div className="px-4">
          <p className="font-medium text-slate-800 text-lg my-2">Serach Result :{data.length}</p>

        <div className="min-h-[calc(100vh-150px)] overflow-y-scroll max-h-[calc(100vh-120px)]">
          {

            data.length !== 0 &&  (
              <VerticalCard data={data} loading={loading} />
            )
            }
        </div>



        </div>
      </div>
    </div>
  );
};

export default CategoryProduct;
