import { Navigate, useLocation } from "react-router-dom";

import AccountLayout from "./AccountLayout";
import useAuthStore from "../store/authStore";

function ProtectedAccountLayout() {
  const isAuthenticated = useAuthStore(
    (state) => state.isAuthenticated
  );

  const location = useLocation();

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/account/login"
        replace
        state={{
          from: {
            pathname: location.pathname,
            search: location.search,
            hash: location.hash,
          },
        }}
      />
    );
  }

  return <AccountLayout />;
}

export default ProtectedAccountLayout;
