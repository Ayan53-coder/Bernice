import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Modules/Home/View/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import ShopCakes from './Modules/ShopCakes/View/ShopCakes';
import ShopCookies from './Modules/ShopCookies/View/ShopCookies';
import About from './Modules/About/View/About';
import Contact from './Modules/Contact/View/Contact';
import { useUI } from './context/UIContext';
import Search from './components/Search';
import SearchResultsPage from './Modules/SearchResults/View/SearchResults'; // Обновлено на компонент с результатами
import Details from './Modules/ProductDetails/View/Details';
import ScrollToTop from './components/ScrollToTop'; // Импортируем ScrollToTop

const App = () => {
  const { isSearchOpen, closeSearch } = useUI();

  return (
    <div>
      <Header />
      {isSearchOpen && <Search onClose={closeSearch} />} {/* Отображение панели поиска */}
      <ScrollToTop /> {/* СcrollToTop для прокрутки страницы в начало при переходе */}
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/search-results/:text' element={<SearchResultsPage />} /> {/* Страница результатов поиска */}
          <Route path='/details/:productId' element={<Details />} />
          <Route path='/shopcake' element={<ShopCakes />} />
          <Route path='/shopcookie' element={<ShopCookies />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
