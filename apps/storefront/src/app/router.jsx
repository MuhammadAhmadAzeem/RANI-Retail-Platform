import { createBrowserRouter } from "react-router-dom";
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

      {
        path: "shop",
        lazy: async () => ({
          Component: (await import("../pages/Shop")).default,
        }),
      },

      {
        path: "category/:slug",
        lazy: async () => ({
          Component: (await import("../pages/Category")).default,
        }),
      },

      {
        path: "collection/:slug",
        lazy: async () => ({
          Component: (await import("../pages/Collection")).default,
        }),
      },

      {
        path: "product/:slug",
        lazy: async () => ({
          Component: (await import("../pages/ProductDetails")).default,
        }),
      },

      {
        path: "search",
        lazy: async () => ({
          Component: (await import("../pages/SearchResults")).default,
        }),
      },

      {
        path: "*",
        lazy: async () => ({
          Component: (await import("../pages/NotFound")).default,
        }),
      },
    ],
  },
]);