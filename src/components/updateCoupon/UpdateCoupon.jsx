import React, { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import "dayjs/locale/he";
import Input from "../input/Input";
import Button from "../button/Button";
import Loader from "./../Loader";
import { useCoupons } from "../../context/Coupon";
import "./updateCoupon.css";
import { useLocation } from "react-router-dom";

const UpdateCoupon = ({
  hanleOnSubmit,
  handleOnChange,
  doublePromotions,
  percentOrAmount,
  isFetching,
}) => {
  const location = useLocation();
  const couponId = location.pathname.split("/")[2];
  const { coupons, loading, updateCoupon } = useCoupons();
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

  const handleSubmit = (e) => {
    e.preventDefault();
    updateCoupon(couponId, couponValues)
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
              defaultValue={doublePromotions}
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
              defaultValue={percentOrAmount === "amount" ? "₪" : "%"}
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
          <Button
            type="submit"
            text={isFetching ? <Loader /> : "עדכן"}
          />
        </div>
      </form>
    </div>
  );
};

export default UpdateCoupon;
