import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../../../components/ProductCard'; // Импортируем компонент карточки товара
import Lottie from 'lottie-react';
import NotFound from '../../../assets/scss/animations/notfound.json'; // Анимация "Не найдено"
import { useParams } from 'react-router-dom';
import { useUI } from '../../../context/UIContext'; // если используешь контекст
import ScrollYMotionText from '../../../assets/scss/animations/ScrollYMotionText'

const SearchResultsPage = () => {
  const {text}=useParams()
  console.log(text);
  const [results, setResults] = useState([]); // Результаты поиска
  const [loading, setLoading] = useState(true); // Статус загрузки
  const [error, setError] = useState(null); // Ошибки при запросах
const { addToCart } = useUI();

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        // const query = new URLSearchParams(window.location.search).get('query'); // Получаем запрос из URL
        const response = await axios.get(`${import.meta.env.VITE_APP_ALL_PRODUCTS}`); // Запрос всех продуктов
        // Фильтрация продуктов по имени (для совпадений с запросом)
        const filteredProducts = response.data.filter(product =>
          product.name.toLowerCase().includes(text.toLowerCase())
        );
        setResults(filteredProducts); // Устанавливаем отфильтрованные результаты
        setLoading(false); // Завершаем загрузку
      } catch (err) {
        setError('Error');
        setLoading(false);
      }
    };

    fetchSearchResults(); // Запускаем запрос при монтировании компонента
  }, [text]); // Эффект запускается только один раз

  // Если идет загрузка
  if (loading) {
    return <p>Loading...</p>;
  }

  // Если произошла ошибка
  if (error) {
    return <p>{error}</p>;
  }

  // Если нет результатов
  if (results.length === 0) {
    return (
      <div>
        <Lottie animationData={NotFound} loop={true} /> {/* Показываем анимацию "Не найдено" */}
      </div>
    );
  }

  return (
    <section className='searchResults'>
      <div className="container">
        <div className="row">


   <div className='resultsTitle'>
  <ScrollYMotionText
    text="Search results"
    from={0}
    to={800}
    startY={20}
    endY={-100}
  />
</div>

      <div className="productList">
        {results.map((product) => (
 <ProductCard
  key={product._id}
  productId={product._id}
  customStyle={{ border: 'none', borderRadius: '0px' }}
  onAddToCart={({ product, quantity }) => addToCart({ product, quantity })}
/>

        ))}
      </div>
              </div>
      </div>
    </section>
  );
};

export default SearchResultsPage;
