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
        from = {2000}
        to = {2600}
        startY = {120}
        endY = {-20}
        />
    </div>
  )
}

export default About