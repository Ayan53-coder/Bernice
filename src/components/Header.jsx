import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars } from "react-icons/fa";
import { SlBag } from "react-icons/sl";
import { IoSearchOutline } from "react-icons/io5";
import WhiteLogo from '../assets/images/icons/logo.png';
import BlackLogo from '../assets/images/icons/blacklogo.png';
import { FaInstagram } from "react-icons/fa";
import { useUI } from '../context/UIContext';
import Cart from './Cart';

const Header = () => {
  const { cart, isCartOpen, toggleCart } = useUI(); // Получаем данные корзины и функцию toggleCart
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [logo, setLogo] = useState(WhiteLogo); // начальный логотип
  const { isSearchOpen, toggleSearch } = useUI();
  const [isScrolled, setIsScrolled] = useState(false); // состояние для прокрутки
  const [isBlack, setIsBlack] = useState(false); // состояние для черных элементов
  const location = useLocation(); // Получаем текущий путь
  const isHomePage = location.pathname === '/'; // Проверяем, на главной ли странице

  // Логика для скролла и отображения логотипа
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 630 || isSearchOpen) { // если поиск открыт или скроллим
        setLogo(BlackLogo);
        setIsBlack(true); // меняем на черный, когда скроллим
        setIsScrolled(true); // добавляем состояние для прокрутки
      } else {
        setLogo(isHomePage ? WhiteLogo : BlackLogo);
        setIsBlack(false); // если скролл наверх, то возвращаем цвет по умолчанию
        setIsScrolled(false); // убираем состояние прокрутки
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isSearchOpen, isHomePage]);

  // Переключение поиска и логотипа при клике на иконку поиска
  const handleSearchClick = () => {
    toggleSearch(); // переключение состояния поиска
    if (!isSearchOpen) {
      setLogo(BlackLogo); // если открывается поиск, меняем логотип на чёрный
      setIsBlack(true); // меняем элементы на черные
    } else {
      setLogo(isHomePage ? WhiteLogo : BlackLogo); // если поиск закрывается, возвращаем логотип на белый
      setIsBlack(false); // если поиск закрывается, возвращаем элементы на белые
    }
  };

  return (
    <header className={`header ${isScrolled || isBlack ? "scrolled" : ""} ${isHomePage ? "home" : "black-elements"}`}>
      <div className="container">
        <div className="row">
          <div className="logo">
            <Link to='/' onClick={() => window.scrollTo(0, 0)}>
              <img src={logo} alt="logo" />
            </Link>
          </div>
          <nav className='navBar'>
            <ul className={`navList ${menuIsOpen ? "active_flex" : ""}`}>
              <div className='mobileLogo'>
                <img src={WhiteLogo} alt="logo" />
              </div>
              <li className='navItem s19W600'><Link to='/shopcookies' className={isBlack ? "black" : ""}>COOKIES</Link></li>
              <li className='navItem s19W600'><Link to='/shopcakes' className={isBlack ? "black" : ""}>CAKES</Link></li>
              <li className='navItem s19W600'><Link to='/about' className={isBlack ? "black" : ""}>ABOUT</Link></li>
              <li className='navItem s19W600'><Link to='/contact' className={isBlack ? "black" : ""}>CONTACT</Link></li>
              <li className="navItem">
                <Link to="https://www.instagram.com/bernicemontreal/">
                  <FaInstagram className={`instagramIcon ${isBlack ? "black" : ""}`} />
                </Link>
              </li>
            </ul>
            <div className='headerIcons'>
              <p className={`lang s19W600 ${isBlack ? "black" : ""}`}>AZ</p>
              <button className="bagBtn" onClick={toggleCart}>
                <SlBag className={`bagIcon ${isBlack ? "black" : ""}`} />
                <span className={`cartCount ${isBlack ? "black" : ""}`}>
                  {cart && cart.length > 0 ? `${cart.length}` : '0'}
                </span>
              </button>
              <IoSearchOutline className={`searchIcon ${isBlack ? "black" : ""}`} onClick={handleSearchClick} />
              <FaBars className={`menu ${isBlack ? "black" : ""}`} onClick={() => setMenuIsOpen(!menuIsOpen)} />
            </div>
          </nav>
        </div>
      </div>
      {isCartOpen && <Cart />} {/* Модальное окно корзины */}
    </header>
  );
};

export default Header;
