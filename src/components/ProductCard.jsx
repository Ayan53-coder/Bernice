import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Импортируем axios для запросов к API
import ButtonStyle from './ButtonStyle';
import HoverAnimation from '../assets/scss/animations/HoverAnimation'; 
import Lottie from 'lottie-react';
import Loading from '../assets/scss/animations/Loading.json'
import NotFound from '../assets/scss/animations/notfound.json'

const ProductCard = ({ productId, customStyle = {}, customClassName = '', onAddToCart }) => {
  const [hovered, setHovered] = useState(false);  // Состояние для отслеживания наведения
  const [product, setProduct] = useState(null); // Состояние для хранения данных о продукте
  const [loading, setLoading] = useState(true); // Состояние для отслеживания загрузки
  const [error, setError] = useState(null); // Состояние для ошибок
const [quantity, setQuantity] = useState(1);

const handleIncrease = () => {
  setQuantity(prev => prev + 1);
};

const handleDecrease = () => {
  if (quantity > 1) {
    setQuantity(prev => prev - 1);
  }
};

  // useEffect для получения данных о продукте по ID
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        // Запрос данных продукта по ID
        const response = await axios.get(`${import.meta.env.VITE_APP_ALL_PRODUCTS}/${productId}`);
        setProduct(response.data); // Устанавливаем данные продукта
        setLoading(false); // Завершаем загрузку
      } catch (err) {
        setError('Error fetching product data'); // В случае ошибки выводим сообщение
        setLoading(false);
      }
    };

    fetchProductData(); // Запускаем запрос
  }, [productId]); // Делаем запрос при изменении productId

  // Если данные загружаются
  if (loading) {
    return <div>
      <Lottie animationData={Loading} loop={true} />
    </div>;
  }

  // Если произошла ошибка
  if (error) {
    return <div>{error}</div>;
  }

  // Если данных нет
  if (!product) {
    return <div>
       <Lottie animationData={NotFound} loop={true} />
    </div>;
  }

  return (
    <div className={`productCard ${customClassName}`} style={customStyle}>
      <Link to={`/details/${product._id}`}>
        <div
          className="productImg"
          onMouseEnter={() => setHovered(true)}  // Наводим курсор
          onMouseLeave={() => setHovered(false)} // Убираем курсор
        >
          {/* Отображение основного изображения товара */}
          <motion.img
            src={`${import.meta.env.VITE_API_URL}/${product.productImage}`} // Используем URL с бэкенда
            alt={product.name}
            className="base-img"
            animate={{ opacity: hovered ? 0 : 1, scale: hovered ? 0.98 : 1 }}
            transition={{ duration: 0.4 }}
          />
          {/* Анимация для отображения hover-изображения */}
          <AnimatePresence>
            {hovered && (
              <motion.img
                key="hover-image"
                src={`${import.meta.env.VITE_API_URL}/${product.hoverImage || product.productImage}`} // Для hover-изображения
                alt="product hover image"
                className="hover-img"
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.4 }}
              />
            )}
          </AnimatePresence>
          
          {/* Анимация ингредиентов */}
          <div className={`ingredients ${hovered ? 'show' : ''}`}>
            <ul className="ingredientList">
              {product.ingredients.map((ingredient, index) => {
                // Для каждого ингредиента вычисляем его позицию и угол наклона
                let positionStyle = {};
                let rotation = 0;

                switch (index) {
                  case 0:
                    positionStyle = {
                      top: "20%",   // Верхний левый угол
                      left: "5%",
                    };
                    rotation = -20;  // Наклон для первого ингредиента
                    break;
                  case 1:
                    positionStyle = {
                      top: "20%",   // Верхний правый угол
                      right: "5%",
                    };
                    rotation = 20;  // Наклон для второго ингредиента
                    break;
                  case 2:
                    positionStyle = {
                      bottom: "25%",  // Нижний левый угол
                      left: "5%",
                    };
                    rotation = 20;  // Наклон для третьего ингредиента
                    break;
                  case 3:
                    positionStyle = {
                      bottom: "25%",  // Нижний правый угол
                      right: "5%",
                    };
                    rotation = -20;  // Наклон для четвертого ингредиента
                    break;
                }

                return (
                  <HoverAnimation
                    key={index}
                    ingredient={ingredient}
                    index={index}
                    positionStyle={positionStyle}
                    rotation={rotation}
                  />
                );
              })}
            </ul>
          </div>
        </div>
      </Link>

      <div className="nameBox">
        <h3 className="productName">{product.name}</h3>
        <p className="weight">{product.quantity}</p>
      </div>

      <div className="productContent">
        <p className="price">${product.price}</p>
     <div className="quantityBox">
  <div className="minus" onClick={handleDecrease}>-</div>
  <div className="quantity">{quantity}</div>
  <div className="plus" onClick={handleIncrease}>+</div>
</div>

      </div>

      {/* Кнопка "Add to Cart" */}
      <ButtonStyle
        text="Add to Cart"
        textColor="#112229"
        bgColor="#ffa7ee"
        borderColor="#ffa7ee"
        hoverColor="#f8f8f2"
        fontSize="24px"
        className="mainButtonStyle"
         onClick={() => onAddToCart({ product, quantity })}
      />
    </div>
  );
};

export default ProductCard;
