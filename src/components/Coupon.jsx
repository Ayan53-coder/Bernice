import React from 'react';
import ScrollYMotion from '../assets/scss/animations/ScrollYMotion';
import CakeSvg from '../assets/images/pictures/cakefluid.svg';
import CookieSvg from '../assets/images/pictures/cookiefluid.svg';
import SendEmail from './SendEmail';
import SloganAnimation from '../assets/scss/animations/SloganAnim';

export const Coupon = ({ from = 400, to = 1000, startY = 150, endY = -20 }) => {
  const text = "Get 15% off your first order";

  return (
    <section className='counponSection'>
      <div className="row">
        <ScrollYMotion
          as="img"
          src={CakeSvg}
          alt="cake"
          from={from}
          to={to}
          startY={startY}
          endY={endY}
          style={{
            position: 'absolute',
            left: '200px',
            top: '20px',
            width: '140px',
            height: '140px',
            zIndex: 1,
          }}
        />
        <div className='couponCard'>
          <h4 className='couponTitle'>
            <SloganAnimation text={text} />
          </h4>
          <p className='couponInfo'>
            Subscribe to our newsletter and get 15% off your first purchase!
          </p>
          <div className='couponContainer'>
            <SendEmail />
          </div>
        </div>

        <ScrollYMotion
          as="img"
          src={CookieSvg}
          alt="cookie"
          from={from}
          to={to}
          startY={startY}
          endY={endY}
          style={{
            position: 'absolute',
            right: '200px',
            top: '250px',
            width: '140px',
            height: '140px',
            zIndex: 1,
          }}
        />
      </div>
    </section>
  );
};
