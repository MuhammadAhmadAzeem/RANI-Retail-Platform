import {
  ArrowLeft,
  ArrowRight,
  Check,
  LockKeyhole,
  MapPin,
  Package,
  ShoppingBag,
} from "lucide-react";
import { useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import Shipping from "./Shipping";
import useAuthStore from "../../store/authStore";
import useCartStore from "../../store/cartStore";

const SHIPPING_METHODS = {
  standard: {
    label: "Standard Delivery",
  },
  express: {
    label: "Express Delivery",
  },
};

function Checkout() {
  const user = useAuthStore((state) => state.user);

  const items = useCartStore((state) => state.items);
  const getSubtotal = useCartStore(
    (state) => state.getSubtotal
  );

  const location = useLocation();
  const navigate = useNavigate();

  const [shippingDetails, setShippingDetails] =
    useState(() => location.state?.shippingDetails || null);

  const subtotal = getSubtotal();

  const handleShippingSubmit = (data) => {
    setShippingDetails(data);
  };

  const handleEditShipping = () => {
    setShippingDetails(null);
  };

  const handleContinueToPayment = () => {
    if (!shippingDetails) {
      return;
    }

    navigate("/checkout/payment", {
      state: {
        shippingDetails,
      },
    });
  };

  if (items.length === 0) {
    return (
      <main className="min-h-[70vh] bg-background">
        <div className="mx-auto flex min-h-[70vh] max-w-[760px] items-center px-4 py-12 sm:px-6 sm:py-16">
          <div className="w-full text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-primary/10 bg-primary/[0.045] text-primary">
              <ShoppingBag
                size={32}
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </div>

            <p className="mt-7 text-[10px] font-semibold uppercase tracking-[0.22em] text-primary">
              Checkout
            </p>

            <h1 className="mt-3 font-heading text-3xl font-medium tracking-tight text-text sm:text-4xl">
              Your shopping bag is empty
            </h1>

            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-text-muted sm:text-base">
              Add something you love to your bag before
              continuing to checkout.
            </p>

            <Link
              to="/shop"
              className="mt-7 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              Explore Collection
              <ArrowRight
                size={15}
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[70vh] bg-background">
      <div className="mx-auto max-w-[1280px] px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
        <header className="border-b border-border pb-7 sm:pb-8">
          <Link
            to="/cart"
            className="inline-flex items-center gap-2 text-sm font-medium text-text-muted transition-colors hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <ArrowLeft
              size={15}
              aria-hidden="true"
            />
            Back to shopping bag
          </Link>

          <div className="mt-6 flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                Complete your order
              </p>

              <h1 className="mt-2 font-heading text-3xl font-medium tracking-tight text-text sm:text-4xl lg:text-5xl">
                Checkout
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-text-muted sm:text-base">
                Enter your delivery details to continue
                with your order.
              </p>
            </div>

            {/* Checkout Progress */}
            <div
              className="flex items-center gap-2 sm:gap-3"
              aria-label="Checkout progress"
            >
              {/* Shipping */}
              <div
                className="flex items-center gap-2 rounded-full bg-primary px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.13em] text-primary-foreground"
                aria-current="step"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary-foreground/10">
                  1
                </span>
                <span>Shipping</span>
              </div>

              <div
                className="h-px w-5 bg-border sm:w-8"
                aria-hidden="true"
              />

              {/* Payment */}
              {shippingDetails ? (
                <button
                  type="button"
                  onClick={handleContinueToPayment}
                  className="flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.13em] text-text-muted transition-colors hover:border-primary/25 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-surface-muted">
                    2
                  </span>
                  <span>Payment</span>
                </button>
              ) : (
                <span className="flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.13em] text-text-muted opacity-60">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-surface-muted">
                    2
                  </span>
                  <span>Payment</span>
                </span>
              )}

              <div
                className="h-px w-5 bg-border sm:w-8"
                aria-hidden="true"
              />

              {/* Review */}
              <span className="hidden items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.13em] text-text-muted opacity-60 sm:flex">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-surface-muted">
                  3
                </span>
                Review
              </span>
            </div>
          </div>
        </header>

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
          {/* Shipping Section */}
          <section aria-labelledby="shipping-heading">
            {!shippingDetails ? (
              <Shipping
                user={user}
                onSubmit={handleShippingSubmit}
              />
            ) : (
              <div className="overflow-hidden rounded-2xl border border-success/20 bg-surface">
                <div className="border-b border-border bg-success/[0.035] px-5 py-6 sm:px-7">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-success/[0.08] text-success">
                      <Check
                        size={20}
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                    </div>

                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-success">
                        Shipping details saved
                      </p>

                      <h2
                        id="shipping-heading"
                        className="mt-1.5 font-heading text-2xl font-medium tracking-tight text-text sm:text-3xl"
                      >
                        Delivery address
                      </h2>

                      <p className="mt-2 text-sm leading-6 text-text-muted">
                        Your delivery information is ready.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="px-5 py-6 sm:px-7">
                  <div className="rounded-xl border border-border bg-background p-5">
                    <div className="flex items-start gap-3">
                      <MapPin
                        size={18}
                        className="mt-0.5 shrink-0 text-primary"
                        aria-hidden="true"
                      />

                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-text">
                          {shippingDetails.name}
                        </p>

                        <p className="mt-1 text-sm text-text-muted">
                          {shippingDetails.phone}
                        </p>

                        <p className="mt-4 text-sm leading-6 text-text">
                          {shippingDetails.address}
                          <br />
                          {shippingDetails.area}
                          <br />
                          {shippingDetails.city}
                          {shippingDetails.postalCode
                            ? `, ${shippingDetails.postalCode}`
                            : ""}
                        </p>

                        {shippingDetails.landmark && (
                          <p className="mt-3 text-xs leading-5 text-text-muted">
                            <span className="font-semibold text-text">
                              Landmark:
                            </span>{" "}
                            {shippingDetails.landmark}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={handleEditShipping}
                      className="inline-flex min-h-10 items-center justify-center rounded-full border border-border px-5 py-2.5 text-xs font-semibold text-text transition-colors hover:border-primary/25 hover:bg-surface-muted hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    >
                      Edit delivery details
                    </button>

                    <button
                      type="button"
                      onClick={handleContinueToPayment}
                      className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary/20"
                    >
                      Continue to Payment
                      <ArrowRight
                        size={14}
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* Order Summary */}
          <aside className="rounded-2xl border border-border bg-surface p-5 sm:p-6 lg:sticky lg:top-28">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/[0.06] text-primary">
                <Package
                  size={18}
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
              </div>

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">
                  Order summary
                </p>

                <h2 className="mt-1 font-heading text-2xl font-medium tracking-tight text-text">
                  Your order
                </h2>
              </div>
            </div>

            <div className="mt-6 space-y-4 border-y border-border py-5">
              {items.map((item) => (
                <div
                  key={`${item.productId}-${item.size}-${item.color}`}
                  className="flex gap-3"
                >
                  <div className="relative h-16 w-14 shrink-0 overflow-hidden rounded-lg bg-surface-muted">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-text-muted">
                        <ShoppingBag
                          size={17}
                          aria-hidden="true"
                        />
                      </div>
                    )}

                    <span className="absolute right-1 top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-text px-1.5 text-[9px] font-semibold text-white">
                      {item.quantity}
                    </span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 text-sm font-semibold text-text">
                      {item.name}
                    </p>

                    {(item.size || item.color) && (
                      <p className="mt-1 text-[11px] text-text-muted">
                        {item.size &&
                          `Size: ${item.size}`}
                        {item.size &&
                          item.color &&
                          " • "}
                        {item.color &&
                          `Color: ${item.color}`}
                      </p>
                    )}

                    <p className="mt-1.5 text-xs font-semibold text-text">
                      Rs.{" "}
                      {(
                        item.price *
                        item.quantity
                      ).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3 py-5">
              <div className="flex items-center justify-between gap-4 text-sm">
                <span className="text-text-muted">
                  Items total
                </span>

                <span className="font-semibold text-text">
                  Rs. {subtotal.toLocaleString()}
                </span>
              </div>

              <div className="flex items-start justify-between gap-4 text-sm">
                <span className="text-text-muted">
                  Delivery
                </span>

                <span className="max-w-[170px] text-right text-xs leading-5 text-text-muted">
                  {shippingDetails?.shippingMethod
                    ? SHIPPING_METHODS[
                        shippingDetails.shippingMethod
                      ]?.label
                    : "To be calculated"}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 border-t border-border pt-5">
              <span className="text-sm font-semibold text-text">
                Order total
              </span>

              <span className="text-lg font-semibold text-text">
                Rs. {subtotal.toLocaleString()}
              </span>
            </div>

            <div className="mt-5 flex items-start gap-2.5 rounded-xl border border-border bg-background px-3.5 py-3">
              <LockKeyhole
                size={14}
                className="mt-0.5 shrink-0 text-text-muted"
                aria-hidden="true"
              />

              <p className="text-[11px] leading-5 text-text-muted">
                Your order details are reviewed before
                completing checkout.
              </p>
            </div>

            <button
              type="button"
              onClick={handleContinueToPayment}
              disabled={!shippingDetails}
              className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-45"
            >
              Continue to Payment
              <ArrowRight
                size={15}
                aria-hidden="true"
              />
            </button>

            {!shippingDetails && (
              <p className="mt-3 text-center text-[11px] leading-5 text-text-muted">
                Complete your delivery details to
                continue.
              </p>
            )}
          </aside>
        </div>
      </div>
    </main>
  );
}

export default Checkout;