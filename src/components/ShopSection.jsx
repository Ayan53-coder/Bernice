import React, { useEffect, useState } from 'react';
import ScrollYMotionText from '../assets/scss/animations/ScrollYMotionText';
import ProductCard from './ProductCard';
import { useUI } from '../context/UIContext';
import axios from 'axios';

const ShopSection = ({
  text,
  description1,
  description2,
  textColor,
  category = 'classic', // значение по умолчанию: classic
}) => {
  const { addToCart } = useUI();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(import.meta.env.VITE_APP_ALL_PRODUCTS);
        const filteredProducts = res.data.filter(
          (product) => product.category === 'classic' && product.type === category
        );
        setProducts(filteredProducts);
      } catch (error) {
        console.error('Ошибка загрузки продуктов:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  return (
    <section className="shop">
      <div className="container">
        <div className="row">
          <div className="shopInfo">
            <h2 className="shopTitle" style={{ color: textColor }}>
              <ScrollYMotionText
                text={text}
                from={0}
                to={200}
                startY={0}
                endY={-30}
              />
            </h2>
            <div className="textBox">
              <p className="description">{description1}</p>
              <p className="description">{description2}</p>
            </div>
          </div>

          <div className="collection">
            {loading ? (
              <p>Loading products...</p>
            ) : products.length > 0 ? (
              products.map((product) => (
                <div className="cardContainer" key={product._id}>
                  <ProductCard
                    productId={product._id}
                    customStyle={{ border: 'none', borderRadius: '0px' }}
                    onAddToCart={({ product, quantity }) => addToCart({ product, quantity })} 
                  />
                </div>
              ))
            ) : (
              <p>No product with category "{category}".</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopSection;
