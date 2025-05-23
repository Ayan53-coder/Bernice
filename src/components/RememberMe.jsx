 // RememberMe.jsx
import React from "react";

const RememberMe = ({ checked, onChange }) => {
  return (
    <div className="rememberMe">
      <div className="checkboxContainer">
        <input
          className="checkbox"
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <p>Save my information for faster checkout next time.</p>
      </div>
    </div>
  );
};

export default RememberMe; 