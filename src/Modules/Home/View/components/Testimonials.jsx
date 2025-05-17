import React from 'react';
import { motion } from 'framer-motion';
import { pressIcons } from '../../../../db/data'; // <-- импортируешь массив

const Testimonials = () => {
  const reviewCards = pressIcons.map((item, i) => (
    <div className='reviewCard' key={i}>
      <h3 className='citations'>‘’</h3>
      <p className='reviewText'>{item.text}</p>
      <div className='logofluid'>
        <img src={item.src} alt={item.alt} />
      </div>
    </div>
  ));

  return (
    <section className='testimonialsSection'>
      <div className='testimonialsWrapper'>
        <motion.div
          className='testimonialsBox'
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'linear',
            duration: 30,
          }}
        >
          {reviewCards}
          {reviewCards}
          {reviewCards}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
