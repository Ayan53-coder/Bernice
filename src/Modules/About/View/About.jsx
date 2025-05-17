import React from 'react'
import { Coupon } from '../../../components/Coupon'
import AboutIntro from './components/AboutIntro'
import AboutScrollContent from './components/AboutScrollContent'

const About = () => {
  return (
    <div>
      <AboutIntro/>
<AboutScrollContent/>
        <Coupon
        from = {400}
        to = {1000}
        startY = {150}
        endY = {-20}
        />
    </div>
  )
}

export default About