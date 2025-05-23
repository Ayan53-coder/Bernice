import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Autocomplete } from "@react-google-maps/api";

const BillingAddress = forwardRef(({ saveInfo, reset }, ref) => {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postal, setPostal] = useState("");
  const [phone, setPhone] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [errors, setErrors] = useState({});
  const [autocomplete, setAutocomplete] = useState(null);

  // Загрузка данных при монтировании
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("checkoutData"));
    if (saved?.saveInfo) {
      setAddress(saved.address || "");
      setCity(saved.city || "");
      setPostal(saved.postal || "");
      setPhone(saved.phone || "");
      setPickupDate(saved.pickupDate || "");
    }
  }, []);

  // Сохраняем данные в localStorage при изменениях
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("checkoutData")) || {};
    if (saveInfo) {
      localStorage.setItem(
        "checkoutData",
        JSON.stringify({
          ...saved,
          address,
          city,
          postal,
          phone,
          pickupDate,
          saveInfo,
        })
      );
    }
  }, [address, city, postal, phone, pickupDate, saveInfo]);

  // Сбрасываем поля при изменении reset (аналогично другим компонентам)
  useEffect(() => {
    if (reset) {
      setAddress("");
      setCity("");
      setPostal("");
      setPhone("");
      setPickupDate("");
      setErrors({});
    }
  }, [reset]);

  const onLoad = (autoC) => setAutocomplete(autoC);

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      setAddress(place.formatted_address || "");
    }
  };

  const validateField = (name, value) => {
    let error = "";

    if (name === "address" && !value.trim()) {
      error = "Address is required";
    }

    if (name === "city") {
      if (!value.trim()) error = "City is required";
      else if (/\d/.test(value)) error = "City cannot contain numbers";
    }

    if (name === "postal" && !value.trim()) {
      error = "Postal code is required";
    }

    if (name === "phone" && /[A-Za-z]/.test(value)) {
      error = "Phone must not contain letters";
    }

    if (name === "pickupDate") {
      if (!value) {
        error = "Pickup date is required";
      } else {
        const selectedDate = new Date(value);
        const now = new Date();
        const tomorrow = new Date();
        tomorrow.setDate(now.getDate() + 1);
        if (selectedDate < tomorrow) {
          error = "We require at least 24-hour advance notice for preparation";
        }
      }
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
    return error === "";
  };

  useImperativeHandle(ref, () => ({
    validate: () => {
      const a = validateField("address", address);
      const c = validateField("city", city);
      const p = validateField("postal", postal);
      const d = validateField("pickupDate", pickupDate);
      return a && c && p && d;
    },
  }));

  return (
    <div className="billingAddress">
      <h4>Billing address</h4>

      <div className="inputGroup">
        <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            onBlur={() => validateField("address", address)}
            className={errors.address ? "invalid" : ""}
            required
          />
        </Autocomplete>
        {errors.address && <span className="error">{errors.address}</span>}
      </div>

      <input
        type="text"
        placeholder="Apartment, suite, etc. (optional)"
        autoComplete="address-line2"
      />

      <div className="cityFields">
        <div className="inputGroup">
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onBlur={() => validateField("city", city)}
            className={errors.city ? "invalid" : ""}
            required
          />
          {errors.city && <span className="error">{errors.city}</span>}
        </div>

        <div className="inputGroup">
          <input
            type="text"
            placeholder="Postal code"
            value={postal}
            onChange={(e) => setPostal(e.target.value)}
            onBlur={() => validateField("postal", postal)}
            className={errors.postal ? "invalid" : ""}
            required
          />
          {errors.postal && <span className="error">{errors.postal}</span>}
        </div>
      </div>

      <div className="inputGroup">
        <input
          type="text"
          placeholder="Phone (optional)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          onBlur={() => validateField("phone", phone)}
          className={errors.phone ? "invalid" : ""}
        />
        {errors.phone && <span className="error">{errors.phone}</span>}
      </div>

      <div className="inputGroup">
        <input
          type="date"
          placeholder="Pickup Date"
          value={pickupDate}
          onChange={(e) => setPickupDate(e.target.value)}
          onBlur={() => validateField("pickupDate", pickupDate)}
          className={errors.pickupDate ? "invalid" : ""}
          required
        />
        {errors.pickupDate && <span className="error">{errors.pickupDate}</span>}
      </div>
    </div>
  );
});

export default BillingAddress;
