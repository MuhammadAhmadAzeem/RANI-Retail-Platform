import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    lazy: async () => ({
      Component: (await import("../pages/Dashboard")).default,
    }),
  },
  {
    path: "/login",
    lazy: async () => ({
      Component: (await import("../pages/Login")).default,
    }),
  },
  {
    path: "*",
    lazy: async () => ({
      Component: (await import("../pages/NotFound")).default,
    }),
  },
]);