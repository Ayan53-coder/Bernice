import React from 'react'
import Hero from './components/Hero'
import SectionIntro from './components/SectionIntro'
import BestSellers from './components/BestSellers'
import AnimImg from './components/AnimImg'
import SwiperShop from './components/SwiperShop'
import Testimonials from './components/Testimonials'
import OrderInvitation from './components/OrderInvitation'
import { Coupon } from '../../../components/Coupon'

  

const Home = () => {

 
  return (
    <div>
      <Hero/>
      <SectionIntro/>
      <BestSellers/>
      <AnimImg/>
      <SwiperShop/>
      <Testimonials/>
      <OrderInvitation/>
      <Coupon
              from = {6100}
              to = {6800}
              startY = {150}
              endY = {-20}
              />
    </div>
  )
}

export default Home