import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductInfo from './components/ProductInfo';
import {Coupon} from '../../../components/Coupon';

const Details = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_SINGLE_PRODUCT}/${productId}`);
        console.log(`${import.meta.env.VITE_APP_SINGLE_PRODUCT}/${productId}`);

        setProduct(response.data); // Устанавливаем данные продукта
        setLoading(false); // Завершаем загрузку
      } catch (err) {
        setError('Error fetching product data'); // В случае ошибки выводим сообщение
        setLoading(false);
      }
    };

    fetchProductData();
  }, [productId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      {product && <ProductInfo product={product} />}
      <Coupon/>
    </div>
  );
};

export default Details;
