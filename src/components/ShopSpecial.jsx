import React, { useEffect, useState } from 'react';
import ScrollYMotionText from '../assets/scss/animations/ScrollYMotionText';
import ProductCard from './ProductCard';
import { useUI } from '../context/UIContext';
import axios from 'axios';

const ShopSpecial = ({ text2, textColor, parentCategory }) => {
  const { addToCart } = useUI();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchSpecialProducts = async () => {
      try {
        const res = await axios.get(import.meta.env.VITE_APP_ALL_PRODUCTS);
        const filtered = res.data.filter(
          (product) => 
            product.category === 'special' && 
            product.type === parentCategory // двойная фильтрация
        );
        setProducts(filtered);
      } catch (err) {
        console.error('Ошибка загрузки:', err);
      }
    };

    fetchSpecialProducts();
  }, [parentCategory]);

  return (
    <section className='shop'>
      <div className="container">
        <div className="row">
          <div className='shopInfo'>
            <h2 className='shopTitle' style={{ color: textColor }}>
              <ScrollYMotionText
                text={text2}
                from={1500}
                to={2300}
                startY={100}
                endY={-80}
              />
            </h2>
          </div>
          <div className='collection'>
            {products.map((product) => (
              <div className='cardContainer' key={product._id}>
                <ProductCard
                  productId={product._id}
                  customStyle={{ border: 'none', borderRadius: '0px' }}
                  onAddToCart={({ product, quantity }) => addToCart({ product, quantity })} 
/>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopSpecial;
