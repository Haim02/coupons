import CouponDetails from "./../../../components/couponDetails/CouponDetails";
import UpdateCoupon from "../../../components/updateCoupon/UpdateCoupon";
import "./oneCoupon.css";

const Onecoupon = () => {
  return (
    <div className="oneCoumponContainer">
      <UpdateCoupon />
      <CouponDetails />
    </div>
  );
};

export default Onecoupon;
