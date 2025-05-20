import React from 'react';
import Cow from '../../../../assets/images/pictures/cow.svg';
import Vanilla from '../../../../assets/images/pictures/vanillabean.svg';
import Cookie from '../../../../assets/images/pictures/cookie.svg';
import { aboutSections as sections } from '../../../../db/data'


const AboutScrollContent = () => {
  return (
    <section className='scrollContent'>
      <div className='container'>
        <div className='row'>

          {/* Статичные SVG иконки */}
          <div className='scrollLine'>
            <div className='innerFill'></div>
            <div className='roundContainer'><img src={Vanilla} alt='vanilla' /></div>
            <div className='roundContainer'><img src={Cow} alt='cow' /></div>
            <div className='roundContainer'><img src={Cookie} alt='cookie' /></div>
          </div>

          {/* Контентные секции */}
          {sections.map((section, index) => (
            <div
              className={`scrollContainer ${section.reverse ? 'reverse' : ''}`}
              key={index}
            >
              <div className='aboutTextBox'>
                <h3 className='textHeader'>{section.title}</h3>
                <p className='textContent'>
                  {section.text.split('\n').map((line, i) => (
                    <span key={i}>
                      {line.trim()}
                      <br />
                    </span>
                  ))}
                </p>
              </div>

              <div className='imgBox'>
                <img src={section.image} alt={section.alt} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutScrollContent;
