import React from 'react'
import ContactForm from './components/ContactForm'
import { Coupon } from '../../../components/Coupon'

const Contact = () => {
  return (
    <div>
        <ContactForm/>
        <Coupon
        from = {400}
        to = {1000}
        startY = {150}
        endY = {-20}
        />
    </div>
  )
}

export default Contact