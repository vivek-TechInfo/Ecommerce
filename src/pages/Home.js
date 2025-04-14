import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCartProduct from '../components/HorizontalCartProduct'
import VerticalCartProduct from '../components/VerticalCartProduct'

const Home = () => {
  return (
    <div>
      <CategoryList/>
      <BannerProduct/>
      <HorizontalCartProduct category={"airpodes"} heading={"Top's Airpodes"} />
      <HorizontalCartProduct category={"watches"} heading={"Top's Watches"} />

      <VerticalCartProduct  category={"mobiles"} heading={"Top's Mobiles"}  />
      <VerticalCartProduct  category={"mouse"} heading={"Top's Mouse"}  />
      <VerticalCartProduct category={"televisions"} heading={"Top's Televisions"} />
      <VerticalCartProduct category={"camera"} heading={"Top's Camera"} />
      <VerticalCartProduct  category={"earphones"} heading={"Top's earphones"} />
      <VerticalCartProduct category={"speakers"} heading={"Top's Speakers"} />
      <VerticalCartProduct category={"refrigenator"} heading={"Top's Refrigenator"} />
      <VerticalCartProduct category={"trimmers"} heading={"Top's Trimmers"} />

    </div>
  )
}

export default Home