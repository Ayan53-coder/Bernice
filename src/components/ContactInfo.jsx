import React, { useEffect, useState, forwardRef, useImperativeHandle } from "react";

const ContactInfo = forwardRef(({ saveInfo, reset }, ref) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});

  // Загрузка сохранённых данных
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("checkoutData"));
    if (saved?.saveInfo) {
      setFirstName(saved.firstName || "");
      setLastName(saved.lastName || "");
      setEmail(saved.email || "");
    }
  }, []);

  // Сохранение данных в localStorage при изменении полей, только если saveInfo активен
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("checkoutData")) || {};
    if (saveInfo) {
      localStorage.setItem(
        "checkoutData",
        JSON.stringify({
          ...saved,
          saveInfo: true,
          firstName,
          lastName,
          email,
        })
      );
    }
  }, [firstName, lastName, email, saveInfo]);

  // Очистка всех полей при изменении reset
  useEffect(() => {
    if (reset) {
      setFirstName("");
      setLastName("");
      setEmail("");
      setErrors({});
    }
  }, [reset]);

  const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const containsNumbers = (value) => /\d/.test(value);

  const validateField = (name, value) => {
    let error = "";

    if (name === "firstName") {
      if (!value.trim()) error = "First name is required";
      else if (containsNumbers(value)) error = "Name cannot contain numbers";
    }

    if (name === "lastName") {
      if (!value.trim()) error = "Last name is required";
      else if (containsNumbers(value)) error = "Name cannot contain numbers";
    }

    if (name === "email") {
      if (!value.trim()) error = "Email is required";
      else if (!validateEmail(value)) error = "Enter a valid email";
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
    return error === "";
  };

  // Экспонируем validate наружу для родителя
  useImperativeHandle(ref, () => ({
    validate: () => {
      const firstValid = validateField("firstName", firstName);
      const lastValid = validateField("lastName", lastName);
      const emailValid = validateField("email", email);
      return firstValid && lastValid && emailValid;
    },
  }));

  return (
    <div className="contactInfo">
      <h3>Contact</h3>

      <div className="nameFields">
        <div className="inputGroup">
          <input
            type="text"
            placeholder="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            onBlur={() => validateField("firstName", firstName)}
            className={errors.firstName ? "invalid" : ""}
            required
          />
          {errors.firstName && <span className="error">{errors.firstName}</span>}
        </div>

        <div className="inputGroup">
          <input
            type="text"
            placeholder="Last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            onBlur={() => validateField("lastName", lastName)}
            className={errors.lastName ? "invalid" : ""}
            required
          />
          {errors.lastName && <span className="error">{errors.lastName}</span>}
        </div>
      </div>

      <div className="inputGroup">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => validateField("email", email)}
          className={errors.email ? "invalid" : ""}
          required
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>
    </div>
  );
});

export default ContactInfo;
