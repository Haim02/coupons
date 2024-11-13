import React, { useState } from "react";
import { useCoupons } from "../../../context/Coupon";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/he";
import Input from "../../../components/input/Input";
import Loader from "../../../components/Loader";
import Button from "../../../components/button/Button";
import "./addCoupon.css";

const AddCoupon = () => {
  const { addCoupon, loading, error, addCouponError } = useCoupons();
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

  // submit form and send request to the server if no error
  const hanleOnSubmit = (e) => {
    e.preventDefault();
    if (error) {
      return;
    }

    addCoupon(couponValues);
    alert("קופון נוצר בהצלחה");
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
        {addCouponError && <p style={{ color: "red" }}>{addCouponError}</p>}
        <div className="addCouponBtnContainer">
          <Button type="submit" text={loading ? <Loader /> : "צור קופון"} />
        </div>
      </form>
    </div>
  );
};

export default AddCoupon;
