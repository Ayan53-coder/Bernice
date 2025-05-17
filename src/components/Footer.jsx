import React from 'react'
import { Link } from 'react-router-dom'
import SendEmail from './SendEmail'
import UberEats from '../assets/images/icons/ubereats.png'
import Doordash from '../assets/images/icons/doordash.png'

const Footer = () => {
  return (
    <footer className='footer'>
<div className="container">
  <div className="row">
    <div className='footerTop'>
<div className='contactInfo'>
  <h4 className='companyName'>Bernice Bakery</h4>
  <p className='address'>5135 Notre-Dame Ouest
  Montréal, QC H4C 1T4</p>
  <Link to="mailto:bonjour@bernicebakery.com">bonjour@bernicebakery.com</Link>
  <Link to="tel:+15149318444">(514) 931-8444</Link>
<div className='delivery'>
<Link to="https://www.ubereats.com/ca/store/bernice/wclTTKCwTU6-h0fGombVjw">
<img src={UberEats}alt='UberEats'/>
</Link>
<Link to="https://www.doordash.com/fr-CA/store/bernice-montr%C3%A9al-2609893/2579684/">
<img src={Doordash}alt='Doordash'/>
</Link>
</div>
<Link to='https://www.instagram.com/bernicemontreal/#'>Follow us on Instagram</Link>
</div>
{/* <div className='pages'> */}
  {/* <div className="footerMenu"> */}
    <ul className='pageList'>
      <li className='page'>
        <Link to="/shopcookies">COOKIES</Link>
      </li>
      <li className='page'>
      <Link to="/shopcakes">CAKES</Link>
      </li>
    </ul>
  {/* </div> */}
  {/* <div className="footerMenu"> */}
    <ul className='pageList'>
      <li className='page'>
      <Link to="/about">ABOUT</Link>
      </li>
      <li className='page'>
      <Link to="/contact">CONTACT</Link>
      </li>

    </ul>
  {/* </div> */}

{/* </div> */}
<div className='coupon'>
<h4 className='couponTitle'>Get 15% off your first order</h4>
<SendEmail/>
</div>

    </div>
    <div className='footerLogo'>
<h3 className='logo'>BERNICE</h3>
    </div>
    <div className='footerBottom'>
    <div className="copyright">
            <p>Copyright 2025 | Bernice Bakery</p>
          </div>

          <div className="linkBox">
            <Link to='#' className="link">
              Terms of use
            </Link>{" "} | {" "}
            <Link to='#' className="link">
              Privacy policy
            </Link>
          </div>

          <div className="madeBy">
            <p>Made by Ayan Khalilli</p>
          </div>
    </div>

  </div>
</div>
    </footer>
  )
}

export default Footer