import CouponDetails from "./../../../components/couponDetails/CouponDetails";
import UpdateCoupon from "../../../components/updateCoupon/UpdateCoupon";
import "./oneCoupon.css";

const Onecoupon = () => {
  return (
    <div className="oneCoumponContainer">
      <CouponDetails />
      <UpdateCoupon />
    </div>
  );
};

export default Onecoupon;
