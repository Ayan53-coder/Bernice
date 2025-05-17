import { motion } from 'framer-motion';

const HoverAnimation = ({ ingredient, index, positionStyle, rotation }) => {
  return (
    <motion.li
      key={index}
      className="ingItem"
      style={{
        position: "absolute",
        ...positionStyle,
      }}
      initial={{ opacity: 0, scale: 0.5 }} // Начальная анимация
      animate={{
        opacity: 1,
        scale: 1,
        rotate: rotation,  // Поворот
        transition: { 
          duration: 0.6, 
          ease: "easeOut",
          delay: index * 0.8 // Задержка для каждого ингредиента в зависимости от его индекса
        },
      }}
      exit={{ opacity: 0, scale: 0.5 }} // Завершающая анимация
    >
      {ingredient}
    </motion.li>
  );
};

export default HoverAnimation;
