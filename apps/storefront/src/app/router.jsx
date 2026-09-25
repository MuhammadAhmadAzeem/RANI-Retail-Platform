import { createBrowserRouter, Outlet } from "react-router-dom";

import StoreLayout from "../layouts/StoreLayout";

export const router = createBrowserRouter([
  {
    element: <StoreLayout />,
    children: [
      {
        index: true,
        lazy: async () => ({
          Component: (await import("../pages/Home")).default,
        }),
      },
    ],
  },
  {
    path: "*",
    lazy: async () => ({
      Component: (await import("../pages/NotFound")).default,
    }),
  },
]);