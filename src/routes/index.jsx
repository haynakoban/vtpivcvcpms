import { Navigate, Route, Routes } from "react-router-dom";

import useAuthStore from "@/store/useAuthStore";
import MainLayout from "@/layout/public";

// public routes
import Home from "@/view";
import AboutUs from "@/view/public/about-us";
import Login from "@/view/public/login";
import Register from "@/view/public/register";
import Forgot from "@/view/public/forgot";
import CatchAllPage from "@/view/public/404";

// private routes
import Dashboard from "@/view/private/dashboard";
import Pets from "@/view/private/pets";
import Appointment from "@/view/private/appointment";
import Careplan from "@/view/private/careplan";
import Messages from "@/view/private/messages";
import Meetings from "@/view/private/meetings";
import Account from "@/view/private/account";
import Settings from "@/view/private/settings";

export default function AppRoutes() {
  const { user } = useAuthStore();

  return (
    <Routes>
      {/* Public routes - only accessible if not logged in */}
      {!user ? (
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about-us" element={<AboutUs />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot" element={<Forgot />} />
        </Route>
      ) : (
        <Route path="*" element={<Navigate to="/auth/dashboard" />} />
      )}

      {/* Private routes - only accessible if logged in */}
      {user ? (
        <>
          <Route path="auth/dashboard" element={<Dashboard />} />
          <Route path="auth/pets" element={<Pets />} />
          <Route path="auth/appointment" element={<Appointment />} />
          <Route path="auth/careplan" element={<Careplan />} />
          <Route path="auth/messages" element={<Messages />} />
          <Route path="auth/meetings" element={<Meetings />} />
          <Route path="auth/account" element={<Account />} />
          <Route path="auth/settings" element={<Settings />} />
        </>
      ) : (
        <Route path="auth/*" element={<Navigate to="/login" />} />
      )}

      {/* Catch-all 404 */}
      <Route path="*" element={<CatchAllPage />} />
    </Routes>
  );
}
