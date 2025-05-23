import { createContext, useContext, useState, useEffect } from "react";

const UIContext = createContext();

export const UIProvider = ({ children }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // 🛒 Загружаем корзину из localStorage при инициализации
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [isSubscribed, setIsSubscribed] = useState(!!sessionStorage.getItem('newsletter_id'));
const [promoCode, setPromoCode] = useState(() => sessionStorage.getItem('promo_code') || '');


  // 💾 Сохраняем корзину в localStorage при каждом изменении
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const toggleSearch = () => setIsSearchOpen(prev => !prev);
  const closeSearch = () => setIsSearchOpen(false);

  const toggleCart = () => setIsCartOpen(prev => !prev);
  const closeCart = () => setIsCartOpen(false);

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  const addToCart = ({ product, quantity = 1 }) => {
    if (!product || !product._id) return;

    setCart(prevCart => {
      const existingItem = prevCart.find(p => p.product._id === product._id);
      if (existingItem) {
        const updatedQuantity = existingItem.quantity + quantity;
        if (updatedQuantity < 1) return prevCart;

        return prevCart.map(p =>
          p.product._id === product._id
            ? { ...p, quantity: updatedQuantity }
            : p
        );
      }

      return [...prevCart, { product, quantity: quantity || 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(item => item.product._id !== id));
  };

  return (
    <UIContext.Provider value={{
      isSearchOpen, toggleSearch, closeSearch,
      isCartOpen, toggleCart, closeCart,
      cart, addToCart, removeFromCart, clearCart,
        isSubscribed, setIsSubscribed,
  promoCode, setPromoCode
    }}>
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => useContext(UIContext);
