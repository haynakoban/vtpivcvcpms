import { Route, Routes } from "react-router-dom";
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
import CreateAppointment from "@/view/private/create-appointment";
import CreateCareplan from "@/view/private/create-careplan";
import Messages from "@/view/private/messages";
import Meetings from "@/view/private/meetings";
import Settings from "@/view/private/settings";
import Availability from "@/view/private/availability";
import Security from "@/view/private/security";
import Conversations from "@/view/private/conversations";
import ComposeMessage from "@/view/private/compose-message";
import AuditTrails from "@/view/private/audit-trails";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public routes - only accessible if not logged in */}
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="about-us" element={<AboutUs />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot" element={<Forgot />} />
      </Route>

      {/* Private routes - only accessible if logged in */}
      <Route path="auth/dashboard" element={<Dashboard />} />
      <Route path="auth/audit" element={<AuditTrails />} />
      <Route path="auth/pets" element={<Pets />} />
      <Route path="auth/appointment" element={<Appointment />} />
      <Route path="auth/appointment/create" element={<CreateAppointment />} />
      <Route path="auth/careplan" element={<Careplan />} />
      <Route path="auth/careplan/:apptId/:petId" element={<CreateCareplan />} />
      <Route path="auth/messages" element={<Messages />} />
      <Route path="auth/meetings" element={<Meetings />} />
      <Route path="auth/settings" element={<Settings />} />
      <Route path="auth/settings/security" element={<Security />} />
      <Route path="auth/settings/availability" element={<Availability />} />
      <Route path="auth/messages/compose" element={<ComposeMessage />} />
      <Route path="auth/messages/:id" element={<Conversations />} />

      {/* Catch-all 404 */}
      <Route path="*" element={<CatchAllPage />} />
    </Routes>
  );
}
