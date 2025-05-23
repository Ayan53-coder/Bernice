import React, { useState, useEffect } from 'react';
import ButtonStyle from '../../../../components/ButtonStyle';
import { LuNut } from "react-icons/lu";
import Cow from '../../../../assets/images/pictures/cowblack.svg';
import Spatula from '../../../../assets/images/pictures/spatula.svg';
import Cookie from '../../../../assets/images/pictures/cookieblack.svg';
import { useUI } from '../../../../context/UIContext'; // если используешь контекст

const ProductInfo = ({ product }) => {
  const { addToCart } = useUI();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    if (product) {
      setSelectedImage(`${import.meta.env.VITE_API_URL}/${product.productImage}`);
      setQuantity(1); // можно сбрасывать количество, если нужно
    }
  }, [product]);

  if (!product) return <div>No product data</div>;

  const handleIncrease = () => setQuantity(prev => prev + 1);
  const handleDecrease = () => {
    if (quantity > 1) setQuantity(prev => prev - 1);
  };

  return (
    // Вот тут добавляем условный класс isCake
    <section className={`productInfo ${product.type === 'cake' ? 'isCake' : ''}`}>
      <div className="container">
        <div className="row">
          <div className='imageContainer'>
            <div className='mainImg'>
              <img src={selectedImage} alt="Selected product" loading="lazy" />
            </div>

            <div className='sideImgs'>
              {[product.productImage, product.hoverImage]
                .filter(Boolean)
                .map((img, index) => {
                  const fullImgPath = `${import.meta.env.VITE_API_URL}/${img}`;
                  const isActive = selectedImage === fullImgPath;

                  return (
                    <img
                      key={index}
                      src={fullImgPath}
                      alt={`Side ${index}`}
                      className={isActive ? 'active' : ''}
                      onClick={() => setSelectedImage(fullImgPath)}
                      loading="lazy"
                    />
                  );
                })}
            </div>
          </div>

          <div className='infoContainer'>
            <div className="nameBox">
              <h3 className="productName">{product.name}</h3>
            </div>

            <div className='priceBox'>
              <p className="weight">{product.quantity}</p>
              {product.type !== 'cake' && <div className='divider'></div>}
              <p className="price">${product.price}</p>
            </div>

            <ul className="ingredientList">
              {product.ingredients?.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>

            <p className='details'>{product.details}</p>

            <div className='allergywarn'>
              <LuNut size="24px" />
              <p className='warnText'>May contain nuts</p>
            </div>

            <div className='prodqty'>
              Quantity:
              <div className="quantityBox">
                <div className="minus" onClick={handleDecrease}>-</div>
                <div className="quantity">{quantity}</div>
                <div className="plus" onClick={handleIncrease}>+</div>
              </div>
            </div>

            <ButtonStyle
              text="Add to Cart"
              textColor="#112229"
              bgColor="#ffa7ee"
              borderColor="#ffa7ee"
              hoverColor="#f8f8f2"
              fontSize="24px"
              className="mainButtonStyle"
              onClick={() => addToCart({ product, quantity })}
            />

            <div className='charecteristics'>
              <div className='svgContainer'>
                <img src={Cow} alt="cow" loading="lazy" />
                <p className='descriptionText'>Made with real butter</p>
              </div>
              <div className='svgContainer'>
                <img src={Spatula} alt="spatula" loading="lazy" />
                <p className='descriptionText'>Gooey inside</p>
              </div>
              <div className='svgContainer'>
                <img src={Cookie} alt="cookie" loading="lazy" />
                <p className='descriptionText'>Soft baked</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


export default ProductInfo;   