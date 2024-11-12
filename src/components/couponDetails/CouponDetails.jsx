import React from "react";
import Button from "../button/Button";
import Loader from "../Loader";
import { useCoupons } from "../../context/Coupon";
import "./couponDetails.css";
import { useLocation } from "react-router-dom";

const CouponDetails = ({
  _id,
  couponCode,
  discount,
  description,
  doublePromotions,
  expirDate,
  limitedUses,
  percentOrAmount,
  createAt,
  userId,
  handleOnDelete,
  isFetching,
}) => {
  const location = useLocation();
  const couponId = location.pathname.split("/")[2];
  const { coupons, deleteCoupon, loading } = useCoupons();
  const coupon = coupons.find(coupon => coupon._id === couponId)


  return (
    <div className="couponDetailsContainer">
      <div className="couponDetailsCard">
        <div className="listGroup">
          <div className="listGroupItem">
            <h2>קופון</h2>
            <span>{coupon._id}</span>
          </div>
          <div className="listGroupItem">
            <div className="row">
              <b className="col">:קוד קופון</b>
              <div className="col">{coupon.couponCode}</div>
            </div>
          </div>
          <div className="listGroupItem">
            <div className="row">
              <b className="col">:הנחה</b>
              <div className="col">
                {coupon.discount} {coupon.percentOrAmount === "amount" ? "₪" : "%"}
              </div>
            </div>
          </div>
          <div className="listGroupItem">
            <div className="row">
              <b className="col">:תיאור</b>
              <div className="col">{coupon.description}</div>
            </div>
          </div>
          <div className="listGroupItem">
            <div className="row">
              <b className="col">:כפל מבצעים</b>
              <div className="col">
                {coupon.doublePromotions === true ? "כן" : "לא"}
              </div>
            </div>
          </div>
          <div className="listGroupItem">
            <div className="row">
              <b className="col">:הגבלת שימושים</b>
              <div className="col">{coupon.limitedUses}</div>
            </div>
          </div>
          <div className="listGroupItem">
            <div className="row">
              <b className="col">:תאריך תפוגה</b>
              <div className="col">{coupon.expirDate}</div>
            </div>
          </div>
          <div className="listGroupItem">
            <div className="row">
              <b className="col">:תאריך יצירה</b>
              <div className="col">{coupon.createAt}</div>
            </div>
          </div>
          <div className="listGroupItem">
            <div className="row">
              <b className="col">:נוצר ע"י</b>
              <div className="col">{coupon.userId}</div>
            </div>
          </div>
          <div className="listGroupItem">
            <div className="deleteBtnContainer">
              <Button
                type="button"
                text={loading ? <Loader /> : "מחק קופון"}
                onClick={deleteCoupon(couponId)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CouponDetails;
