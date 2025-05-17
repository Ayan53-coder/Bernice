// MySwiper.js
import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Grid, Navigation } from 'swiper/modules';
import 'swiper/css/grid';
import axios from 'axios';
import ProductCard from './ProductCard';
import { useUI } from '../context/UIContext';
import Loading from '../assets/scss/animations/Loading.json'
import Lottie from 'lottie-react';

const MySwiper = ({ category }) => {  // Пропс category для выбора категории
  const { addToCart } = useUI();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_APP_ALL_PRODUCTS);
        const filteredProducts = response.data.filter(product => 
          product.type.toLowerCase() === category.toLowerCase() // Фильтруем продукты по выбранной категории
        );
        setProducts(filteredProducts);
              console.log(filteredProducts); 
        setLoading(false);
      } catch (err) {
        setError('Error fetching products');
        setLoading(false);
      }
    };
    fetchProducts();
  }, [category]); // Делаем запрос и фильтрацию при изменении категории

  if (loading) return <div>
     <Lottie animationData={Loading} loop={true} />
  </div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="swiperShop">
      <Swiper
        slidesPerView={3}
        grid={{ rows: 2 }}
        spaceBetween={80}
        navigation={true}  // Используем дефолтное поведение для навигации
        modules={[Grid, Navigation]}
        className="mySwiper"
      >
        {products.map((product) => (
          <SwiperSlide key={product._id}>
            <ProductCard
              customStyle={{ border: 'none', borderRadius: '0px' }}
              onAddToCart={({ product, quantity }) => addToCart({ product, quantity })} 
              productId={product._id}
              product={product}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MySwiper;
