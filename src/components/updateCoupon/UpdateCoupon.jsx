import React, { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/he";
import Input from "../input/Input";
import Button from "../button/Button";
import Loader from "./../Loader";
import { useCoupons } from "../../context/Coupon";
import { useLocation } from "react-router-dom";
import "./updateCoupon.css";

const UpdateCoupon = () => {
  const location = useLocation();
  const couponId = location.pathname.split("/")[2];
  const { loading, updateCoupon, error } = useCoupons();
  let date = new Date();
  const [value, setValue] = useState(dayjs(date));
  const [couponValues, setCouponValues] = useState({
    couponCode: "",
    discount: 0,
    description: "",
    doublePromotions: null,
    expirDate: "",
    limitedUses: 0,
    percentOrAmount: "",
  });

  const handleOnChange = (event) => {
    const newValue = event.target.value;
    const inputName = event.target.name;
    setCouponValues((prevState) => {
      return {
        ...prevState,
        [inputName]: newValue,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (error) {
      return;
    }
    updateCoupon(couponId, couponValues);
    alert("הקופון עודכן בהצלחה");
  };

  return (
    <div className="updateCoumponContainer">
      <h1>עדכן קופון</h1>
      <form className="updateForm" onSubmit={handleSubmit}>
        <div className="inputFormContainer">
          <Input
            lable="קוד קופון"
            name="couponCode"
            placeholder="קוד קופון"
            type="text"
            onChange={handleOnChange}
          />
          <Input
            lable="הנחה"
            name="discount"
            placeholder="הנחה"
            type="number"
            onChange={handleOnChange}
          />
          <Input
            lable="הגבלת שימושים"
            name="limitedUses"
            placeholder="הגבלת שימושים"
            type="number"
            onChange={handleOnChange}
          />
          <div className="inputContainer">
            <label>תיאור</label>
            <textarea
              className="textarea"
              rows="2"
              cols="20"
              name="description"
              placeholder="...תיאור של הקוד קופון"
              onChange={handleOnChange}
            ></textarea>
          </div>
          <div className="inputContainer">
            <label>כפל מבצעים</label>
            <select
              className="selectInput"
              name="doublePromotions"
              onChange={handleOnChange}
            >
              <option value={false}>לא</option>
              <option value={true}>כן</option>
            </select>
          </div>
          <div className="inputContainer">
            <label>הנחה בסכום או באחוזים</label>
            <select
              className="selectInput"
              name="percentOrAmount"
              onChange={handleOnChange}
            >
              <option value="amount">₪</option>
              <option value="percent">%</option>
            </select>
          </div>
          <div className="inputContainerDate">
            <label>תאריך תפוגה</label>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="he">
              <DatePicker
                value={value}
                name="expirDate"
                onChange={(e) =>
                  setCouponValues((pre) => ({
                    ...pre,
                    expirDate: dayjs(e).format("DD-MM-YYYY"),
                  }))
                }
              ></DatePicker>
            </LocalizationProvider>
          </div>
        </div>
        <div className="updateBtnContainer">
          {error && <p style={{ color: "red" }}>{error}</p>}
          <Button type="submit" text={loading ? <Loader /> : "עדכן"} />
        </div>
      </form>
    </div>
  );
};

export default UpdateCoupon;
