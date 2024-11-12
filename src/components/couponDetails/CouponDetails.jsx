import React from "react";
import Button from "../button/Button";
import Loader from "../Loader";
import "./couponDetails.css";

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
  return (
    <div className="couponDetailsContainer">
      <div className="couponDetailsCard">
        <div className="listGroup">
          <div className="listGroupItem">
            <h2>קופון</h2>
            <span>{_id}</span>
          </div>
          <div className="listGroupItem">
            <div className="row">
              <b className="col">:קוד קופון</b>
              <div className="col">{couponCode}</div>
            </div>
          </div>
          <div className="listGroupItem">
            <div className="row">
              <b className="col">:הנחה</b>
              <div className="col">
                {discount} {percentOrAmount === "amount" ? "₪" : "%"}
              </div>
            </div>
          </div>
          <div className="listGroupItem">
            <div className="row">
              <b className="col">:תיאור</b>
              <div className="col">{description}</div>
            </div>
          </div>
          <div className="listGroupItem">
            <div className="row">
              <b className="col">:כפל מבצעים</b>
              <div className="col">
                {doublePromotions === true ? "כן" : "לא"}
              </div>
            </div>
          </div>
          <div className="listGroupItem">
            <div className="row">
              <b className="col">:הגבלת שימושים</b>
              <div className="col">{limitedUses}</div>
            </div>
          </div>
          <div className="listGroupItem">
            <div className="row">
              <b className="col">:תאריך תפוגה</b>
              <div className="col">{expirDate}</div>
            </div>
          </div>
          <div className="listGroupItem">
            <div className="row">
              <b className="col">:תאריך יצירה</b>
              <div className="col">{createAt}</div>
            </div>
          </div>
          <div className="listGroupItem">
            <div className="row">
              <b className="col">:נוצר ע"י</b>
              <div className="col">{userId}</div>
            </div>
          </div>
          <div className="listGroupItem">
            <div className="deleteBtnContainer">
              <Button
                type="button"
                text={isFetching ? <Loader /> : "מחק קופון"}
                onClick={handleOnDelete}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CouponDetails;
