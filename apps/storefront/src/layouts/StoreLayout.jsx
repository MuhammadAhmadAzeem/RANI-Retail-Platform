import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import StoreFooter from "../components/footer/StoreFooter";
import StoreHeader from "../components/header/StoreHeader";

function StoreLayout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, [location.pathname, location.search]);

  return (
    <div className="min-h-screen bg-background text-text">
      <StoreHeader />

      <main>
        <Outlet />
      </main>

      <StoreFooter />
    </div>
  );
}

export default StoreLayout;