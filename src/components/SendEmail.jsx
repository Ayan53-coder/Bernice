import React, { useState } from 'react';
import ButtonStyle from './ButtonStyle';

const SendEmail = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(
    !!sessionStorage.getItem('newsletter_id') // Уже подписан?
  );
  const [error, setError] = useState('');

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubscribe = () => {
    if (!email) {
      setError('Email is required.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Invalid email format.');
      return;
    }

    setError('');

    // Генерируем уникальный ID и сохраняем в sessionStorage
    const newsletterId = `nl_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('newsletter_id', newsletterId);

    // Здесь можно отправить данные на сервер

    setSubscribed(true);
  };

  if (subscribed) {
    return (
      <div className="subscribedMessage">
        <p className='subscribed'>You are now subscribed!</p>
      </div>
    );
  }

  return (
    <div className="formBox">
      <div className='formContent'>
      <input
        className="email"
        type="email"
        placeholder="EMAIL"
        value={email}
        required
        onChange={(e) => setEmail(e.target.value)}
      />
      <ButtonStyle
        text="JOIN"
        textColor="#f8f8f2"
        hoverText="#112229"
        borderColor="#112229"
        hoverColor="#f8f8f2"
        className="mainButtonStyle"
        onClick={handleSubscribe}
      />
      </div>
      {error && <p className="errorText">{error}</p>}
    </div>
  );
};

export default SendEmail;
