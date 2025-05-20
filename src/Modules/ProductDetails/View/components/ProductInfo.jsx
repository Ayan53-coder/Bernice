import React from 'react';
import ButtonStyle from '../../../../components/ButtonStyle';
import { LuNut } from "react-icons/lu";
import Cow from '../../../../assets/images/pictures/cowblack.svg';
import Spatula from '../../../../assets/images/pictures/spatula.svg';
import Cookie from '../../../../assets/images/pictures/cookieblack.svg';

const ProductInfo = ({ product }) => {
  if (!product) return <div>No product data</div>;

  return (
    <section className='productInfo'>
      <div className="container">
        <div className="row">
          <div className='imageContainer'>
            <div className='mainImg'>
              <img src={`${import.meta.env.VITE_API_URL}/${product.productImage}`} alt={product.name} />
            </div>
            <div className='sideImgs'>
              <img src={`${import.meta.env.VITE_API_URL}/${product.productImage}`} alt={product.name} />
              <img src={`${import.meta.env.VITE_API_URL}/${product.hoverImage}`} alt="hover image" />
            </div>
          </div>

          <div className='infoContainer'>
            <div className="nameBox">
              <h3 className="productName">{product.name}</h3>
            </div>
            <div className='priceBox'>
              <p className="weight">{product.quantity}</p>
              <div className='divider'></div>
              <p className="price">${product.price}</p>
            </div>
            <ul className="ingredientList">
              {product.ingredients && product.ingredients.map((ingredient, index) => (
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
              <div className="minus">-</div>
              <div className="quantity">1</div>
              <div className="plus">+</div>
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
              onClick={() => {}}
            />

            <div className='charecteristics'>
              <div className='svgContainer'>
                <img src={Cow} alt="cow" />
                <p className='descriptionText'>Made with real butter</p>
              </div>
              <div className='svgContainer'>
                <img src={Spatula} alt="spatula" />
                <p className='descriptionText'>Gooey inside</p>
              </div>
              <div className='svgContainer'>
                <img src={Cookie} alt="cookie" />
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
