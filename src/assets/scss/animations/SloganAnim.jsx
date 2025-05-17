import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const SloganAnimation = ({ text }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });

  return (
    <div ref={ref} className="relative overflow-hidden h-[60px] flex items-center justify-center">
      <motion.div
        className="text-[36px] font-bold tracking-wide whitespace-nowrap relative z-10"
        initial={{
          clipPath: 'polygon(0% 100%, 100% 120%, 100% 100%, 0% 100%)',
        }}
        animate={
          inView
            ? {
                clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
              }
            : {}
        }
        transition={{
          duration: 2,
          ease: [0.65, 0, 0.35, 1],
        }}
      >
        {text}
      </motion.div>
    </div>
  );
};

export default SloganAnimation;
