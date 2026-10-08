import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronRight,
  Edit3,
  LockKeyhole,
  MapPin,
  Package,
  ShoppingBag,
  Truck,
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

function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);

  const items = useCartStore((state) => state.items);
  const getSubtotal = useCartStore(
    (state) => state.getSubtotal
  );

  const [shippingDetails, setShippingDetails] =
    useState(
      location.state?.shippingDetails || null
    );

  const subtotal = getSubtotal();

  const shippingMethod =
    shippingDetails?.shippingMethod || "standard";

  const shippingMethodLabel =
    shippingMethod === "express"
      ? "Express Delivery"
      : "Standard Delivery";

  const handleShippingSubmit = (data) => {
    setShippingDetails(data);
  };

  const handleEditShipping = () => {
    setShippingDetails(null);
  };

  const handleContinueToPayment = () => {
    if (!shippingDetails) return;

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
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-primary/10 bg-surface text-primary">
              <ShoppingBag
                size={27}
                strokeWidth={1.6}
                aria-hidden="true"
              />
            </div>

            <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.22em] text-primary">
              Checkout
            </p>

            <h1 className="mt-2 font-heading text-3xl font-medium tracking-tight text-text sm:text-4xl">
              Your shopping bag is empty
            </h1>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-text-muted">
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
      {/* =====================================================
          HEADER
      ====================================================== */}
      <header className="border-b border-border bg-surface">
        <div className="mx-auto max-w-[1180px] px-4 py-7 sm:px-6 sm:py-8 lg:px-8">
          <Link
            to="/cart"
            className="inline-flex items-center gap-2 text-xs font-medium text-text-muted transition-colors hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <ArrowLeft
              size={14}
              aria-hidden="true"
            />
            Back to shopping bag
          </Link>

          <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
                Complete your order
              </p>

              <h1 className="mt-1.5 font-heading text-3xl font-medium tracking-tight text-text sm:text-4xl">
                Checkout
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-text-muted">
                Confirm your delivery details before moving
                to payment.
              </p>
            </div>

            {/* Checkout progress */}
            <nav
              aria-label="Checkout progress"
              className="flex items-center gap-1.5 sm:gap-2"
            >
              {/* Shipping */}
              <div className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.08em] text-primary-foreground">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10">
                  1
                </span>

                <span className="hidden sm:inline">
                  Shipping
                </span>
              </div>

              <ChevronRight
                size={13}
                className="text-border"
                aria-hidden="true"
              />

              {/* Payment */}
              {shippingDetails ? (
                <Link
                  to="/checkout/payment"
                  state={{ shippingDetails }}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.08em] text-text-muted transition-colors hover:border-primary/20 hover:text-primary"
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-surface-muted">
                    2
                  </span>

                  <span className="hidden sm:inline">
                    Payment
                  </span>
                </Link>
              ) : (
                <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.08em] text-text-muted">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-surface-muted">
                    2
                  </span>

                  <span className="hidden sm:inline">
                    Payment
                  </span>
                </div>
              )}

              <ChevronRight
                size={13}
                className="text-border"
                aria-hidden="true"
              />

              {/* Review */}
              <div className="hidden items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.08em] text-text-muted sm:inline-flex">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-surface-muted">
                  3
                </span>

                Review
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}
      <div className="mx-auto max-w-[1180px] px-4 py-7 sm:px-6 sm:py-9 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
          {/* =================================================
              LEFT — SHIPPING
          ================================================== */}
          <section aria-labelledby="shipping-heading">
            {!shippingDetails ? (
              <Shipping
                user={user}
                onSubmit={handleShippingSubmit}
              />
            ) : (
              <div className="overflow-hidden rounded-2xl border border-border bg-surface">
                {/* Section header */}
                <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-5 sm:px-6">
                  <div className="flex min-w-0 items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-success/[0.07] text-success">
                      <Check
                        size={18}
                        strokeWidth={2.2}
                        aria-hidden="true"
                      />
                    </div>

                    <div className="min-w-0">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-success">
                        Shipping details saved
                      </p>

                      <h2
                        id="shipping-heading"
                        className="mt-1 font-heading text-xl font-medium tracking-tight text-text sm:text-2xl"
                      >
                        Delivery address
                      </h2>

                      <p className="mt-1.5 text-sm leading-5 text-text-muted">
                        Your delivery information is ready.
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleEditShipping}
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-2 text-xs font-semibold text-text transition-colors hover:border-primary/20 hover:bg-background hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <Edit3
                      size={13}
                      aria-hidden="true"
                    />
                    Edit
                  </button>
                </div>

                {/* Delivery details */}
                <div className="px-5 sm:px-6">
                  {/* Address */}
                  <div className="py-6">
                    <div className="flex items-start gap-3">
                      <MapPin
                        size={17}
                        className="mt-0.5 shrink-0 text-primary"
                        aria-hidden="true"
                      />

                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-text">
                          {shippingDetails.name}
                        </p>

                        <p className="mt-1 text-xs text-text-muted">
                          {shippingDetails.phone}
                        </p>

                        <p className="mt-3 text-sm leading-6 text-text">
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
                          <p className="mt-2 text-xs leading-5 text-text-muted">
                            <span className="font-medium text-text">
                              Landmark:
                            </span>{" "}
                            {shippingDetails.landmark}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Delivery method */}
                  <div className="flex flex-col gap-4 border-t border-border py-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface-muted text-primary">
                        <Truck
                          size={16}
                          strokeWidth={1.8}
                          aria-hidden="true"
                        />
                      </div>

                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-text-muted">
                          Delivery method
                        </p>

                        <p className="mt-1 text-sm font-semibold text-text">
                          {shippingMethodLabel}
                        </p>
                      </div>
                    </div>

                    <span className="text-xs font-medium text-success">
                      Selected
                    </span>
                  </div>

                  {/* Primary action */}
                  <div className="border-t border-border py-5">
                    <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-start gap-2.5">
                        <LockKeyhole
                          size={14}
                          className="mt-0.5 shrink-0 text-text-muted"
                          aria-hidden="true"
                        />

                        <p className="max-w-sm text-[11px] leading-5 text-text-muted">
                          Your delivery details will be carried
                          forward to the secure payment step.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={handleContinueToPayment}
                        className="inline-flex min-h-11 w-full shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary/20 sm:w-auto"
                      >
                        Continue to Payment
                        <ArrowRight
                          size={15}
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* =================================================
              RIGHT — ORDER SUMMARY
          ================================================== */}
          <aside className="overflow-hidden rounded-2xl border border-border bg-surface lg:sticky lg:top-28">
            {/* Summary heading */}
            <div className="border-b border-border px-5 py-5 sm:px-6">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/[0.06] text-primary">
                  <Package
                    size={17}
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-primary">
                    Order summary
                  </p>

                  <h2 className="mt-1 font-heading text-xl font-medium tracking-tight text-text">
                    Your order
                  </h2>
                </div>
              </div>
            </div>

            {/* Products */}
            <div className="px-5 py-5 sm:px-6">
              <div className="space-y-5">
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
                            size={16}
                            aria-hidden="true"
                          />
                        </div>
                      )}

                      <span className="absolute right-1 top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-text px-1.5 text-[9px] font-semibold text-white">
                        {item.quantity}
                      </span>
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-2 text-sm font-semibold leading-5 text-text">
                        {item.name}
                      </p>

                      {(item.size || item.color) && (
                        <p className="mt-1 text-[10px] leading-4 text-text-muted">
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
            </div>

            {/* Totals */}
            <div className="border-t border-border px-5 py-5 sm:px-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-4 text-sm">
                  <span className="text-text-muted">
                    Items total
                  </span>

                  <span className="font-medium text-text">
                    Rs. {subtotal.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4 text-sm">
                  <span className="text-text-muted">
                    Delivery
                  </span>

                  <span className="text-xs font-medium text-text">
                    {shippingDetails
                      ? shippingMethodLabel
                      : "Calculated at checkout"}
                  </span>
                </div>
              </div>

              <div className="mt-5 flex items-end justify-between gap-4 border-t border-border pt-5">
                <div>
                  <p className="text-sm font-semibold text-text">
                    Order total
                  </p>

                  <p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-text-muted">
                    PKR
                  </p>
                </div>

                <p className="text-xl font-semibold tracking-tight text-text">
                  Rs. {subtotal.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Trust note */}
            <div className="border-t border-border bg-background px-5 py-4 sm:px-6">
              <div className="flex items-start gap-2.5">
                <LockKeyhole
                  size={14}
                  className="mt-0.5 shrink-0 text-text-muted"
                  aria-hidden="true"
                />

                <p className="text-[10px] leading-5 text-text-muted">
                  Your checkout details stay within the checkout
                  flow and are carried securely to the next step.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default Checkout;