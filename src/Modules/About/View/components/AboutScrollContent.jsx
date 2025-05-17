import React from 'react';
import Cow from '../../../../assets/images/pictures/cow.svg';
import Vanilla from '../../../../assets/images/pictures/vanillabean.svg';
import Cookie from '../../../../assets/images/pictures/cookie.svg';

// Три секции с флагом reverse для смены порядка
const sections = [
  {
    title: 'A passion for baking',
    text: `
      Jami’s love for baking came from a combination of his father owning a bakery called Pegroids in the early 80’s, and the love his grandmother Bernice had for cooking, baking, and hospitality.

      One of Jami’s fondest memories as a child was going up to the second floor of his father’s bake shop (the pastry department) where he got to play with all the different piping bags. He claims to still remember the smell and taste of the confectioner sugar mixed with vanilla and butter.

      It was only later, in his teenage years, that he began to explore the art of baking. Jami believes baking was a tool and outlet to express his true self in an artistic way. Later in his early twenties, he decided to pursue a career in culinary arts and pastry arts in New York City. Having his culinary education, and his innate talent, has allowed him to work in various restaurants both in Manhattan and Montréal.
    `,
    image: '', // Путь к картинке
    alt: 'family picture',
    reverse: false,
  },
  {
    title: 'The birth of Bernice Bakery',
    text: `
      Honing his vast culinary experience, and channeling into a catering company for many years, allowed Jami to gather the strength to open up a location where more people could come and discover his delectable creations.

      The idea had been bouncing around for a long while and with the help of his architect partner, Carlos, a space was found in a cozy corner of Saint Henri. The idea behind the space was meant to evoke the feeling of walking into a familiar kitchen pantry where your mom or grandmother would be baking away for loved ones.

      The early 2020 opening was postponed due to construction delays, and then postponed yet again due to a little pandemic… nevertheless, the doors were opened in August of that year.
    `,
    image: '',
    alt: 'cake',
    reverse: true,
  },
  {
    title: 'The gift that keeps on giving',
    text: `
      Ever since the doors opened, countless cakes and cookies have been enjoyed and delighted over. As the days and years have passed, the counter offerings have changed, and evolved, depending on the availability of ingredients, the wants and desires of the customers and the constantly innovative recipes that Jami and the team put forth.

      Jami believes food should both comfort and nourish the soul. His goal is that through his baking, he is able to provide the same feelings to others. That part was taught to him by his late grandmother.

      It is in honour of her beautiful spirit, Bernice bakery bears her name. We hope that every person who walks through these doors leaves a bit sweeter and with a bit more love.
    `,
    image: '',
    alt: 'interior',
    reverse: false,
  },
];

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
                      <br /><br />
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
