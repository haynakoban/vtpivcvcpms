import { Route, Routes } from "react-router-dom";

import MainLayout from "@/layout";

// public routes
import Home from "@/view";
import AboutUs from "@/view/public/about-us";
import Login from "@/view/public/login";
import Register from "@/view/public/register";
import Forgot from "@/view/public/forgot";
import CatchAllPage from "@/view/public/404";

// private routes
import Video from "@/view/private/video";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="about-us" element={<AboutUs />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot" element={<Forgot />} />
      </Route>
      <Route path="video" element={<Video />} />
      <Route path="*" element={<CatchAllPage />} />
    </Routes>
  );
}
