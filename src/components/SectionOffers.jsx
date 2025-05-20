 import React from 'react';
import { useLocation } from 'react-router-dom';
import ScrollYMotionText from '../assets/scss/animations/ScrollYMotionText';
import OffersCard from './OffersCard';

import classicCakes from '../assets/images/pictures/classiccakes.png';
import specialtyCakes from '../assets/images/pictures/lemonrasp.png';
import classicCookies from '../assets/images/pictures/morecookies.png';
import specialtyCookies from '../assets/images/pictures/bwcookie.png';

const SectionOffers = ({ text3 }) => {
  const location = useLocation();
  const pathname = location.pathname;

  let cards = [];

  if (pathname === '/shopcookie') {
    cards = [
      {
        image: classicCakes,
        title: 'Classic Cakes',
        link: '/shopcake',
        backgroundColor: '#112229',
      },
      {
        image: specialtyCakes,
        title: 'Specialty & Seasonal Cakes',
        link: '/shopcake',
        backgroundColor: '#ffa7ee',
      },
    ];
  } else if (pathname === '/shopcake') {
    cards = [
      {
        image: classicCookies,
        title: 'Cookies',
        link: '/shopcookie',
        backgroundColor: '#147c98',
      },
      {
        image: specialtyCookies,
        title: 'Specialty Cookies',
        link: '/shopcookie',
        backgroundColor: '#ffa7ee',
      },
    ];
  }

  return (
    <section className='sectionOffers'>
      <div className='container'>
        <div className='row'>
          <h2 className='offerTitle'>
            <ScrollYMotionText
              text={text3}
              from={3100}
              to={4400}
              startY={0}
              endY={-100}
            />
          </h2>
          <div className='offersBox'>
            {cards.map((card, index) => (
              <OffersCard
                key={index}
                image={card.image}
                title={card.title}
                link={card.link}
                backgroundColor={card.backgroundColor}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionOffers; 