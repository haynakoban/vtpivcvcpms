import { Outlet, useLocation } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";

import Navbar from "@/layout/public/navbar";
import Footer from "@/layout/public/footer";

export default function MainLayout() {
  const location = useLocation();
  const noFooterPaths = ["/login", "/register"];
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
