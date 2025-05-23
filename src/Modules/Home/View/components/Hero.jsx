import React, { useRef } from 'react';
import heroImg from '../../../../assets/images/pictures/counter.png';
import { motion, useScroll, useTransform } from 'framer-motion';
import Lottie from 'lottie-react';
import cookieAnim from '../../../../assets/scss/animations/pinkAnim.json';
import SloganAnimation from '../../../../assets/scss/animations/SloganAnim';
import { Link as ScrollLink } from 'react-scroll'; // Сохраняем компонент Link из react-scroll

const Hero = () => {
  const targetRef = useRef(null);
  const { scrollY } = useScroll();
  const yShift = useTransform(scrollY, [0, 500], [0, -150]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.3]);
  const lottieRef = useRef(null);

  const handleMouseEnter = () => {
    if (lottieRef.current) {
      lottieRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    if (lottieRef.current) {
      lottieRef.current.stop();
    }
  };

  const text = "A BAKING LOVE AFFAIR";

  return (
    <section className="heroSection" ref={targetRef}>
      <div className="container">
        <div className="row">
          <div className="heroImageBox">
            <motion.img
              src={heroImg}
              alt="Bernice Bakery"
              className="heroImage"
              style={{ scale }}
            />
            <div className="overlay"></div>
          </div>

          <motion.div className="heroContent" style={{ y: yShift }}>
            <h1 className="heroTitle">
              <SloganAnimation text={text} />
            </h1>

            {/* Используем Link из react-scroll для прокрутки */}
            <ScrollLink
              to="bestSellersSection" // Указываем id секции BestSellers
              smooth={true}
              duration={500}
            >
              <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="lottieContainer"
              >
                <Lottie
                  animationData={cookieAnim}
                  loop={false}
                  autoplay={false}
                  lottieRef={lottieRef}
                />
                <p className="indulgeText">INDULGE</p>
              </div>
            </ScrollLink>
          </motion.div>
        </div>
      </div>
      {/* <div style={{ height: '3000px' }}></div> */}
    </section>
  );
};

export default Hero;
