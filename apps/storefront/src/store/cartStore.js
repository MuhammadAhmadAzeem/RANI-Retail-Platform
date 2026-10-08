import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      isCartDrawerOpen: false,

      openCartDrawer: () => set({ isCartDrawerOpen: true }),

      closeCartDrawer: () => set({ isCartDrawerOpen: false }),

      addToCart: (
        product,
        quantity = 1,
        selectedSize = "",
        selectedColor = ""
      ) => {
        if (!product?.id) {
          return;
        }

        const stock = Math.max(0, Number(product.stock) || 0);

        if (stock <= 0) {
          return;
        }

        const requestedQuantity = Math.max(
          1,
          Number(quantity) || 1
        );

        const size = selectedSize || "";
        const color = selectedColor || "";

        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (item) =>
              item.productId === product.id &&
              item.size === size &&
              item.color === color
          );

          if (existingItemIndex === -1) {
            return {
              items: [
                ...state.items,
                {
                  productId: product.id,
                  name: product.name,
                  price: Number(product.price) || 0,
                  image: product.images?.[0] || "",
                  quantity: Math.min(requestedQuantity, stock),
                  size,
                  color,
                  stock,
                },
              ],
              isCartDrawerOpen: true,
            };
          }

          const updatedItems = [...state.items];
          const existingItem = updatedItems[existingItemIndex];

          updatedItems[existingItemIndex] = {
            ...existingItem,
            quantity: Math.min(
              existingItem.quantity + requestedQuantity,
              stock
            ),
            stock,
          };

          return {
            items: updatedItems,
            isCartDrawerOpen: true,
          };
        });
      },

      removeFromCart: (
        productId,
        selectedSize = "",
        selectedColor = ""
      ) => {
        set((state) => ({
          items: state.items.filter(
            (item) =>
              !(
                item.productId === productId &&
                item.size === (selectedSize || "") &&
                item.color === (selectedColor || "")
              )
          ),
        }));
      },

      increaseQuantity: (
        productId,
        selectedSize = "",
        selectedColor = ""
      ) => {
        set((state) => ({
          items: state.items.map((item) => {
            if (
              item.productId !== productId ||
              item.size !== (selectedSize || "") ||
              item.color !== (selectedColor || "")
            ) {
              return item;
            }

            return {
              ...item,
              quantity: Math.min(item.quantity + 1, item.stock),
            };
          }),
        }));
      },

      decreaseQuantity: (
        productId,
        selectedSize = "",
        selectedColor = ""
      ) => {
        set((state) => ({
          items: state.items
            .map((item) => {
              if (
                item.productId !== productId ||
                item.size !== (selectedSize || "") ||
                item.color !== (selectedColor || "")
              ) {
                return item;
              }

              return {
                ...item,
                quantity: item.quantity - 1,
              };
            })
            .filter((item) => item.quantity > 0),
        }));
      },

      clearCart: () => set({ items: [] }),

      getItemQuantity: (
        productId,
        selectedSize = "",
        selectedColor = ""
      ) => {
        const item = get().items.find(
          (cartItem) =>
            cartItem.productId === productId &&
            cartItem.size === (selectedSize || "") &&
            cartItem.color === (selectedColor || "")
        );

        return item?.quantity || 0;
      },

      getTotalItems: () =>
        get().items.reduce(
          (total, item) => total + item.quantity,
          0
        ),

      getSubtotal: () =>
        get().items.reduce(
          (subtotal, item) =>
            subtotal + item.price * item.quantity,
          0
        ),
    }),
    {
      name: "rani-storefront-cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
      }),
    }
  )
);

export default useCartStore;