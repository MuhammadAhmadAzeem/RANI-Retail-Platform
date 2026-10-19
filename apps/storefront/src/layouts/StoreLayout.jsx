
import { useEffect } from "react";
import { Outlet, useLocation, useNavigation } from "react-router-dom";

import SEO from "../components/common/SEO";
import CookieBanner from "../components/common/CookieBanner";
import StoreFooter from "../components/footer/StoreFooter";
import StoreHeader from "../components/header/StoreHeader";

function StoreLayout() {
  const location = useLocation();
  const navigation = useNavigation();
  const isNavigating = navigation.state === "loading";

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, [location.pathname, location.search]);

  return (
    <div className="min-h-screen bg-background text-text">
      <SEO />

      <StoreHeader />

      <main aria-busy={isNavigating}>
        {isNavigating && (
            <div
              role="progressbar"
              aria-label="Loading page"
              aria-valuetext="Loading page"
              className="fixed inset-x-0 top-0 z-[100] h-1 overflow-hidden bg-primary/20"
            >
              <span className="block h-full w-1/3 animate-pulse bg-primary" />
            </div>
          )}
          <Outlet />
      </main>

      <StoreFooter />

      <CookieBanner />
    </div>
  );
}

export default StoreLayout;
