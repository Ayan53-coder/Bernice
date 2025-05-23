// CheckoutForm.jsx
import React, { useState, useEffect } from "react";
import ContactInfo from "./ContactInfo";
import PaymentInfo from "./PaymentInfo";
import BillingAddress from "./BillingAddress";
import RememberMe from "./RememberMe";

const STORAGE_KEY = "checkoutData";

const CheckoutForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    cardNumber: "",
    expiration: "",
    cvc: "",
    address: "",
    city: "",
    postal: "",
    phone: "",
  });

  const [remember, setRemember] = useState(false);

  // Загружаем данные из localStorage при монтировании
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setFormData(parsed.data || {});
      setRemember(parsed.remember || false);
    }
  }, []);

  // Сохраняем в localStorage, если remember включен
  useEffect(() => {
    if (remember) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ data: formData, remember }));
    }
  }, [formData, remember]);

  // Функция обновления данных из дочерних компонентов
  const updateFormData = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="checkoutForm">
      <ContactInfo formData={formData} onChange={updateFormData} />
      <PaymentInfo formData={formData} onChange={updateFormData} />
      <BillingAddress formData={formData} onChange={updateFormData} />
      <RememberMe checked={remember} onChange={setRemember} />
    </div>
  );
};

export default CheckoutForm;
