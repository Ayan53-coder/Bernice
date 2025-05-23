import React, { useEffect, useState } from "react";
import { useUI } from "../context/UIContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom"; 

const CartSummary = () => {
  const { cart } = useUI();
  const [discountCode, setDiscountCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const navigate = useNavigate(); 

  useEffect(() => {
    const storedCode = sessionStorage.getItem("promo_code");
    if (storedCode) {
      setDiscountCode(storedCode);
      if (storedCode.toUpperCase() === "WELCOME15" || storedCode.length === 6) {
        setDiscountApplied(true);
      }
    }
  }, []);

  const total = cart.reduce((acc, item) => {
    const price = item?.product?.price || 0;
    const quantity = item?.quantity || 0;
    return acc + price * quantity;
  }, 0);

  const discountedTotal = discountApplied ? total * 0.85 : total;

  const handleApplyDiscount = () => {
    if (
      discountCode.trim().toUpperCase() === "WELCOME15" ||
      discountCode.trim().length === 6 // для случайных 6-значных кодов
    ) {
      setDiscountApplied(true);
    } else {
      toast.error("Invalid discount code", {
      position: "top-right",
      style: {
    marginTop: "150px" }// ✅ Локальная позиция
    });
    }
  };

  return (
    <div className="cartSummary">
      <h3>Your Cart</h3>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div className="item" key={item.product._id}>
             <div
                className="cartImageWrapper"
                onClick={() => navigate(`/details/${item.product._id}`)}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={`${import.meta.env.VITE_API_URL}/${item.product.productImage}`}
                  alt={item.product.name}
                  className="cartItemImage"
                />
              </div>
              <div className="itemInfo">
                <p>{item.product.name}</p>
                <span>${item.product.price.toFixed(2)} × {item.quantity}</span>
              </div>
              <div className="itemTotal">
                ${(item.product.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}

          <div className="discountSection">
            <input
              type="text"
              placeholder="Enter discount code"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              disabled={discountApplied}
            />
            <button onClick={handleApplyDiscount} disabled={discountApplied}>
              {discountApplied ? "Applied" : "Apply"}
            </button>
          </div>

          <div className="total">
            <p>Total:</p>
            <strong>${discountedTotal.toFixed(2)}</strong>
          </div>
        </>
      )}
    </div>
  );
};

export default CartSummary;
