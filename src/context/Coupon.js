import axios from 'axios';
import React, { createContext, useContext, useState } from 'react';
const PATH = "http://localhost:3000/api";

export const CouponContext = createContext();

export const CouponProvider = ({ children }) => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // GET request to grt all coupons
  const gettAllCoupons = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${PATH}/coupons`);
      setCoupons(response.data);
    } catch (err) {
      setLoading(false);
      setError('שגיעה במשיכת נתונים');
    } finally {
    }
  };

  // POST request to create a coupon
  const addCoupon = async (couponData) => {
    setLoading(true);
    try {
      const response = await axios.post(`${PATH}/createCoupon`, couponData);
      setCoupons((prevCoupons) => [...prevCoupons, response.data]);
    } catch (err) {
      setLoading(false);
      setError('שגיעה ביצירת קופון חדש');
    } finally {
    }
  };

  // PUT request to update coupon
  const updateCoupon = async (id, updatedData) => {
    setLoading(true);
    try {
      const response = await axios.put(`${PATH}/updateCoupon/${id}`, updatedData);
      setCoupons((prevCoupons) =>
        prevCoupons.map((coupon) => (coupon.id === id ? response.data : coupon))
      );
    } catch (err) {
      setLoading(false);
      setError('שגיעה בעריכת קופון');
    } finally {
    }
  };

  // DELETE request to delete coupon
  const deleteCoupon = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`${PATH}/deleteCoupon/${id}`);
      setCoupons((prevCoupons) => prevCoupons.filter((coupon) => coupon.id !== id));
    } catch (err) {
      setLoading(false);
      setError('שגיעה במחיקת קופון');
    } finally {
    }
  };

  return (
    <CouponContext.Provider
      value={{ coupons, loading, error, gettAllCoupons, addCoupon, updateCoupon, deleteCoupon }}
    >
      {children}
    </CouponContext.Provider>
  );
};

export const useCoupons = () => useContext(CouponContext);

