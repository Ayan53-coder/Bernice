import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import FrostedCake from '../../../../assets/images/pictures/frostedcake2.png';

const OrderInvitation = () => {
  const [offset, setOffset] = useState(25);
  const [showOrderBtn, setShowOrderBtn] = useState(false);
  const hasAnimated = useRef(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;

      setOffset((prev) => {
        let next = prev - delta * 0.02;
        if (next < 10) next = 10;
        if (next > 25) next = 25;
        return next;
      });

      if (!hasAnimated.current && delta > 0 && currentScrollY > 200) {
        setShowOrderBtn(true);
        hasAnimated.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className='orderInvitation'>
      <div className='orderWindow'>
        <svg className='arcText' viewBox='0 0 221.66 283.6'>
          <defs>
            <path
              id='text-arc'
              d="
              M -400 650 
              V 250 
              C -300 -10 -10 50 -30 50 
              H 20 
              C 40 50 80 100 140 150 
              V 650 
              H -400 
              Z"
              fill='none'
            />
          </defs>
          <text>
            <textPath
              href="#text-arc"
              startOffset={`${offset}%`}
              className="textOnArc"
            >
              Celebrate with cake
            </textPath>
          </text>
        </svg>

        <img src={FrostedCake} alt='cake' />

        <motion.div
          className='orderBtn'
          initial={{ scale: 0 }}
          animate={showOrderBtn ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 1, delay: 1.5, ease: 'easeOut' }}
        >
          <Link to='/shopcakes'>ORDER</Link>
          <div className='hover-bg' />
        </motion.div>
      </div>

      <div className='invitationTextBox'>
        <p className='textContent'>
          Ordering a cake at Bernice Bakery is a seamless and personalized experience. Customers can either visit the bakery in person, over the phone, or more conveniently, place an order online.
        </p>
        <p className='textContent'>
          The process begins with selecting from our seasonal variety of cake flavors and then choosing your selected day and time for pickup. Keep in mind that our cakes are baked to order, and we require at least 24-hour advance notice. Our cake will most certainly be the delicious ending to any of your celebrations!
        </p>
      </div>
    </section>
  );
};

export default OrderInvitation;
