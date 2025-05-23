import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import BillingAddress from "./BillingAddress";
import CryptoJS from "crypto-js";

const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;

const encrypt = (text) => {
  if (!SECRET_KEY) {
    console.warn("Missing VITE_SECRET_KEY for encryption");
    return text;
  }
  return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
};

const decrypt = (cipher) => {
  try {
    if (!SECRET_KEY) return "";
    const bytes = CryptoJS.AES.decrypt(cipher, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch {
    return "";
  }
};

const PaymentInfo = forwardRef(({ saveInfo, reset }, ref) => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiration, setExpiration] = useState("");
  const [cvc, setCvc] = useState("");
  const [errors, setErrors] = useState({});
  const billingRef = useRef();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("checkoutData"));
    if (saved?.saveInfo) {
      setCardNumber(decrypt(saved.cardNumber || ""));
      setExpiration(decrypt(saved.expiration || ""));
      setCvc(decrypt(saved.cvc || ""));
    }
  }, []);

  useEffect(() => {
    if (reset) {
      setCardNumber("");
      setExpiration("");
      setCvc("");
      setErrors({});
    }
  }, [reset]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("checkoutData")) || {};
    if (saved.saveInfo) {
      localStorage.setItem(
        "checkoutData",
        JSON.stringify({
          ...saved,
          saveInfo: true,
          cardNumber: encrypt(cardNumber),
          expiration: encrypt(expiration),
          cvc: encrypt(cvc),
        })
      );
    }
  }, [cardNumber, expiration, cvc]);

  useEffect(() => {
    if (!saveInfo) {
      const saved = JSON.parse(localStorage.getItem("checkoutData")) || {};
      delete saved.cardNumber;
      delete saved.expiration;
      delete saved.cvc;
      localStorage.setItem("checkoutData", JSON.stringify(saved));
    }
  }, [saveInfo]);

  const validateField = (fieldName, value = null) => {
    const newErrors = { ...errors };
    let hasError = false;

    switch (fieldName) {
      case "cardNumber":
        const number = (value ?? cardNumber).replace(/\s+/g, "");
        if (!/^\d{15,16}$/.test(number)) {
          newErrors.cardNumber = "Enter a valid 15–16 digit card number";
          hasError = true;
        } else {
          delete newErrors.cardNumber;
        }
        break;

      case "expiration":
        const exp = value ?? expiration;
        const expRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
        if (!expRegex.test(exp)) {
          newErrors.expiration = "Enter date as MM/YY";
          hasError = true;
        } else {
          const [monthStr, yearStr] = exp.split("/");
          const expMonth = parseInt(monthStr, 10);
          const expYear = parseInt("20" + yearStr, 10);

          const now = new Date();
          const currentMonth = now.getMonth() + 1;
          const currentYear = now.getFullYear();

          if (
            expYear < currentYear ||
            (expYear === currentYear && expMonth < currentMonth)
          ) {
            newErrors.expiration = "Card has expired";
            hasError = true;
          } else {
            delete newErrors.expiration;
          }
        }
        break;

      case "cvc":
        const code = value ?? cvc;
        if (!/^\d{3,4}$/.test(code)) {
          newErrors.cvc = "Enter a valid 3-4 digit code";
          hasError = true;
        } else {
          delete newErrors.cvc;
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
    return !hasError;
  };

  const validateAllFields = () => {
    const valid1 = validateField("cardNumber");
    const valid2 = validateField("expiration");
    const valid3 = validateField("cvc");
    return valid1 && valid2 && valid3;
  };

  useImperativeHandle(ref, () => ({
    validate: () => {
      if (billingRef.current && !billingRef.current.validate()) return false;
      return validateAllFields();
    },
  }));

  return (
    <div className="paymentInfo">
      <h3>Payment</h3>

      <input
        type="text"
        placeholder="Card number"
        value={cardNumber}
        onChange={(e) => setCardNumber(e.target.value)}
        onBlur={() => validateField("cardNumber")}
        className={errors.cardNumber ? "invalid" : ""}
        required
      />
      {errors.cardNumber && <span className="error">{errors.cardNumber}</span>}

      <div className="cardDetails">
        <div style={{ flex: 1 }}>
          <input
            type="text"
            placeholder="Expiration date (MM / YY)"
            value={expiration}
            onChange={(e) => setExpiration(e.target.value)}
            onBlur={() => validateField("expiration")}
            className={errors.expiration ? "invalid" : ""}
            required
          />
          {errors.expiration && (
            <span className="error">{errors.expiration}</span>
          )}
        </div>
        <div style={{ flex: 1 }}>
          <input
            type="text"
            placeholder="Security code"
            value={cvc}
            onChange={(e) => setCvc(e.target.value)}
            onBlur={() => validateField("cvc")}
            className={errors.cvc ? "invalid" : ""}
            required
          />
          {errors.cvc && <span className="error">{errors.cvc}</span>}
        </div>
      </div>

      <BillingAddress ref={billingRef} saveInfo={saveInfo} reset={reset} />
    </div>
  );
});

export default PaymentInfo;
