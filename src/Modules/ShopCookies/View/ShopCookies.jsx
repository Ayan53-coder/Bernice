import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // добавлено
import ShopSection from '../../../components/ShopSection';
import ShopSpecial from '../../../components/ShopSpecial';
import SectionOffers from '../../../components/SectionOffers';
import { Coupon } from '../../../components/Coupon';

const ShopCookies = () => {
  const location = useLocation();

useEffect(() => {
  if (location.hash === '#special') {
    // Даём время DOM догрузиться
    setTimeout(() => {
      const el = document.getElementById('special');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 500); // 100–200 мс обычно хватает
  }
}, [location]);


  const text = "Cookies";
  const text2 = "Specialty Cookies";
  const text3 = "Room for more?";
  const description1 = "Our cookies are known for a chewy exterior and an ooey-gooey center. They are loaded with different types of chocolate and tons of butter. We believe these are the key ingredients for the best cookies.";
  const description2 = "We offer over a dozen different varieties that come in both 4 ounces and 6 ounces. No matter what type of chocaholic you identify as, you will certainly find one perfect for you.";
  const textColor = "#ffa7ee";

  return (
    <div>
      <ShopSection
        text={text}
        description1={description1}
        description2={description2}
        textColor={textColor}
        category="cookie"
      />
      <ShopSpecial
        id="special"
        text2={text2}
        textColor={textColor}
        parentCategory="cookie"
      />
      <SectionOffers text3={text3} />
      <Coupon
        from={5000}
        to={5200}
        startY={70}
        endY={-30}
      />
    </div>
  );
};

export default ShopCookies;
