
import { createBrowserRouter } from "react-router-dom";
import StoreLayout from "../layouts/StoreLayout";

export const router = createBrowserRouter([
  {
    element: <StoreLayout />,
    children: [
      // =========================================================
      // HOME
      // =========================================================
      {
        index: true,
        lazy: async () => ({
          Component: (await import("../pages/Home")).default,
        }),
      },

      // =========================================================
      // SHOPPING
      // =========================================================
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

      // =========================================================
      // CUSTOMER AUTHENTICATION
      // =========================================================
      {
        path: "account/login",
        lazy: async () => ({
          Component: (await import("../pages/account/Login")).default,
        }),
      },

      {
        path: "account/register",
        lazy: async () => ({
          Component: (await import("../pages/account/Register")).default,
        }),
      },

      {
        path: "account/forgot-password",
        lazy: async () => ({
          Component: (
            await import("../pages/account/ForgotPassword")
          ).default,
        }),
      },

      // =========================================================
      // PROTECTED CUSTOMER ACCOUNT
      // =========================================================
      {
        path: "account",
        lazy: async () => ({
          Component: (
            await import("../layouts/ProtectedAccountLayout")
          ).default,
        }),
        children: [
          {
            index: true,
            lazy: async () => ({
              Component: (await import("../pages/account/Account")).default,
            }),
          },

          {
            path: "profile",
            lazy: async () => ({
              Component: (await import("../pages/account/Profile")).default,
            }),
          },

          {
            path: "orders",
            lazy: async () => ({
              Component: (await import("../pages/account/Orders")).default,
            }),
          },

          {
            path: "orders/:orderId",
            lazy: async () => ({
              Component: (
                await import("../pages/account/OrderDetails")
              ).default,
            }),
          },

          {
            path: "addresses",
            lazy: async () => ({
              Component: (
                await import("../pages/account/Addresses")
              ).default,
            }),
          },

          {
            path: "wishlist",
            lazy: async () => ({
              Component: (await import("../pages/account/Wishlist")).default,
            }),
          },

          {
            path: "returns",
            lazy: async () => ({
              Component: (await import("../pages/account/Returns")).default,
            }),
          },
        ],
      },

      // =========================================================
      // CUSTOMER WISHLIST
      // =========================================================
      {
        path: "wishlist",
        lazy: async () => ({
          Component: (await import("../pages/Wishlist")).default,
        }),
      },

      // =========================================================
      // CART
      // =========================================================
      {
        path: "cart",
        lazy: async () => ({
          Component: (await import("../pages/Cart")).default,
        }),
      },

      // =========================================================
      // CHECKOUT
      // =========================================================
      {
        path: "checkout",
        lazy: async () => ({
          Component: (
            await import("../pages/checkout/Checkout")
          ).default,
        }),
      },

      {
        path: "checkout/payment",
        lazy: async () => ({
          Component: (
            await import("../pages/checkout/Payment")
          ).default,
        }),
      },

      {
        path: "checkout/success",
        lazy: async () => ({
          Component: (
            await import("../pages/checkout/OrderSuccess")
          ).default,
        }),
      },

      // =========================================================
      // 404 FALLBACK
      // =========================================================
      {
        path: "*",
        lazy: async () => ({
          Component: (await import("../pages/NotFound")).default,
        }),
      },
    ],
  },
]);
