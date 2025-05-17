import React from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import ScrollYMotionText from '../../../../assets/scss/animations/ScrollYMotionText';


import { fluidImages } from '../../../../db/data'; // импорт базы PNG

const AnimImg = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const text = 'The best things in life are sweet';

  // Вставляем SVG вручную и объединяем с базой
  const images = [

    ...fluidImages,
    ...fluidImages, // Можно дублировать для бесконечного скролла
     // Можно дублировать для бесконечного скролла
  ];

  return (
    <section className="animImg" ref={ref}>
      <div className="animSlogan">
        <ScrollYMotionText
          text={text}
          from={1000}
          to={2300}
          startY={250}
          endY={-50}
        />
      </div>

      <motion.div
        className="loopBox"
        animate={{ x: ['0%', '-100%'] }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: 20,
          delay: 2.5,
        }}
      >
        {images.map((img, index) => (
          <motion.img
            key={index}
            src={img.src}
            alt={img.alt}
            className={
              img.type === 'svg'
                ? 'svg-img'
                : img.type === 'large'
                ? 'img common large-img'
                : 'img common small-img'
            }
            initial={{ opacity: 0, y: 80 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 1.2,
              delay: 1.5 + index * 0.15,
            }}
          />
        ))}
      </motion.div>
    </section>
  );
};

export default AnimImg;
