import React, { useState, useEffect } from 'react';
import { useUI } from '../../../../context/UIContext'; // Получаем данные из контекста корзины
import ProductCard from '../../../../components/ProductCard';
import axios from 'axios'; // Импортируем axios
import ScrollYMotion from '../../../../assets/scss/animations/ScrollYMotion';
import CakeSvg from '../../../../assets/images/pictures/cake.svg';
import Loading from '../../../../assets/scss/animations/Loading.json'
import Lottie from 'lottie-react';

const BestSellers = () => {
  const { addToCart } = useUI();
  const [bestSellers, setBestSellers] = useState([]); // Храним данные о лучших продуктах
  const [loading, setLoading] = useState(true); // Для отображения состояния загрузки
  const [error, setError] = useState(null); // Состояние для ошибок

  const rows = 4;
  const words = Array(30).fill('BESTSELLERS');

  // Загрузка данных о лучших продуктах с сервера
  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_APP_ALL_PRODUCTS); // Загружаем все продукты
            console.log(response.data);
        const products = response.data;
        const bestSellers = products.filter(product => product.isBestseller); // Фильтруем товары по полю isBestseller
        setBestSellers(bestSellers); // Устанавливаем лучшие товары в состояние
        setLoading(false); // Останавливаем загрузку
      } catch (error) {
        setError('Error fetching product data'); // В случае ошибки выводим сообщение
        setLoading(false);
      }
    };

    fetchBestSellers(); // Запрашиваем данные
  }, []);

  // Если данные еще загружаются
  if (loading) {
    return <div>
       <Lottie animationData={Loading} loop={true} />
    </div>;
  }

  // Если произошла ошибка
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section  id="bestSellersSection" className="bestsellersMarquee">
      <div className="cakeSvgContainer">
        <ScrollYMotion
          as="img"
          src={CakeSvg}
          alt="Cake"
          from={0}
          to={1000}
          startY={100}
          endY={-150}
        />
      </div>

      {[...Array(rows)].map((_, rowIndex) => (
        <div
          className={`diagonalMarquee row-${rowIndex} ${rowIndex % 2 === 0 ? 'right' : 'left'}`}
          key={rowIndex}
        >
          <div className="diagonalMarquee__inner">
            {[...words, ...words].map((word, i) => (
              <span
                key={`${rowIndex}-${i}`}
                className={i % 4 === 0 ? 'outlined' : 'filled'}
              >
                {word}
              </span>
            ))}
          </div>
        </div>
      ))}

      <div className="cardBox">
        <div className="container">
          {bestSellers.map((product) => (
            <ProductCard
              key={product._id} // Используем уникальный ключ для каждого товара
              productId={product._id} // Передаем ID продукта
              customStyle={{ marginBottom: '20px' }}
              className="best-seller"
                onAddToCart={({ product, quantity }) => addToCart({ product, quantity })} // Передаем функцию добавления товара в корзину
              product={product} // Передаем весь объект продукта
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
