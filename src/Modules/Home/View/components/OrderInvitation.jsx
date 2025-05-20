import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import FrostedCake from '../../../../assets/images/pictures/frostedcake2.png';

const OrderInvitation = () => {
  const [offset, setOffset] = useState(40);
  const sectionRef = useRef(null);
  const [showOrderBtn, setShowOrderBtn] = useState(false);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;

  const animationStart = 600;
const animationEnd = -900;

      const rawProgress = (animationStart - rect.top) / (animationStart - animationEnd);
      const progress = Math.min(Math.max(rawProgress, 0), 1);

      const newOffset = 40 - progress * 40;
      setOffset(newOffset);
      // Анимация кнопки ORDER (однократно)
      if (!hasAnimated.current && rect.top < windowHeight / 2) {
        setShowOrderBtn(true);
        hasAnimated.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // инициализация при загрузке
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className='orderInvitation' ref={sectionRef}>
      <div className='orderWindow'>
        <svg className='arcText' viewBox='0 0 221.66 283.6'>
          <defs>
            <path
              id='text-arc'
              d="M 0.5 283.6 
                 V 106 
                 C 0.5 48.7 48.7 5 106 5 
                 H 111.6 
                 C 171.1 5 219.4 48.8 219.4 108.4
                 V 270"
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
          transition={{ duration: 1, delay: 1, ease: 'easeOut' }}
        >
          <Link to='/shopcake'>ORDER</Link>
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
