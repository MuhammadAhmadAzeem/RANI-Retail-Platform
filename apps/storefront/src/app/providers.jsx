
import { HelmetProvider } from "react-helmet-async";

function AppProviders({ children }) {
  return <HelmetProvider>{children}</HelmetProvider>;
}

export default AppProviders;
