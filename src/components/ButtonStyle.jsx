  import React, { useRef, useState } from 'react';
  import { motion, AnimatePresence } from 'framer-motion';

  const ButtonStyle = ({
    children,
    text = '',
    onClick,
    textColor = '',
    bgColor = '',
    borderColor = '',
    hoverColor = '',
    fontSize = '',
    className='',
    hoverText=""
  }) => {
    const buttonRef = useRef(null);
    const [hoverDir, setHoverDir] = useState(null);
    const [showWhite, setShowWhite] = useState(false);


    const getDirection = (e) => {
      const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;
      const horizontal = x < width / 2 ? 'left' : 'right';
      const vertical = y < height / 2 ? 'top' : 'bottom';
      return Math.abs(x - width / 2) > Math.abs(y - height / 2) ? horizontal : vertical;
    };

    const handleMouseEnter = (e) => {
      const dir = getDirection(e);
      setHoverDir(dir);
      setShowWhite(true);
    };

    const handleMouseLeave = (e) => {
      setShowWhite(false);
 
    };


    const getEnterAnimation = (dir) => {
      switch (dir) {
        case 'left':
          return { initial: { x: '-100%' }, animate: { x: '0%' }, exit: { x: '-100%' } };
        case 'right':
          return { initial: { x: '100%' }, animate: { x: '0%' }, exit: { x: '100%' } };
        case 'top':
          return { initial: { y: '-100%' }, animate: { y: '0%' }, exit: { y: '-100%' } };
        case 'bottom':
          return { initial: { y: '100%' }, animate: { y: '0%' }, exit: { y: '100%' } };
        default:
          return {};
      }
    };

    return (
      <button
  // type="button"
        className={className}
        ref={buttonRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        style={{
          backgroundColor: bgColor,
          color: textColor,
          '--hoverTextColor': hoverText,
          border: `2px solid ${borderColor}`,
          fontSize,

        }}
      >
        <AnimatePresence>
          {showWhite && hoverDir && (
            <motion.div
              key={`white-${hoverDir}`}
              className={`hover-bg white ${hoverDir}`}
              style={{ backgroundColor: hoverColor }}
              {...getEnterAnimation(hoverDir)}
              transition={{ duration: 0.4, ease: [0.28, 0.71, 0, 0.98] }}
            />
          )}
        </AnimatePresence>

        <span>{text}</span>
        {children}
      </button>
    );
  };

  export default ButtonStyle;
