import React, { useState, useEffect, useRef } from 'react';
import { useUI } from '../context/UIContext';
import { motion, AnimatePresence } from 'framer-motion';
import { IoCloseOutline } from "react-icons/io5";
import axios from 'axios';
import ButtonStyle from './ButtonStyle';
import { useNavigate } from 'react-router-dom';
import ProductCard from './ProductCard';  // Если нужно, используйте ProductCard для отображения результатов

const Search = () => {
  const { isSearchOpen, toggleSearch } = useUI();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
const searchRef = useRef(null); // ← Ссылка на всю searchBox


useEffect(() => {
  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      toggleSearch();
    }
  };

  if (isSearchOpen) {
    document.addEventListener('mousedown', handleClickOutside);
  }

  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, [isSearchOpen]);

  // Дебаунс запрос
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.length >= 2) {
        fetchResults();
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const fetchResults = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_APP_ALL_PRODUCTS}`);
          console.log(response.data); // Печатаем ответ от сервера
      const filtered = response.data.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    } catch (err) {
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleResultClick = (productId) => {
    // Переход на страницу с деталями
    navigate(`/details/${productId}`);
    toggleSearch(); // Закрываем панель поиска после перехода
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query) {
      navigate(`/search-results/${query}`);
      toggleSearch(); // Закрываем панель поиска после отправки запроса
    }
  };

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div 
          className="searchBox"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
            ref={searchRef}
          transition={{ duration: 0.4 }}
        >
          <div className="container">
            <div className="searchSide">
              <form onSubmit={handleSearchSubmit} className="searchform">
                <input 
                  type="text" 
                  placeholder="PRODUCTS, COLLECTION, PAGE..."
                  value={query}
                  onChange={e => setQuery(e.target.value)} 
                />
                <ButtonStyle 
                  className='mainButtonStyle' 
                  textColor="#f8f8f2"
                  hoverText="#112229"
                  borderColor="#112229"
                  hoverColor="#f8f8f2"
                  text="SEARCH" 
                />
              </form>

              {/* Автозаполнение */}
              {query && (
                <div className="autocomplete">
                  {loading ? (
                    <p>Loading...</p>
                  ) : (
                    results.map((item, index) => (
                      <div 
                        key={index} 
                        className="suggestion"
                        onClick={() => handleResultClick(item._id)} // При клике на элемент
                      >
                        {item.name}
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            <motion.button 
              className="close" 
              onClick={toggleSearch}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4 }}
            >
              <IoCloseOutline />
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Search;
