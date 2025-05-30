import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // <--- добавлено
import ShopSection from '../../../components/ShopSection';
import ShopSpecial from '../../../components/ShopSpecial';
import { Coupon } from '../../../components/Coupon';
import SectionOffers from '../../../components/SectionOffers';

const ShopCakes = () => {
  const location = useLocation(); // <--- получаем текущий маршрут

useEffect(() => {
  if (location.hash === '#special') {
    setTimeout(() => {
      const el = document.getElementById('special');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 500); // даём время DOM загрузиться
  }
}, [location]);


  const text = "Classic Cakes";
  const text2 = "Specialty and Seasonal Cakes";
  const text3 = "Room for more?";
  const description1 = "Our homemade-style cakes come in both a 6inch size (which serves 8 to 10 guests) and 9inch size (which serves 14-16 guests). Each one of our cakes is made using only the purest ingredients to bring out the most comforting of flavours. The bakery's signature style is a three tiered layer cake with different types of frostings and toppings.";
  const description2 = "Our cakes will bring you back to the basics, whether it's a more traditional flavor that will remind you of your childhood or one of our seasonal recipes which will treat you to something new.";
  const textColor = "#112229";

  return (
    <div>
      <ShopSection
        text={text}
        description1={description1}
        description2={description2}
        textColor={textColor}
        category="cake"
      />
      <ShopSpecial
        id="special"
        text2={text2}
        textColor={textColor}
        parentCategory="cake"
      />
      <SectionOffers text3={text3} />
      <Coupon
        from={3500}
        to={3800}
        startY={80}
        endY={-10}
      />
    </div>
  );
};

export default ShopCakes;
