// SwiperShop.js
import React, { useState } from 'react';
import ShopButtonStyle from '../../../../components/ShopButtonStyle';
import Swiper from '../../../../components/Swiper';
import { Link } from 'react-router-dom';

const SwiperShop = () => {
const [activeCategory, setActiveCategory] = useState('cookie'); 

  return (
    <section className='swiperShop'>
      <div className="container">
        <div className="row">
          <div className='categoryButtonBox'>
            <ShopButtonStyle
              text="COOKIES"
              isActive={activeCategory === 'cookie'}
              onClick={() => setActiveCategory('cookie')}
            />
            <ShopButtonStyle
              text="CAKES"
              isActive={activeCategory === 'cake'}
              onClick={() => setActiveCategory('cake')}
            />
          </div>

          <Swiper category={activeCategory} />
          <div style={{ textAlign: 'right' }}>
            <Link to={`/shop${activeCategory.toLowerCase()}`} className='viewall'>VIEW ALL</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SwiperShop;
