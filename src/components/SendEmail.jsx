import React, { useState, useEffect } from 'react';
import ButtonStyle from './ButtonStyle';

const SendEmail = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(!!sessionStorage.getItem('newsletter_id'));
  const [promoCode, setPromoCode] = useState('');
  const [error, setError] = useState('');

  // Загружаем промокод, если подписка уже была
  useEffect(() => {
    const storedCode = sessionStorage.getItem('promo_code');
    if (storedCode) {
      setPromoCode(storedCode);
    }
  }, []);

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const generatePromoCode = () => {
    const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

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

    const newsletterId = `nl_${Math.random().toString(36).substr(2, 9)}`;
    const newPromoCode = generatePromoCode();

    sessionStorage.setItem('newsletter_id', newsletterId);
    sessionStorage.setItem('promo_code', newPromoCode);

    setPromoCode(newPromoCode);
    setSubscribed(true);
  };

  if (subscribed) {
    return (
      <div className="subscribedMessage">
        <p className='subscribed'>You are now subscribed!</p>
        {promoCode && (
          <p className='promoCode'>
            🎁 Your promo code: <strong>{promoCode}</strong>
          </p>
        )}
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
