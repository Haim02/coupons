import { Routes, Route } from "react-router-dom";
import Coupon from "./pages/coupon/Coupon";
import Login from "./pages/login/Login";
import Navbar from "./components/navbar/Navbar";
import CouponsList from "./pages/admin/couponsList/CouponsList";
import Onecoupon from "./pages/admin/coupon/OneCoupon";
import AddUser from "./pages/admin/addUser/AddUser";
import AddCoupon from "./pages/admin/addCoupon/AddCoupon";
import PageNotFound from "./pages/pageNotFound/PageNotFound";
import { AuthProvider } from "./context/Auth";
import { CouponProvider } from "./context/Coupon";
import ProtectedRoute from "./pages/admin/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <CouponProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Coupon />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <CouponsList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/copons/:id"
            element={
              <ProtectedRoute>
                <Onecoupon />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/addUser"
            element={
              <ProtectedRoute>
                <AddUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/AddCoupon"
            element={
              <ProtectedRoute>
                <AddCoupon />
              </ProtectedRoute>
            }
          />

          {/* <Route path="/admin" element={<CouponsList />} />
      <Route path="/admin/copons/:id" element={<Onecoupon />} />
      <Route path="/admin/addUser" element={<AddUser />} />
      <Route path="/admin/addCoupon" element={<AddCoupon />} /> */}
      <Route path="*" element={<PageNotFound />} />
        </Routes>
      </CouponProvider>
    </AuthProvider>
  );
}

export default App;
