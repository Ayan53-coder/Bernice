import React, { useEffect } from 'react';
import { useUI } from '../context/UIContext';
import { IoCloseOutline } from "react-icons/io5";
import ButtonStyle from './ButtonStyle';
import { useNavigate } from 'react-router-dom'; // 👈 импортируем useNavigate

const Cart = () => {
  const { cart, removeFromCart, closeCart, addToCart } = useUI();
  const navigate = useNavigate(); // 👈 создаём navigate

  const total = cart.reduce((acc, item) => {
    const price = item?.product?.price || 0;
    const quantity = item?.quantity || 0;
    return acc + price * quantity;
  }, 0);

  const handleOutsideClick = (e) => {
    if (e.target.classList.contains('cart-backdrop')) {
      closeCart();
    }
  };

  const handleCheckout = () => {
    closeCart();           // 👈 закрываем корзину
    navigate('/checkout'); // 👈 переходим на страницу оформления заказа
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <div className="cart-backdrop">
      <div className="cart-modal">
        <div className="container">
          <div className="row">
            <div className='cartHeader'>
              <h2 className='title'>CART</h2>
              <IoCloseOutline className="closeIcon" onClick={closeCart} />
            </div>
            <div className='cartDisplay'>
              {cart.length === 0 ? (
                <p className='emptyCart'>Your cart is empty.</p>
              ) : (
                <ul className='cartList'>
                  {cart.map((item) => (
                    <li className="cartProduct" key={item.product._id}>
                      <div className='cartimg'>
                        <img
                          src={`${import.meta.env.VITE_API_URL}/${item.product.productImage}`}
                          alt={item.product.name}
                          className="cartItemImage"
                        />
                      </div>
                      <div className='cartInfo'>
                        <h3 className='productName'>{item.product.name}</h3>
                        <span className='price'>${item.product.price}</span>
                        <div className='itemSettings'>
                          <div className="quantityBox">
                            <div
                              className="minus"
                              onClick={() => addToCart({ product: item.product, quantity: -1 })}
                            >
                              -
                            </div>
                            <div className="quantity">{item.quantity}</div>
                            <div
                              className="plus"
                              onClick={() => addToCart({ product: item.product, quantity: 1 })}
                            >
                              +
                            </div>
                          </div>
                          <button
                            className='removeItem'
                            onClick={() => removeFromCart(item.product._id)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              <ButtonStyle
                textColor="#112229"
                bgColor="#ffa7ee"
                borderColor="#ffa7ee"
                hoverColor="#ffffff"
                fontSize="24px"
                className="mainButtonStyle"
                onClick={handleCheckout} // 👈 обработчик кнопки Checkout
              >
                <span className='btnname'>CHECKOUT</span>
                <span className='separator'></span>
                <span className='totalPrice'>${total.toFixed(2)}</span>
              </ButtonStyle>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
