import React from 'react'
import { Link } from 'react-router-dom'
import OffersImage from '../assets/images/pictures/classiccakes.png'

const OffersCard = () => {
  return (
    <div className='offersCard'>
        <Link to="/shopcakes">
        <div className='imgcontainer'>
            <img src={OffersImage} alt=''/>
        </div>
        <h3 className='cardTitle'>Classic Cakes</h3>
        </Link>
    </div>
  )
}

export default OffersCard