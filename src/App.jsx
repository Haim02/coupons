import { Routes, Route } from "react-router-dom";
import Coupon from "./pages/coupon/Coupon";
import Login from "./pages/login/Login";
import Navbar from "./components/navbar/Navbar";
import CouponsList from "./pages/admin/couponsList/CouponsList";
import Onecoupon from "./pages/admin/coupon/OneCoupon";
import AddUser from "./pages/admin/addUser/AddUser";
import AddCoupon from "./pages/admin/addCoupon/AddCoupon";

function App() {
  const admin = true

  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Coupon />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<CouponsList />} />
      <Route path="/admin/copons/:id" element={<Onecoupon />} />
      <Route path="/admin/addUser" element={<AddUser />} />
      <Route path="/admin/addCoupon" element={<AddCoupon />} />
    </Routes>
    </>
  );
}

export default App;
