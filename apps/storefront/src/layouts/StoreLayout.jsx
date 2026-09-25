import { Outlet } from "react-router-dom";

import StoreFooter from "../components/footer/StoreFooter";
import StoreHeader from "../components/header/StoreHeader";

function StoreLayout() {
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