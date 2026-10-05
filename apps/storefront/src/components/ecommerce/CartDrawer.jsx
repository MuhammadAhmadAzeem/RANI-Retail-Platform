import {
  ArrowRight,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  X,
} from "lucide-react";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import useCartStore from "../../store/cartStore";

function CartDrawer({ open = false, onClose }) {
  const closeButtonRef = useRef(null);

  const items = useCartStore((state) => state.items);
  const increaseQuantity = useCartStore(
    (state) => state.increaseQuantity
  );
  const decreaseQuantity = useCartStore(
    (state) => state.decreaseQuantity
  );
  const removeFromCart = useCartStore(
    (state) => state.removeFromCart
  );
  const getSubtotal = useCartStore((state) => state.getSubtotal);

  const subtotal = getSubtotal();

  useEffect(() => {
    if (!open) {
      return;
    }

    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-drawer-title"
    >
      <button
        type="button"
        aria-label="Close cart"
        onClick={onClose}
        className="absolute inset-0 bg-black/30"
      />

      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-background shadow-2xl">
        <div className="flex items-center justify-between border-b border-border px-5 py-5 sm:px-6">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
              Your selection
            </p>

            <h2
              id="cart-drawer-title"
              className="mt-1 font-serif text-2xl font-medium text-text"
            >
              Shopping Bag
            </h2>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close cart"
            className="flex h-10 w-10 items-center justify-center rounded-full text-text-muted transition-colors hover:bg-surface-muted hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-surface-muted">
              <ShoppingBag
                size={27}
                strokeWidth={1.5}
                className="text-text-muted"
                aria-hidden="true"
              />
            </div>

            <h3 className="mt-5 font-serif text-2xl font-medium text-text">
              Your bag is empty
            </h3>

            <p className="mt-3 max-w-xs text-sm leading-6 text-text-muted">
              Discover our latest collection and find something you
              love.
            </p>

            <Link
              to="/shop"
              onClick={onClose}
              className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              Explore Collection
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-6">
              <div
                className="mb-5 rounded-xl border border-primary/10 bg-primary/5 px-4 py-3"
                aria-live="polite"
              >
                <p className="text-xs font-medium text-primary">
                  Your items are saved in your shopping bag.
                </p>
              </div>

              <div className="space-y-4">
                {items.map((item) => (
                  <article
                    key={`${item.productId}-${item.size}-${item.color}`}
                    className="flex gap-4 border-b border-border pb-4"
                  >
                    <div className="h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-surface-muted">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-text-muted">
                          <ShoppingBag
                            size={20}
                            strokeWidth={1.5}
                            aria-hidden="true"
                          />
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="truncate font-serif text-base font-medium text-text">
                          {item.name}
                        </h3>

                        <button
                          type="button"
                          onClick={() =>
                            removeFromCart(
                              item.productId,
                              item.size,
                              item.color
                            )
                          }
                          aria-label={`Remove ${item.name}`}
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-text-muted transition-colors hover:bg-surface-muted hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        >
                          <Trash2
                            size={15}
                            aria-hidden="true"
                          />
                        </button>
                      </div>

                      <p className="mt-1 text-sm font-semibold text-text">
                        Rs. {item.price.toLocaleString()}
                      </p>

                      {(item.size || item.color) && (
                        <p className="mt-1 text-xs text-text-muted">
                          {item.size && `Size: ${item.size}`}
                          {item.size && item.color && " • "}
                          {item.color && `Color: ${item.color}`}
                        </p>
                      )}

                      <div className="mt-3 flex items-center justify-between gap-3">
                        <div className="flex h-9 items-center rounded-full border border-border bg-background p-1">
                          <button
                            type="button"
                            onClick={() =>
                              decreaseQuantity(
                                item.productId,
                                item.size,
                                item.color
                              )
                            }
                            disabled={item.quantity <= 1}
                            aria-label={`Decrease quantity of ${item.name}`}
                            className="flex h-7 w-7 items-center justify-center rounded-full text-text transition hover:bg-surface-muted disabled:cursor-not-allowed disabled:opacity-40 focus:outline-none focus:ring-2 focus:ring-primary/20"
                          >
                            <Minus
                              size={13}
                              aria-hidden="true"
                            />
                          </button>

                          <span
                            className="min-w-7 text-center text-xs font-semibold text-text"
                            aria-live="polite"
                          >
                            {item.quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              increaseQuantity(
                                item.productId,
                                item.size,
                                item.color
                              )
                            }
                            disabled={item.quantity >= item.stock}
                            aria-label={`Increase quantity of ${item.name}`}
                            className="flex h-7 w-7 items-center justify-center rounded-full text-text transition hover:bg-surface-muted disabled:cursor-not-allowed disabled:opacity-40 focus:outline-none focus:ring-2 focus:ring-primary/20"
                          >
                            <Plus
                              size={13}
                              aria-hidden="true"
                            />
                          </button>
                        </div>

                        <span className="text-sm font-semibold text-text">
                          Rs.{" "}
                          {(
                            item.price * item.quantity
                          ).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="border-t border-border bg-surface px-5 py-5 sm:px-6">
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm text-text-muted">
                  Subtotal
                </span>

                <span className="text-base font-semibold text-text">
                  Rs. {subtotal.toLocaleString()}
                </span>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <Link
                  to="/cart"
                  onClick={onClose}
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-border px-5 py-3 text-sm font-semibold text-text transition-colors hover:border-primary hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  View Shopping Bag
                </Link>

                <button
                  type="button"
                  disabled
                  aria-label="Checkout coming soon"
                  className="inline-flex min-h-12 cursor-not-allowed items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground opacity-60 focus:outline-none"
                >
                  Checkout
                  <ArrowRight size={16} aria-hidden="true" />
                </button>
              </div>

              <p className="mt-3 text-center text-[11px] text-text-muted">
                Checkout will be available soon.
              </p>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

export default CartDrawer;