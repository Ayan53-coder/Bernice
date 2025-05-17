import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ScrollYMotion = ({
  from = 0,
  to = 1000,
  startY = 0,
  endY = -100,
  as: Tag = 'div',
  style = {},
  children,
  ...restProps
}) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [from, to], [startY, endY]);
  const MotionTag = motion.create(Tag); // ✅ новый метод

  return (
    <MotionTag
      style={{
        y, // если используешь старую версию motion
        ...style,
      }}
      {...restProps}
    >
      {children}
    </MotionTag>
  );
};

export default ScrollYMotion;
