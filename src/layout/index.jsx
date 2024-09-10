import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";

import useAuthStore from "@/store/useAuthStore";
import Navbar from "@/layout/navbar";
import Footer from "@/layout/footer";

export default function MainLayout() {
  const { initializeAuth } = useAuthStore();
  const location = useLocation();

  const noFooterPaths = ["/login", "/register"];

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  const shouldRenderFooter = !noFooterPaths.includes(location.pathname);

  return (
    <Fragment>
      <Navbar />

      <div>
        <Outlet />
      </div>

      {shouldRenderFooter && <Footer />}
    </Fragment>
  );
}
