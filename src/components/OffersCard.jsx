import React from 'react';
import { Link } from 'react-router-dom';

const OffersCard = ({ image, title, link, backgroundColor }) => {
  const isSpecial = title.toLowerCase().includes('special');

  return (
    <div className='offersCard' style={{ backgroundColor }}>
      <Link to={`${link}${isSpecial ? '#special' : ''}`}>
        <div className='imgcontainer'>
          <img src={image} alt={title} />
        </div>
        <h3 className='cardTitle'>{title}</h3>
      </Link>
    </div>
  );
};

export default OffersCard;
