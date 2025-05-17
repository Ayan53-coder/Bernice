import React  from 'react'
import ShopSection from '../../../components/ShopSection'
import ShopSpecial from '../../../components/ShopSpecial'
import SectionOffers from '../../../components/SectionOffers'
import { Coupon } from '../../../components/Coupon'

const ShopCookies = () => {
  const text = "Cookies"; // Текст для страницы тортов
  const text2="Specialty Cookies"
  const text3="Room for more?"
  const description1 = "Our cookies are known for a chewy exterior and an ooey-gooey center. They are loaded with different types of chocolate and tons of butter. We believe these are the key ingredients for the best cookies."; // Описание
  const description2 = "We offer over a dozen different varieties that come in both 4 ounces and 6 ounces. No matter what type of chocaholic you identify as, you will certainly find one perfect for you."; // Описание
  const textColor = "#ffa7ee";

  return (
    <div>
<ShopSection
text={text}  // Передаем текст как пропс
description1={description1} // Передаем описание как пропс
description2={description2}
textColor={textColor}
  category="cookie"
/>
<ShopSpecial 
text2={text2}
textColor={textColor}
  parentCategory="cookie"

/>
<SectionOffers text3={text3}/>
         <Coupon
              from = {5150}
              to = {5300}
              startY = {50}
              endY = {-30}
              />
    </div>
  )
}

export default ShopCookies