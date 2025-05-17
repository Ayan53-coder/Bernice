import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ShopButtonStyle = ({
  text = 'BUTTON',
  onClick,
  isActive = false,
}) => {
  const isCookies = text === 'COOKIES';
  const buttonRef = useRef(null);
  const [hoverDir, setHoverDir] = useState(null);
  const [showHover, setShowHover] = useState(false);
 

  const getDirection = (e) => {
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    const horizontal = x < width / 2 ? 'left' : 'right';
    const vertical = y < height / 2 ? 'top' : 'bottom';
    return Math.abs(x - width / 2) > Math.abs(y - height / 2) ? horizontal : vertical;
  };

  const handleMouseEnter = (e) => {
    if (isActive) return;
    const dir = getDirection(e);
    setHoverDir(dir);
    setShowHover(true);
  };

  const handleMouseLeave = (e) => {
    if (isActive) return;
    const { left, top } = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    setShowHover(false);
    setExitCoords({ x, y });
    setShowCircle(true);
  };



  const getEnterAnimation = (dir) => {
    switch (dir) {
      case 'left': return { initial: { x: '-100%' }, animate: { x: '0%' }, exit: { x: '-100%' } };
      case 'right': return { initial: { x: '100%' }, animate: { x: '0%' }, exit: { x: '100%' } };
      case 'top': return { initial: { y: '-100%' }, animate: { y: '0%' }, exit: { y: '-100%' } };
      case 'bottom': return { initial: { y: '100%' }, animate: { y: '0%' }, exit: { y: '100%' } };
      default: return {};
    }
  };

  const baseStyle = isActive
    ? {
        backgroundColor: isCookies ? '#112229' : '#ffa7ee',
        color: '#f8f8f2',
        border: `2px solid ${isCookies ? '#112229' : '#ffa7ee'}`,
      }
    : {
        backgroundColor: '#f8f8f2',
        color: isCookies ? '#112229' : '#112229',
        border: `2px solid ${isCookies ? '#112229' : '#ffa7ee'}`,
      };

  const hoverBgColor = isCookies ? '#112229' : '#ffa7ee';
  const hoverTextColor = '#f8f8f2';

  return (
    <button
      className="animButton"
      ref={buttonRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={baseStyle}
    >
      <AnimatePresence>
        {showHover && hoverDir && (
          <motion.div
            key={`hover-${hoverDir}`}
            className={`hover-bg ${hoverDir}`}
            style={{ backgroundColor: hoverBgColor }}
            {...getEnterAnimation(hoverDir)}
            transition={{ duration: 0.4, ease: [0.28, 0.71, 0, 0.98] }}
          />
        )}
      </AnimatePresence>

      <span style={{ color: showHover ? hoverTextColor : baseStyle.color }}>{text}</span>
    </button>
  );
};

export default ShopButtonStyle;
