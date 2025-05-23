import React, { useState, useEffect, useRef } from "react";
import ContactInfo from "../../../components/ContactInfo";
import PaymentInfo from "../../../components/PaymentInfo";
import CartSummary from "../../../components/CartSummary";
import RememberMe from "../../../components/RememberMe";
import Lottie from "lottie-react";
import TealBubbles from "../../../assets/scss/animations/TealBubles.json";
import { useUI } from "../../../context/UIContext";
import { toast } from "react-hot-toast"; 

const CheckoutPage = () => {
  const [saveInfo, setSaveInfo] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const { cart, clearCart } = useUI();
  const paymentInfoRef = useRef();  // <-- Добавлен useRef

  // Загрузка состояния из localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("checkoutData"));
    if (saved?.saveInfo) setSaveInfo(true);
  }, []);

  // Обновление localStorage при изменении saveInfo
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("checkoutData")) || {};
    if (saveInfo) {
      localStorage.setItem(
        "checkoutData",
        JSON.stringify({ ...saved, saveInfo: true })
      );
    } else {
      localStorage.removeItem("checkoutData");
    }
  }, [saveInfo]);

  // Обработка кнопки оплаты
  const handlePayNow = () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty.", {
        position: "bottom-left",
      });
      return;
    }
    if (paymentInfoRef.current) {
      const isValid = paymentInfoRef.current.validate();
      if (!isValid) {
        toast.error("Please fill in all required billing information correctly.", {
          position: "bottom-left",
        });
        return;
      }
    }
    toast.success("Payment successful! 🎉", {
      position: "bottom-left",
      marginBottom: "100px",
    });
    clearCart();
    setResetTrigger((prev) => !prev);
    localStorage.removeItem("checkoutData");
    setSaveInfo(false);
    setDiscountApplied(false);
    setDiscountCode("");
  };

  return (
    <div className="checkoutContainer">
      <div className="container">
        <div className="row">
          <Lottie
            animationData={TealBubbles}
            loop
            autoplay
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              transform: "rotate(180deg)",
              zIndex: -1,
              opacity: 0.6,
            }}
          />

          <div className="checkoutLeft">
            <h2 className="pageTitle">PAYMENT & CHECKOUT</h2>

            <ContactInfo saveInfo={saveInfo} reset={resetTrigger} />
            <PaymentInfo ref={paymentInfoRef} saveInfo={saveInfo} reset={resetTrigger} />
            <RememberMe checked={saveInfo} onChange={setSaveInfo} />

            <button className="payNowBtn" onClick={handlePayNow}>
              PAY NOW
            </button>
          </div>

          <div className="checkoutRight">
            <CartSummary discountApplied={discountApplied} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
