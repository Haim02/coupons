import axios from "axios";
import React, { createContext, useContext, useState } from "react";
const PATH = "http://localhost:3000/api";

export const CouponContext = createContext();

export const CouponProvider = ({ children }) => {
  const [coupons, setCoupons] = useState([]);
  const [coupon, setCoupon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // GET request to grt all coupons
  const getCouponDiscount = async (couponCode) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${PATH}/coupons/couponDiscount`, couponCode);
      setCoupon(response.data);
      setLoading(false)
      setError(null);
    } catch (err) {
      setLoading(false);
      setError("שגיאה במשיכת נתונים");
    }
  };

  const gettAllCoupons = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${PATH}/coupons`);
      setCoupons(response.data);
      setLoading(false);
      setError(null);
    } catch (err) {
      setLoading(false);
      setError("שגיאה במשיכת נתונים");
    }
  };

  // POST request to create a coupon
  const addCoupon = async (couponData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${PATH}/createCoupon`, couponData);
      setCoupons((prevCoupons) => [...prevCoupons, response.data]);
      setLoading(false);
      setError(null);
    } catch (err) {
      setLoading(false);
      setError("שגיאה ביצירת קופון חדש");
    }
  };

  // PUT request to update coupon
  const updateCoupon = async (id, updatedData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.put(
        `${PATH}/updateCoupon/${id}`,
        updatedData
      );
      setCoupons((prevCoupons) =>
        prevCoupons.map((coupon) => (coupon.id === id ? response.data : coupon))
      );
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError("שגיאה בעריכת קופון");
    }
  };

  // DELETE request to delete coupon
  const deleteCoupon = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`${PATH}/deleteCoupon/${id}`);
      setCoupons((prevCoupons) =>
        prevCoupons.filter((coupon) => coupon.id !== id)
      );
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError("שגיאה במחיקת קופון");
    }
  };

  return (
    <CouponContext.Provider
      value={{
        coupons,
        loading,
        error,
        setError,
        gettAllCoupons,
        addCoupon,
        updateCoupon,
        deleteCoupon,
        getCouponDiscount,
        coupon
      }}
    >
      {children}
    </CouponContext.Provider>
  );
};

export const useCoupons = () => useContext(CouponContext);
