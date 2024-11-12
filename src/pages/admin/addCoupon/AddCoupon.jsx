import React, { useState } from 'react'
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import "dayjs/locale/he";
import Input from '../../../components/input/Input';
import Loader from '../../../components/Loader';
import Button from '../../../components/button/Button';
import './addCoupon.css'

const AddCoupon = () => {
  const isFetching = false;
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
    setCouponValues((prevState)=> {
      return({
        ...prevState,
        [inputName]: newValue,
      });
    });
  };

  const coupon = {
    _id: "123456789",
    couponCode: "123456",
    discount: "49",
    description: "הנחת חבר בתוקף ל 3 חודשים או עד כמר המלאי",
    doublePromotions: true,
    expirDate: "03/4/2024",
    limitedUses: 3,
    doubleUses: false,
    percentOrAmount: "amount",
    createAt: "7/11/2024",
    userId: "124334523425",
  };


  const hanleOnSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="addCoumponContainer">
    <h1> יצירת קופון חדש</h1>
    <form className="addCouponForm" onSubmit={hanleOnSubmit}>
      <div className="inputAddFormContainer">
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
        <div className="inputAddContainer">
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
            className="selectAddCouponInput"
            name="doublePromotions"
            onChange={handleOnChange}
          >
            <option></option>
            <option value={false}>לא</option>
            <option value={true}>כן</option>
          </select>
        </div>
        <div className="inputContainer">
          <label>הנחה בסכום או באחוזים</label>
          <select
            className="selectAddCouponInput"
            name="percentOrAmount"
            onChange={handleOnChange}
          >
            <option></option>
            <option value="amount">₪</option>
            <option value="percent">%</option>
          </select>
        </div>
        <div className="AddCouponInputContainerDate">
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
      <div className="addCouponBtnContainer">
        <Button
          type="submit"
          text={isFetching ? <Loader /> : "צור קופון"}
        />
      </div>
    </form>
  </div>
  )
}

export default AddCoupon
