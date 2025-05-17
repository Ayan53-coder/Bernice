import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion'; // Импортируем framer-motion
import { useInView } from 'react-intersection-observer';

const ScrollYMotionText = ({ text, from = 0, to = 1000, startY = 100, endY = -100 }) => {
  const { scrollY } = useScroll();  // Получаем прокрутку страницы
  const { ref, inView } = useInView({
    triggerOnce: true,  // Анимация будет запускаться только один раз, когда элемент появляется на экране
    threshold: 0.5,     // Порог видимости (элемент должен быть виден на 50%)
  });

  // Динамическая анимация с заданными диапазонами
  const y = useTransform(scrollY, [from, to], [startY, endY]);

  return (
    <div ref={ref} className="relative overflow-hidden h-[60px] flex items-center justify-center">
      <motion.div
        className="text-[36px] font-bold tracking-wide whitespace-nowrap relative z-10"
        style={{
          y,  // Применяем прокрутку по оси Y
        }}
        initial={{
          clipPath: 'polygon(0% 100%, 100% 120%, 100% 100%, 0% 100%)', // Начальный clipPath для скрытия текста
        }}
        animate={{
          clipPath: inView
            ? 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'  // Завершающий clipPath для полного появления
            : 'polygon(0% 100%, 100% 120%, 100% 100%, 0% 100%)', // Если не в области видимости, скрыт
        }}
        transition={{
          duration: 2,
          ease: [0.65, 0, 0.35, 1], // Плавная анимация
        }}
      >
        {text}
      </motion.div>
    </div>
  );
};

export default ScrollYMotionText;
