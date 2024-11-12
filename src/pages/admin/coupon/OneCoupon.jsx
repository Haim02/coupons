import React, { useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/he";
import "./oneCoupon.css";
import CouponDetails from "./../../../components/couponDetails/CouponDetails";
import UpdateCoupon from "../../../components/updateCoupon/UpdateCoupon";

const Onecoupon = () => {
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

  const handleOnChange = (e) => {
    setCouponValues((pre) => ({
      ...pre,
      [e.target.name]: e.target.value.trim(),
    }));
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

  const handleOnDelete = (e) => {};

  const hanleOnSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="oneCoumponContainer">
      <CouponDetails
        _id={coupon._id}
        couponCode={coupon.couponCode}
        description={coupon.description}
        discount={coupon.discount}
        doublePromotions={coupon.doublePromotions}
        limitedUses={coupon.limitedUses}
        percentOrAmount={coupon.percentOrAmount}
        createAt={coupon.createAt}
        expirDate={coupon.expirDate}
        userId={coupon.expirDate}
        handleOnDelete={handleOnDelete}
        isFetching={false}
      />
      <UpdateCoupon
        doublePromotions={coupon.doublePromotions}
        percentOrAmount={coupon.percentOrAmount}
        handleOnChange={handleOnChange}
        hanleOnSubmit={hanleOnSubmit}
        isFetching={false}
      />
    </div>
  );
};

export default Onecoupon;
