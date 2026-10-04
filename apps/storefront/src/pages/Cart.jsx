import {
  ArrowLeft,
  ArrowRight,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import { Link } from "react-router-dom";

import useCartStore from "../store/cartStore";

function Cart() {
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
  const clearCart = useCartStore((state) => state.clearCart);
  const getSubtotal = useCartStore(
    (state) => state.getSubtotal
  );

  const subtotal = getSubtotal();

  return (
    <main className="min-h-[70vh] bg-background">
      <div className="mx-auto max-w-[1440px] px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Your selection
            </p>

            <h1 className="font-serif text-3xl font-medium text-text sm:text-4xl lg:text-5xl">
              Shopping Bag
            </h1>

            <p className="mt-3 text-sm text-text-muted sm:text-base">
              {items.length === 1
                ? "1 item in your bag"
                : `${items.length} items in your bag`}
            </p>
          </div>

          {items.length > 0 && (
            <button
              type="button"
              onClick={clearCart}
              className="self-start text-sm font-medium text-text-muted underline underline-offset-4 transition-colors hover:text-primary sm:self-auto"
            >
              Clear bag
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="flex min-h-[360px] flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-surface px-6 py-14 text-center">
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-surface-muted">
              <ShoppingBag
                size={28}
                strokeWidth={1.5}
                className="text-text-muted"
              />
            </div>

            <h2 className="font-serif text-2xl font-medium text-text sm:text-3xl">
              Your shopping bag is empty
            </h2>

            <p className="mt-3 max-w-sm text-sm leading-6 text-text-muted">
              Discover thoughtfully designed pieces and add
              your favourites to your bag.
            </p>

            <Link
              to="/shop"
              className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              Continue Shopping
              <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
            <section
              aria-label="Shopping bag items"
              className="space-y-4"
            >
              {items.map((item) => (
                <article
                  key={`${item.productId}-${item.size}-${item.color}`}
                  className="rounded-2xl border border-border bg-surface p-4 sm:p-5"
                >
                  <div className="flex gap-4 sm:gap-6">
                    <div className="h-32 w-24 shrink-0 overflow-hidden rounded-xl bg-surface-muted sm:h-40 sm:w-32">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-text-muted">
                          <ShoppingBag
                            size={24}
                            strokeWidth={1.5}
                            aria-hidden="true"
                          />
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h2 className="font-serif text-lg font-medium text-text sm:text-xl">
                            {item.name}
                          </h2>

                          <p className="mt-1 text-sm font-semibold text-text">
                            Rs. {item.price.toLocaleString()}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            removeFromCart(
                              item.productId,
                              item.size,
                              item.color
                            )
                          }
                          aria-label={`Remove ${item.name} from bag`}
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-text-muted transition-colors hover:bg-surface-muted hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        >
                          <Trash2
                            size={17}
                            aria-hidden="true"
                          />
                        </button>
                      </div>

                      {(item.size || item.color) && (
                        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-text-muted">
                          {item.size && (
                            <span>
                              Size:{" "}
                              <span className="font-medium text-text">
                                {item.size}
                              </span>
                            </span>
                          )}

                          {item.color && (
                            <span>
                              Color:{" "}
                              <span className="font-medium text-text">
                                {item.color}
                              </span>
                            </span>
                          )}
                        </div>
                      )}

                      <div className="mt-5 flex items-center justify-between gap-4">
                        <div className="flex h-10 items-center rounded-full border border-border bg-background p-1">
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
                            className="flex h-8 w-8 items-center justify-center rounded-full text-text transition-colors hover:bg-surface-muted disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                          >
                            <Minus
                              size={14}
                              aria-hidden="true"
                            />
                          </button>

                          <span
                            className="min-w-8 text-center text-sm font-semibold text-text"
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
                            disabled={
                              item.quantity >= item.stock
                            }
                            aria-label={`Increase quantity of ${item.name}`}
                            className="flex h-8 w-8 items-center justify-center rounded-full text-text transition-colors hover:bg-surface-muted disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                          >
                            <Plus
                              size={14}
                              aria-hidden="true"
                            />
                          </button>
                        </div>

                        <p className="text-sm font-semibold text-text">
                          Rs.{" "}
                          {(
                            item.price * item.quantity
                          ).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              ))}

              <Link
                to="/shop"
                className="inline-flex items-center gap-2 pt-2 text-sm font-medium text-text-muted transition-colors hover:text-primary"
              >
                <ArrowLeft size={16} aria-hidden="true" />
                Continue shopping
              </Link>
            </section>

            <aside className="rounded-2xl border border-border bg-surface p-5 sm:p-6 lg:sticky lg:top-28">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Order summary
              </p>

              <h2 className="mt-2 font-serif text-2xl font-medium text-text">
                Your total
              </h2>

              <div className="mt-6 space-y-4 border-y border-border py-5">
                <div className="flex items-center justify-between gap-4 text-sm">
                  <span className="text-text-muted">
                    Subtotal
                  </span>

                  <span className="font-semibold text-text">
                    Rs. {subtotal.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4 text-sm">
                  <span className="text-text-muted">
                    Delivery
                  </span>

                  <span className="font-medium text-text">
                    Calculated at checkout
                  </span>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between gap-4">
                <span className="text-sm font-semibold text-text">
                  Total
                </span>

                <span className="text-lg font-semibold text-text">
                  Rs. {subtotal.toLocaleString()}
                </span>
              </div>

              <button
                type="button"
                disabled
                className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground opacity-50"
              >
                Checkout coming soon
              </button>

              <p className="mt-4 text-center text-xs leading-5 text-text-muted">
                Checkout will be available in a future
                release.
              </p>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}

export default Cart;

