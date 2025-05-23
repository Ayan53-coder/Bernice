// FLUID
import Barista from '../assets/images/pictures/baristafluid.png';
import Brownie from '../assets/images/pictures/browniefluid.png';
import Cherrycake from '../assets/images/pictures/cherrycakefluid.png';
import Frother from '../assets/images/pictures/frotherfluid.png';
import Coffee from '../assets/images/pictures/coffeefluid.png';
import Slice from '../assets/images/pictures/slicefluid.png';
import Interior from '../assets/images/pictures/interiorfluid.png';
import Cutting from '../assets/images/pictures/cuttingfluid.png';
import Cookiefluid from '../assets/images/pictures/cookiefluid.svg';
import Cakefluid from '../assets/images/pictures/cakefluid.svg';
// TESTIMONIALS
import TimeOut from '../assets/images/icons/timeout.avif';
import MT from '../assets/images/icons/mt.avif';
import Journal from '../assets/images/icons/journal.avif';
import Tastet from '../assets/images/icons/tastet.avif';
import Eater from '../assets/images/icons/eater.avif';
// ABOUT CONTENT
import Family from '../assets/images/pictures/family.png';
import Counter from '../assets/images/pictures/counter.png'

export const fluidImages = [
  { src: Barista, alt: 'barista', type: 'large' },
   { src: Cookiefluid, alt: 'cookie', type: 'svg' },
  { src: Brownie, alt: 'brownie', type: 'small' },
  { src: Cherrycake, alt: 'cherrycake', type: 'small' },
   { src: Cookiefluid, alt: 'cookie', type: 'svg' },
    { src: Cakefluid, alt: 'cake', type: 'svg' },
  { src: Frother, alt: 'frother', type: 'large' },
  { src: Coffee, alt: 'coffee', type: 'small' },
  { src: Slice, alt: 'slice', type: 'large' },
   { src: Cakefluid, alt: 'cake', type: 'svg' },
  { src: Interior, alt: 'interior', type: 'small' },
  { src: Cutting, alt: 'cutting', type: 'small' },
];

export const pressIcons = [
  { 
    src: TimeOut, 
    alt: 'TimeOut',
    text: 'Home is where the heart is—or is that cookies? Because many times our home has been at Bernice’s, where the cookies are what all cookies should be.',
 },
  { 
    src: MT, 
    alt: 'MT',
    text: 'Why You Need To Go: This is one of those bakeries that is like stepping into a little oasis. Not only is the decor so beautiful and so serene, but the pastries themselves are incredible, too. Whether you are feeling an almond scone, a caramel cookie or more like a funfetti cake, Bernice has got you covered.',
 },
  { 
    src: Journal,
     alt: 'Journal',
     text: 'I still remember that bite. A moist crumb which caresses here and which does not take long to melt, releasing its aromas of spices, and which does not saturate the palate with sugar. A brown butter icing, a bitter caramel. Bernices Pumpkin, Carrot and Spice Layer Cake is sinful!',
    },
  { 
    src: Tastet,
     alt: 'Tastet',
     text: 'Bernice puts forth the kind of sweets that take you back to childhood. Nothing too complex, but everything is well done. The tiered cakes are nicely displayed on the counter, enjoy a single serving or an entire cakes.',
     },
  { 
    src: Eater, 
    alt: 'Eater',
    text: 'On the western edge of St-Henri lies bakery-café Bernice, specializing in layered cakes and some of the most decadent cookies around.',
},
];

export const aboutSections = [
  {
    title: 'A passion for baking',
    text: `
      Jami’s love for baking came from a combination of his father owning a bakery called Pegroids in the early 80’s, and the love his grandmother Bernice had for cooking, baking, and hospitality.

      One of Jami’s fondest memories as a child was going up to the second floor of his father’s bake shop (the pastry department) where he got to play with all the different piping bags. He claims to still remember the smell and taste of the confectioner sugar mixed with vanilla and butter.

      It was only later, in his teenage years, that he began to explore the art of baking. Jami believes baking was a tool and outlet to express his true self in an artistic way. Later in his early twenties, he decided to pursue a career in culinary arts and pastry arts in New York City. Having his culinary education, and his innate talent, has allowed him to work in various restaurants both in Manhattan and Montréal.
    `,
    image: Family, // можно заменить на путь: '/assets/images/family.jpg'
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
    image: Cutting,
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
    image: Counter,
    alt: 'interior',
    reverse: false,
  },
];

