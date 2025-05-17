import { createContext, useContext, useState } from "react";

const UIContext = createContext();

export const UIProvider = ({ children }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false); // Состояние для отображения корзины
  const [cart, setCart] = useState([]); // Добавляем корзину с начальным значением пустого массива

  const toggleSearch = () => setIsSearchOpen(prev => !prev);
  const closeSearch = () => setIsSearchOpen(false);

  const toggleCart = () => setIsCartOpen(prev => !prev); // Функция для переключения корзины
  const closeCart = () => setIsCartOpen(false); // Функция для закрытия корзины

  // Функции для добавления/удаления товаров из корзины
const addToCart = ({ product, quantity = 1 }) => {
  if (!product || !product._id) return;

  setCart(prevCart => {
    const existingItem = prevCart.find(p => p.product._id === product._id);

    if (existingItem) {
      const updatedQuantity = existingItem.quantity + quantity;

      // ❗ Запрещаем уменьшение ниже 1
      if (updatedQuantity < 1) {
        return prevCart;
      }

      return prevCart.map(p =>
        p.product._id === product._id
          ? { ...p, quantity: updatedQuantity }
          : p
      );
    }

    // Если товара ещё нет в корзине — добавляем
    return [...prevCart, { product, quantity: quantity || 1 }];
  });
};



  // Функция для удаления товара из корзины
  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(item => item.product._id !== id));
  };

  return (
    <UIContext.Provider value={{
      isSearchOpen, toggleSearch, closeSearch,
      isCartOpen, toggleCart, closeCart,
      cart, addToCart, removeFromCart
    }}>
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => useContext(UIContext);
