import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  CreditCard,
  LockKeyhole,
  Package,
  ShoppingBag,
  WalletCards,
} from "lucide-react";
import { useState } from "react";
import {
  Link,
  useLocation,
} from "react-router-dom";

import useCartStore from "../../store/cartStore";

const PAYMENT_METHODS = [
  {
    value: "cod",
    label: "Cash on Delivery",
    description: "Pay when your order arrives.",
    icon: WalletCards,
  },
  {
    value: "card",
    label: "Card Payment",
    description: "Credit or debit card.",
    icon: CreditCard,
  },
  {
    value: "bank",
    label: "Bank Transfer",
    description: "Pay through your bank.",
    icon: Building2,
  },
];

function Payment() {
  const location = useLocation();

  const items = useCartStore((state) => state.items);
  const getSubtotal = useCartStore(
    (state) => state.getSubtotal
  );

  const [selectedMethod, setSelectedMethod] =
    useState("cod");

  const [showReview, setShowReview] =
    useState(false);

  const subtotal = getSubtotal();

  const shippingDetails =
    location.state?.shippingDetails || null;

  const selectedPayment = PAYMENT_METHODS.find(
    (method) => method.value === selectedMethod
  );

  const handleContinueToReview = () => {
    if (!selectedMethod) {
      return;
    }

    setShowReview(true);
  };

  const handlePaymentStep = () => {
    setShowReview(false);
  };

  if (items.length === 0) {
    return (
      <main className="min-h-[70vh] bg-background">
        <div className="mx-auto flex min-h-[70vh] max-w-[760px] items-center px-4 py-12 text-center sm:px-6">
          <div className="w-full">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/[0.06] text-primary">
              <ShoppingBag
                size={28}
                strokeWidth={1.6}
                aria-hidden="true"
              />
            </div>

            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Payment
            </p>

            <h1 className="mt-2 font-heading text-3xl font-medium tracking-tight text-text sm:text-4xl">
              Your shopping bag is empty
            </h1>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-text-muted">
              Add a product to continue with checkout.
            </p>

            <Link
              to="/shop"
              className="mt-7 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              Continue Shopping
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
      <div className="mx-auto max-w-[1180px] px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
        <header className="border-b border-border pb-7">
          <Link
            to="/checkout"
            state={{ shippingDetails }}
            className="inline-flex items-center gap-2 text-sm font-medium text-text-muted transition-colors hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <ArrowLeft
              size={15}
              aria-hidden="true"
            />
            Back to Shipping
          </Link>

          <div className="mt-7 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                Checkout
              </p>

              <h1 className="mt-2 font-heading text-3xl font-medium tracking-tight text-text sm:text-4xl">
                {showReview
                  ? "Review Your Order"
                  : "Payment"}
              </h1>

              <p className="mt-2 max-w-lg text-sm leading-6 text-text-muted">
                {showReview
                  ? "Check your payment method and order details before continuing."
                  : "Choose how you would like to pay."}
              </p>
            </div>

            {/* Checkout Progress */}
            <div
              className="flex items-center gap-2 sm:gap-3"
              aria-label="Checkout progress"
            >
              {/* Shipping */}
              <Link
                to="/checkout"
                state={{ shippingDetails }}
                className="flex items-center gap-2 text-xs font-semibold text-success transition-colors hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-success text-white">
                  <Check
                    size={14}
                    aria-hidden="true"
                  />
                </span>

                <span className="hidden sm:inline">
                  Shipping
                </span>
              </Link>

              <div
                className="h-px w-6 bg-border sm:w-10"
                aria-hidden="true"
              />

              {/* Payment */}
              <button
                type="button"
                onClick={handlePaymentStep}
                className={`flex items-center gap-2 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                  !showReview
                    ? "text-primary"
                    : "text-text-muted hover:text-primary"
                }`}
                aria-current={
                  !showReview ? "step" : undefined
                }
              >
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-full ${
                    !showReview
                      ? "bg-primary text-white"
                      : "bg-surface-muted text-text-muted"
                  }`}
                >
                  2
                </span>

                <span className="hidden sm:inline">
                  Payment
                </span>
              </button>

              <div
                className="h-px w-6 bg-border sm:w-10"
                aria-hidden="true"
              />

              {/* Review */}
              <button
                type="button"
                onClick={handleContinueToReview}
                className={`flex items-center gap-2 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                  showReview
                    ? "text-primary"
                    : "text-text-muted hover:text-primary"
                }`}
                aria-current={
                  showReview ? "step" : undefined
                }
              >
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-full ${
                    showReview
                      ? "bg-primary text-white"
                      : "bg-surface-muted text-text-muted"
                  }`}
                >
                  {showReview ? (
                    <Check
                      size={14}
                      aria-hidden="true"
                    />
                  ) : (
                    3
                  )}
                </span>

                <span className="hidden sm:inline">
                  Review
                </span>
              </button>
            </div>
          </div>
        </header>

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_350px] lg:items-start">
          {/* Main Content */}
          <section
            aria-labelledby="payment-heading"
            className="min-w-0"
          >
            {!showReview ? (
              <div className="rounded-2xl border border-border bg-surface p-5 sm:p-7">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                    Payment method
                  </p>

                  <h2
                    id="payment-heading"
                    className="mt-2 font-heading text-2xl font-medium tracking-tight text-text sm:text-3xl"
                  >
                    How would you like to pay?
                  </h2>
                </div>

                <div
                  className="mt-7 space-y-3"
                  role="radiogroup"
                  aria-label="Payment method"
                >
                  {PAYMENT_METHODS.map(
                    (method) => {
                      const Icon = method.icon;

                      const isSelected =
                        selectedMethod ===
                        method.value;

                      return (
                        <button
                          key={method.value}
                          type="button"
                          role="radio"
                          aria-checked={
                            isSelected
                          }
                          onClick={() =>
                            setSelectedMethod(
                              method.value
                            )
                          }
                          className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 sm:p-5 ${
                            isSelected
                              ? "border-primary bg-primary/[0.035]"
                              : "border-border bg-background hover:border-primary/25"
                          }`}
                        >
                          <span
                            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
                              isSelected
                                ? "bg-primary text-primary-foreground"
                                : "bg-surface-muted text-text-muted"
                            }`}
                          >
                            <Icon
                              size={19}
                              strokeWidth={1.7}
                              aria-hidden="true"
                            />
                          </span>

                          <span className="min-w-0 flex-1">
                            <span className="block text-sm font-semibold text-text sm:text-base">
                              {method.label}
                            </span>

                            <span className="mt-1 block text-xs text-text-muted sm:text-sm">
                              {method.description}
                            </span>
                          </span>

                          <span
                            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                              isSelected
                                ? "border-primary bg-primary"
                                : "border-border bg-surface"
                            }`}
                            aria-hidden="true"
                          >
                            {isSelected && (
                              <span className="h-2 w-2 rounded-full bg-white" />
                            )}
                          </span>
                        </button>
                      );
                    }
                  )}
                </div>

                <div className="mt-6 flex items-start gap-3 border-t border-border pt-5">
                  <LockKeyhole
                    size={16}
                    className="mt-0.5 shrink-0 text-text-muted"
                    aria-hidden="true"
                  />

                  <p className="text-xs leading-5 text-text-muted">
                    Payment processing will be connected
                    separately.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={
                    handleContinueToReview
                  }
                  className="mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  Continue to Review
                  <ArrowRight
                    size={16}
                    aria-hidden="true"
                  />
                </button>
              </div>
            ) : (
              <div className="space-y-5">
                {/* Payment Review */}
                <div className="rounded-2xl border border-border bg-surface p-5 sm:p-7">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                        Payment
                      </p>

                      <h2 className="mt-2 font-heading text-2xl font-medium text-text sm:text-3xl">
                        {selectedPayment?.label}
                      </h2>
                    </div>

                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-success/[0.08] text-success">
                      <Check
                        size={18}
                        aria-hidden="true"
                      />
                    </div>
                  </div>

                  <p className="mt-3 text-sm leading-6 text-text-muted">
                    {selectedPayment?.description}
                  </p>

                  <button
                    type="button"
                    onClick={handlePaymentStep}
                    className="mt-5 text-sm font-semibold text-primary transition-colors hover:text-primary-hover focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    Change payment method
                  </button>
                </div>

                {/* Delivery */}
                {shippingDetails && (
                  <div className="rounded-2xl border border-border bg-surface p-5 sm:p-7">
                    <div className="flex items-start justify-between gap-5">
                      <div className="min-w-0">
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                          Delivery
                        </p>

                        <p className="mt-2 text-sm font-semibold text-text">
                          {shippingDetails.name}
                        </p>

                        <p className="mt-1 text-sm leading-6 text-text-muted">
                          {shippingDetails.address},{" "}
                          {shippingDetails.area},{" "}
                          {shippingDetails.city}
                        </p>
                      </div>

                      <Link
                        to="/checkout"
                        state={{
                          shippingDetails,
                        }}
                        className="shrink-0 text-sm font-semibold text-primary transition-colors hover:text-primary-hover focus:outline-none focus:ring-2 focus:ring-primary/20"
                      >
                        Edit
                      </Link>
                    </div>
                  </div>
                )}

                {/* Items Review */}
                <div className="rounded-2xl border border-border bg-surface p-5 sm:p-7">
                  <div className="flex items-center gap-3">
                    <Package
                      size={18}
                      className="text-primary"
                      aria-hidden="true"
                    />

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                        Review
                      </p>

                      <h2 className="mt-1 font-heading text-2xl font-medium text-text">
                        Order details
                      </h2>
                    </div>
                  </div>

                  <div className="mt-6 divide-y divide-border border-y border-border">
                    {items.map((item) => (
                      <div
                        key={`${item.productId}-${item.size}-${item.color}`}
                        className="flex gap-4 py-4 first:pt-5 last:pb-5"
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

                          <span className="absolute right-1 top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-text px-1 text-[9px] font-semibold text-white">
                            {item.quantity}
                          </span>
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-text">
                            {item.name}
                          </p>

                          {(item.size ||
                            item.color) && (
                            <p className="mt-1 text-xs text-text-muted">
                              {item.size &&
                                `Size: ${item.size}`}
                              {item.size &&
                                item.color &&
                                " • "}
                              {item.color &&
                                `Color: ${item.color}`}
                            </p>
                          )}
                        </div>

                        <p className="shrink-0 text-sm font-semibold text-text">
                          Rs.{" "}
                          {(
                            item.price *
                            item.quantity
                          ).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* Order Summary */}
          <aside className="rounded-2xl border border-border bg-surface p-5 sm:p-6 lg:sticky lg:top-28">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              Order summary
            </p>

            <h2 className="mt-2 font-heading text-2xl font-medium text-text">
              Your order
            </h2>

            <div className="mt-6 space-y-4">
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

                    <span className="absolute right-1 top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-text px-1 text-[9px] font-semibold text-white">
                      {item.quantity}
                    </span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 text-sm font-semibold text-text">
                      {item.name}
                    </p>

                    <p className="mt-1 text-xs text-text-muted">
                      Qty {item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-3 border-t border-border pt-5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-text-muted">
                  Subtotal
                </span>

                <span className="font-semibold text-text">
                  Rs. {subtotal.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-text-muted">
                  Delivery
                </span>

                <span className="text-text-muted">
                  —
                </span>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-border pt-5">
              <span className="text-sm font-semibold text-text">
                Total
              </span>

              <span className="text-xl font-semibold text-text">
                Rs. {subtotal.toLocaleString()}
              </span>
            </div>

            {!showReview && (
              <div className="mt-5 rounded-xl bg-surface-muted px-4 py-3">
                <p className="text-xs font-medium leading-5 text-text-muted">
                  Selected:{" "}
                  <span className="font-semibold text-text">
                    {selectedPayment?.label}
                  </span>
                </p>
              </div>
            )}
          </aside>
        </div>
      </div>
    </main>
  );
}

export default Payment;