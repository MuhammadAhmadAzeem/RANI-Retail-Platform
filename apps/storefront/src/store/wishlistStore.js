
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useWishlistStore = create(
  persist(
    (set, get) => ({
      items: [],

      addToWishlist: (product) => {
        if (!product?.id) {
          return;
        }

        const alreadyExists = get().items.some(
          (item) => item.id === product.id
        );

        if (alreadyExists) {
          return;
        }

        set((state) => ({
          items: [...state.items, product],
        }));
      },

      removeFromWishlist: (productId) => {
        set((state) => ({
          items: state.items.filter(
            (item) => item.id !== productId
          ),
        }));
      },

      toggleWishlist: (product) => {
        if (!product?.id) {
          return;
        }

        const alreadyExists = get().items.some(
          (item) => item.id === product.id
        );

        if (alreadyExists) {
          get().removeFromWishlist(product.id);
          return;
        }

        get().addToWishlist(product);
      },

      isWishlisted: (productId) => {
        return get().items.some(
          (item) => item.id === productId
        );
      },

      clearWishlist: () => {
        set({ items: [] });
      },
    }),
    {
      name: "rani-storefront-wishlist",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
      }),
    }
  )
);

export default useWishlistStore;