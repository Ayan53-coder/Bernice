import React, { useEffect, useRef, useState } from 'react';
import Cow from '../../../../assets/images/pictures/cow.svg';
import Vanilla from '../../../../assets/images/pictures/vanillabean.svg';
import Cookie from '../../../../assets/images/pictures/cookie.svg';
import { aboutSections as sections } from '../../../../db/data';
import { useInViewOnceObserver } from '../../../../assets/scss/animations/useInViewObserver';
import ScrollYMotion from '../../../../assets/scss/animations/ScrollYMotion';

const AboutScrollContent = () => {
  const [lineFill, setLineFill] = useState(0);
  const [lineActive, setLineActive] = useState(false);
  const scrollLineRef = useRef(null);
  const prevLineFill = useRef(0);
  const directionRef = useRef('down');

  const icons = [Vanilla, Cow, Cookie];
  const iconThresholds = [20, 50, 80];

  useEffect(() => {
    const onScroll = () => {
      if (!scrollLineRef.current) return;

      const rect = scrollLineRef.current.getBoundingClientRect();
      const height = window.innerHeight;
      const startOffset = height * 0.3;
      const fillZone = height * 0.5;

      let raw = (height - rect.top - startOffset) / fillZone;
      const clamped = Math.min(Math.max(raw, 0), 1);
      const slowed = Math.pow(clamped, 0.5);
      const maxFill = 100;
      const fillValue = slowed * maxFill;

      directionRef.current = fillValue > prevLineFill.current ? 'down' : 'up';
      prevLineFill.current = fillValue;

      setLineFill(fillValue);
      setLineActive(fillValue >= 10);
    };

    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="scrollContent">
      <div className="container">
        <div className="row">
          <div className={`scrollLine ${lineActive ? 'active' : ''}`} ref={scrollLineRef}>
            <div className="innerFill" style={{ height: `${lineFill}%` }} />
         {icons.map((icon, idx) => {
  const threshold = iconThresholds[idx];
  const prevThreshold = iconThresholds[idx - 1] || 0;
  const range = threshold - prevThreshold;
  const progress = Math.min(Math.max((lineFill - prevThreshold) / range, 0), 1);
  const scale = 0 + progress * 1; // from 0 to 1

  return (
    <div
      className={`roundContainer`}
      key={idx}
      style={{
        transform: `scale(${scale})`,
        backgroundColor: progress === 1 ? '#147c98' : '#ccc',
      }}
    >
      <img src={icon} alt={`icon-${idx}`} />
    </div>
  );
})}

          </div>

     {sections.map((section, index) => {
  const [ref, appeared] = useInViewOnceObserver({ threshold: 0.5 });

  return (
    <div
      ref={ref}
      key={index}
      className={`scrollContainer ${section.reverse ? 'reverse' : ''} ${appeared ? 'visible' : ''}`}
    >
      <div className={`imgBox ${appeared ? 'visible' : ''}`}>
        <ScrollYMotion
          from={500}
          to={2000}
          startY={100}
          endY={-100}
          style={{ display: 'inline-block' }}
        >
          <img src={section.image} alt={section.alt} />
        </ScrollYMotion>
      </div>

      <div className="aboutTextBox">
        <ScrollYMotion
          from={500}
          to={2000}
          startY={70}
          endY={-100}
          style={{ display: 'inline-block' }}
        >
          <h3 className="textHeader">{section.title}</h3>

        <p className={`textContent ${appeared ? 'visible' : ''}`}>
          {section.text.split('\n').map((line, i) => (
            <span key={i}>
              {line.trim()}
              <br />
            </span>
          ))}
        </p>
        </ScrollYMotion>

      </div>
    </div>
  );
})}


        </div>
      </div>
    </section>
  );
};

export default AboutScrollContent;
