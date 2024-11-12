import React, { useState } from "react";
import Button from "../../components/button/Button";
import { useCoupons } from "../../context/Coupon";
import "./coupon.css";
import Loader from "../../components/Loader";

const Coupon = () => {
  const { coupon, loading, getCouponDiscount } = useCoupons();
  const [price, setPrice] = useState(100);
  const [couponCode, setCouponCode] = useState("");
  const [coupons, setCoupons] = useState([]);
  const [totalDiscount, setTotalDiscount] = useState(0);

  //sent coupon code to the server and get a coupon object
  const applyCoupon = () => {
    if (!couponCode) {
      return;
    }

    getCouponDiscount(couponCode);

    let discount = 0;

    if (coupon.percentOrAmount === "percent") {
      discount = (price * coupon.discount) / 100;
      const newCoupon = { code: coupon, discount };
      setCoupons((pre) => [...pre, newCoupon]);
      setTotalDiscount(totalDiscount + discount);
      setCouponCode("");
    } else {
      const newCoupon = { code: coupon, discount, percentOrAmount: "percent" };
      setCoupons([...coupons, newCoupon]);
      setTotalDiscount(totalDiscount + discount);
      setCouponCode("");
    }

    if (price - (totalDiscount + discount) < 0) {
      alert("ההנחה חורגת מהסכום לתשלום");
      return;
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
            onChange={(e) => setCouponCode(e.target.value)}
          />
          <Button
            type="button"
            text={loading ? <Loader /> : "הוסף קופון"}
            onClick={applyCoupon}
          />
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
