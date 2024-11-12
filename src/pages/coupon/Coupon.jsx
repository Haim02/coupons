import React, { useState } from "react";
import Button from "../../components/button/Button";
import "./coupon.css";

const Coupon = () => {
  const [price, setPrice] = useState(100);
  const [coupon, setCoupon] = useState("");
  const [coupons, setCoupons] = useState([]);
  const [totalDiscount, setTotalDiscount] = useState(0);

  const applyCoupon = () => {
    let discount = 0;

    if (coupon === "SALE20") {
      discount = 20;
    } else if (coupon === "SALE10") {
      discount = 1;
    } else {
      alert("קוד קופון לא תקף");
      return;
    }

    if (price - (totalDiscount + discount) < 0) {
      alert("ההנחה חורגת מהסכום לתשלום");
      return;
    }

    if (coupon.percentOrAmount === "percent") {
      discount = (price * coupon.discount) / 100;
      const newCoupon = { code: coupon, discount };
      setCoupons((pre) => [...pre, newCoupon]);
      setTotalDiscount(totalDiscount + discount);
      setCoupon("");
    } else {
      const newCoupon = { code: coupon, discount, percentOrAmount: "percent" };
      setCoupons([...coupons, newCoupon]);
      setTotalDiscount(totalDiscount + discount);
      setCoupon("");
    }

    if (price < 0) {
      setPrice(0);
    }

    if (totalDiscount < 0) {
      totalDiscount(0);
    }
  };

  const removeCoupon = (couponToRemove) => {
    const updatedCoupons = coupons.filter(
      (coupon) => coupon.code !== couponToRemove
    );
    const removedDiscount =
      coupons.find((coupon) => coupon.code === couponToRemove)?.discount || 0;

    setCoupons(updatedCoupons);
    setTotalDiscount(totalDiscount - removedDiscount);
  };

  return (
    <div className="couponContainer">
      <div className="couponCard">
        <h2>סכום לתשלום: ₪{price - totalDiscount}</h2>
        <div className="couponInput">
          <input
            type="text"
            placeholder="הכנס קוד קופון"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
          />
          <Button type="button" text="הוסף קופון" onClick={applyCoupon} />
        </div>
        {coupons.length > 0 && (
          <div className="discountList">
            <h3>:קופונים שהוזנו</h3>
            <ul>
              {coupons.map((item, index) => (
                <li key={index} className="discountLi">
                  <div className="discountItem">
                    <small>{item.code}</small>
                    <small> :קוד</small>
                  </div>
                  <div className="discountItem">
                    <small>הנחה: </small>
                    <small>{item.discount}</small>
                    <small>
                      {item.percentOrAmount === "percent" ? "%" : "₪"}
                    </small>
                  </div>
                  <button
                    className="removeBtn"
                    onClick={() => removeCoupon(item.code)}
                  >
                    הסר
                  </button>
                  <div className="hr"></div>
                </li>
              ))}
            </ul>
            <p className="totalDiscount">הנחה כוללת: ₪{totalDiscount}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Coupon;
