import {
  ArrowLeft,
  ArrowRight,
  Banknote,
  Building2,
  Check,
  ChevronRight,
  CreditCard,
  LockKeyhole,
  LoaderCircle,
  MapPin,
  Package,
  ShieldCheck,
  ShoppingBag,
  Truck,
  WalletCards,
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaCcMastercard,
  FaCcVisa,
} from "react-icons/fa";

import paymentService, {
  PAYMENT_METHODS,
  PAYMENT_METHOD_STATUS,
} from "../../services/payments/payment.service";
import useCartStore from "../../store/cartStore";

const METHOD_ICONS = {
  cod: Banknote,
  card: CreditCard,
  easypaisa: WalletCards,
  jazzcash: WalletCards,
  bank: Building2,
};

const PAYMENT_LOGO_URLS = {
  easypaisa:
    "https://upload.wikimedia.org/wikipedia/commons/9/9c/Easypaisa_Digital_Bank_logo.png",
  jazzcash:
    "https://upload.wikimedia.org/wikipedia/commons/4/41/JazzCash_logo_%282025%29.png",
};

function Payment() {
  const location = useLocation();

  const items = useCartStore((state) => state.items);
  const getSubtotal = useCartStore((state) => state.getSubtotal);

  const [selectedMethod, setSelectedMethod] =
    useState("cod");
  const [showReview, setShowReview] = useState(false);
  const [isPreparingReview, setIsPreparingReview] =
    useState(false);
  const [paymentError, setPaymentError] = useState("");

  const subtotal = getSubtotal();

  const shippingDetails =
    location.state?.shippingDetails || null;

  const selectedPayment =
    PAYMENT_METHODS.find(
      (method) => method.value === selectedMethod
    ) || PAYMENT_METHODS[0];

  const SelectedIcon =
    METHOD_ICONS[selectedPayment.value] || CreditCard;

  const shippingMethod =
    shippingDetails?.shippingMethod || "standard";

  const shippingMethodLabel =
    shippingMethod === "express"
      ? "Express Delivery"
      : "Standard Delivery";

  const handleSelectMethod = (method) => {
    if (isPreparingReview) return;

    setSelectedMethod(method);
    setPaymentError("");
    setShowReview(false);
  };

  const handleContinueToReview = async () => {
    setPaymentError("");

    const validation =
      paymentService.validatePaymentSelection(
        selectedMethod
      );

    if (!validation.valid) {
      setPaymentError(validation.message);
      return;
    }

    setIsPreparingReview(true);

    try {
      await paymentService.preparePaymentReview({
        method: selectedMethod,
        total: subtotal,
      });

      setShowReview(true);
    } catch (error) {
      setPaymentError(
        error?.message ||
          "We could not prepare your payment review. Please try again."
      );
    } finally {
      setIsPreparingReview(false);
    }
  };

  const handlePaymentStep = () => {
    setPaymentError("");
    setShowReview(false);
  };

  if (items.length === 0) {
    return (
      <main className="min-h-[70vh] bg-background">
        <div className="mx-auto flex min-h-[65vh] max-w-xl items-center justify-center px-4 py-16 sm:px-6">
          <div className="w-full rounded-2xl border border-border bg-surface px-6 py-10 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/[0.06] text-primary">
              <ShoppingBag
                size={22}
                strokeWidth={1.8}
                aria-hidden="true"
              />
            </div>

            <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.22em] text-primary">
              Checkout
            </p>

            <h1 className="mt-2 font-heading text-2xl font-medium tracking-tight text-text sm:text-3xl">
              Your shopping bag is empty
            </h1>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-text-muted">
              Add an item from the collection before
              continuing to checkout.
            </p>

            <Link
              to="/shop"
              className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary/20"
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
      {/* Header */}
      <header className="border-b border-border bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-7 sm:px-6 sm:py-8">
          <Link
            to="/cart"
            className="inline-flex items-center gap-2 text-xs font-medium text-text-muted transition-colors hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <ArrowLeft
              size={14}
              aria-hidden="true"
            />
            Back to bag
          </Link>

          <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
                Secure checkout
              </p>

              <h1 className="mt-1.5 font-heading text-3xl font-medium tracking-tight text-text sm:text-4xl">
                Payment
              </h1>

              <p className="mt-2 max-w-lg text-sm leading-6 text-text-muted">
                Select your preferred payment method
                and review your order before placing it.
              </p>
            </div>

            {/* Checkout Steps */}
            <nav
              aria-label="Checkout progress"
              className="flex items-center gap-1.5 sm:gap-2"
            >
              <Link
                to="/checkout"
                state={{ shippingDetails }}
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.08em] text-success transition-colors hover:bg-success/[0.05]"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-success text-white">
                  <Check
                    size={11}
                    strokeWidth={2.5}
                    aria-hidden="true"
                  />
                </span>

                <span className="hidden sm:inline">
                  Shipping
                </span>
              </Link>

              <ChevronRight
                size={13}
                className="text-border"
                aria-hidden="true"
              />

              <button
                type="button"
                onClick={handlePaymentStep}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.08em] transition-colors ${
                  !showReview
                    ? "bg-primary text-primary-foreground"
                    : "text-success hover:bg-success/[0.05]"
                }`}
              >
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-full ${
                    !showReview
                      ? "bg-white/10"
                      : "bg-success text-white"
                  }`}
                >
                  {showReview ? (
                    <Check
                      size={11}
                      strokeWidth={2.5}
                      aria-hidden="true"
                    />
                  ) : (
                    "2"
                  )}
                </span>

                <span className="hidden sm:inline">
                  Payment
                </span>
              </button>

              <ChevronRight
                size={13}
                className="text-border"
                aria-hidden="true"
              />

              <button
                type="button"
                onClick={handleContinueToReview}
                disabled={isPreparingReview}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.08em] transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${
                  showReview
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-surface text-text-muted hover:border-primary/20 hover:text-primary"
                }`}
              >
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-full ${
                    showReview
                      ? "bg-white/10"
                      : "bg-surface-muted"
                  }`}
                >
                  {showReview ? (
                    <Check
                      size={11}
                      strokeWidth={2.5}
                      className="text-white"
                      aria-hidden="true"
                    />
                  ) : (
                    "3"
                  )}
                </span>

                <span className="hidden sm:inline">
                  Review
                </span>
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="mx-auto max-w-6xl px-4 py-7 sm:px-6 sm:py-9">
        <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_350px] lg:items-start">
          <section aria-labelledby="payment-heading">
            {!showReview ? (
              <div className="space-y-5">
                {/* Payment Method */}
                <div className="overflow-hidden rounded-2xl border border-border bg-surface">
                  <div className="border-b border-border px-5 py-5 sm:px-6">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">
                      Step 02
                    </p>

                    <h2
                      id="payment-heading"
                      className="mt-1.5 font-heading text-xl font-medium tracking-tight text-text sm:text-2xl"
                    >
                      Payment method
                    </h2>

                    <p className="mt-1.5 text-sm text-text-muted">
                      Choose how you&apos;d like to pay.
                    </p>
                  </div>

                  <div className="divide-y divide-border">
                    {PAYMENT_METHODS.map((method) => {
                      const isSelected =
                        selectedMethod === method.value;

                      const isPlaceholder =
                        method.status ===
                        PAYMENT_METHOD_STATUS.PLACEHOLDER;

                      const MethodIcon =
                        METHOD_ICONS[method.value] ||
                        CreditCard;

                      return (
                        <button
                          key={method.value}
                          type="button"
                          onClick={() =>
                            handleSelectMethod(
                              method.value
                            )
                          }
                          aria-pressed={isSelected}
                          className={`group w-full px-5 py-5 text-left transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary/20 sm:px-6 ${
                            isSelected
                              ? "bg-primary/[0.025]"
                              : "bg-surface hover:bg-background"
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            {/* Radio */}
                            <span
                              aria-hidden="true"
                              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                                isSelected
                                  ? "border-primary"
                                  : "border-border"
                              }`}
                            >
                              {isSelected && (
                                <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                              )}
                            </span>

                            {/* Icon */}
                            <div className="flex h-10 w-12 shrink-0 items-center justify-center rounded-lg border border-border bg-white">
                              {method.value ===
                                "easypaisa" ? (
                                <img
                                  src={
                                    PAYMENT_LOGO_URLS.easypaisa
                                  }
                                  alt="Easypaisa"
                                  className="max-h-7 w-auto max-w-[42px] object-contain"
                                  loading="lazy"
                                  referrerPolicy="no-referrer"
                                  onError={(
                                    event
                                  ) => {
                                    event.currentTarget.style.display =
                                      "none";
                                    const fallback =
                                      event.currentTarget
                                        .nextElementSibling;

                                    if (fallback) {
                                      fallback.classList.remove(
                                        "hidden"
                                      );
                                    }
                                  }}
                                />
                              ) : method.value ===
                                "jazzcash" ? (
                                <>
                                  <img
                                    src={
                                      PAYMENT_LOGO_URLS.jazzcash
                                    }
                                    alt=""
                                    className="h-7 w-7 object-contain"
                                    loading="lazy"
                                    referrerPolicy="no-referrer"
                                    onError={(
                                      event
                                    ) => {
                                      event.currentTarget.style.display =
                                        "none";
                                      const fallback =
                                        event.currentTarget
                                          .nextElementSibling;

                                      if (fallback) {
                                        fallback.classList.remove(
                                          "hidden"
                                        );
                                      }
                                    }}
                                  />

                                  <span className="hidden text-[9px] font-bold text-text">
                                    JC
                                  </span>
                                </>
                              ) : method.value ===
                                "card" ? (
                                <div className="flex items-center gap-1.5">
                                  <FaCcVisa
                                    size={24}
                                    className="text-[#1A1F71]"
                                    aria-label="Visa"
                                  />

                                  <FaCcMastercard
                                    size={24}
                                    className="text-[#EB001B]"
                                    aria-label="Mastercard"
                                  />
                                </div>
                              ) : (
                                <MethodIcon
                                  size={18}
                                  strokeWidth={1.8}
                                  className={
                                    isSelected
                                      ? "text-primary"
                                      : "text-text-muted"
                                  }
                                  aria-hidden="true"
                                />
                              )}
                            </div>

                            {/* Details */}
                            <div className="min-w-0 flex-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <p className="text-sm font-semibold text-text">
                                  {method.label}
                                </p>

                                {isPlaceholder && (
                                  <span className="rounded-full bg-surface-muted px-2 py-1 text-[8px] font-semibold uppercase tracking-[0.08em] text-text-muted">
                                    Coming soon
                                  </span>
                                )}
                              </div>

                              <p className="mt-1 text-xs leading-5 text-text-muted sm:text-sm">
                                {method.description}
                              </p>

                              {method.value ===
                                "card" && (
                                <p className="mt-1.5 text-[10px] text-text-muted">
                                  Visa and Mastercard accepted
                                </p>
                              )}

                              {method.value ===
                                "cod" && (
                                <p className="mt-1.5 text-[10px] font-medium text-success">
                                  No online payment required
                                </p>
                              )}

                              {method.value ===
                                "easypaisa" && (
                                <p className="mt-1.5 text-[10px] text-text-muted">
                                  Local mobile wallet payment
                                </p>
                              )}

                              {method.value ===
                                "jazzcash" && (
                                <p className="mt-1.5 text-[10px] text-text-muted">
                                  Local mobile wallet payment
                                </p>
                              )}
                            </div>

                            <span
                              className={`shrink-0 text-xs font-semibold ${
                                isSelected
                                  ? "text-primary"
                                  : "text-text-muted opacity-0 transition-opacity group-hover:opacity-100"
                              }`}
                              aria-hidden="true"
                            >
                              ✓
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Delivery */}
                <div className="rounded-2xl border border-border bg-surface">
                  <div className="border-b border-border px-5 py-5 sm:px-6">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/[0.06] text-primary">
                          <Truck
                            size={17}
                            strokeWidth={1.8}
                            aria-hidden="true"
                          />
                        </div>

                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-text-muted">
                            Delivery
                          </p>

                          <h2 className="mt-1 text-sm font-semibold text-text">
                            {shippingMethodLabel}
                          </h2>
                        </div>
                      </div>

                      <Link
                        to="/checkout"
                        state={{ shippingDetails }}
                        className="text-xs font-semibold text-primary hover:text-primary-hover"
                      >
                        Edit
                      </Link>
                    </div>
                  </div>

                  <div className="px-5 py-5 sm:px-6">
                    {shippingDetails ? (
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
                            <p className="mt-2 text-xs text-text-muted">
                              Landmark:{" "}
                              {shippingDetails.landmark}
                            </p>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="rounded-lg bg-background px-4 py-3">
                        <p className="text-xs leading-5 text-text-muted">
                          Please return to Shipping to
                          confirm your delivery details.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Security */}
                <div className="flex items-start gap-3 rounded-xl border border-border bg-surface px-4 py-4">
                  <ShieldCheck
                    size={17}
                    className="mt-0.5 shrink-0 text-success"
                    aria-hidden="true"
                  />

                  <div>
                    <p className="text-sm font-semibold text-text">
                      Secure payment
                    </p>

                    <p className="mt-1 text-xs leading-5 text-text-muted">
                      Card and wallet credentials are not
                      collected or stored on this page. They
                      will only be entered through a real payment
                      provider once connected.
                    </p>
                  </div>
                </div>

                {/* Error */}
                {paymentError && (
                  <div
                    role="alert"
                    className="rounded-xl border border-danger/20 bg-danger/[0.04] px-4 py-3.5"
                  >
                    <p className="text-sm font-medium text-danger">
                      {paymentError}
                    </p>
                  </div>
                )}

                {/* CTA */}
                <button
                  type="button"
                  onClick={handleContinueToReview}
                  disabled={isPreparingReview}
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isPreparingReview ? (
                    <>
                      <LoaderCircle
                        size={16}
                        className="animate-spin"
                        aria-hidden="true"
                      />
                      Preparing review...
                    </>
                  ) : (
                    <>
                      Continue to Review
                      <ArrowRight
                        size={15}
                        aria-hidden="true"
                      />
                    </>
                  )}
                </button>
              </div>
            ) : (
              /* Review */
              <div className="space-y-5">
                <div className="rounded-2xl border border-border bg-surface">
                  <div className="border-b border-border px-5 py-5 sm:px-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-success">
                          Step 03
                        </p>

                        <h2 className="mt-1.5 font-heading text-xl font-medium tracking-tight text-text sm:text-2xl">
                          Review your order
                        </h2>

                        <p className="mt-1.5 text-sm leading-6 text-text-muted">
                          Check your payment and delivery
                          details before the order is finalized.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={handlePaymentStep}
                        className="text-xs font-semibold text-primary hover:text-primary-hover"
                      >
                        Change
                      </button>
                    </div>
                  </div>

                  <div className="divide-y divide-border">
                    <div className="px-5 py-5 sm:px-6">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-text-muted">
                        Payment method
                      </p>

                      <div className="mt-3 flex items-center gap-3">
                        <div className="flex h-10 w-12 items-center justify-center rounded-lg border border-border bg-white">
                          <SelectedIcon
                            size={18}
                            strokeWidth={1.8}
                            className="text-primary"
                            aria-hidden="true"
                          />
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-text">
                            {selectedPayment.label}
                          </p>

                          <p className="mt-1 text-xs text-text-muted">
                            {selectedMethod === "cod"
                              ? "Pay when your order arrives."
                              : "Payment gateway placeholder. No transaction has been processed."}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="px-5 py-5 sm:px-6">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-text-muted">
                            Delivery
                          </p>

                          <p className="mt-1 text-sm font-semibold text-text">
                            {shippingMethodLabel}
                          </p>
                        </div>

                        <Link
                          to="/checkout"
                          state={{ shippingDetails }}
                          className="text-xs font-semibold text-primary hover:text-primary-hover"
                        >
                          Edit
                        </Link>
                      </div>

                      {shippingDetails && (
                        <div className="mt-4 flex items-start gap-3">
                          <MapPin
                            size={16}
                            className="mt-0.5 shrink-0 text-primary"
                            aria-hidden="true"
                          />

                          <p className="text-sm leading-6 text-text">
                            {shippingDetails.address}
                            <br />
                            {shippingDetails.area}
                            <br />
                            {shippingDetails.city}
                            {shippingDetails.postalCode
                              ? `, ${shippingDetails.postalCode}`
                              : ""}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="px-5 py-5 sm:px-6">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-text-muted">
                        Items
                      </p>

                      <div className="mt-4 divide-y divide-border border-y border-border">
                        {items.map((item) => (
                          <div
                            key={`${item.productId}-${item.size}-${item.color}`}
                            className="flex gap-3 py-4"
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
                              <p className="text-sm font-semibold text-text">
                                {item.name}
                              </p>

                              {(item.size ||
                                item.color) && (
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
                    </div>

                    <div className="px-5 py-5 sm:px-6">
                      <div className="flex items-start gap-3 rounded-xl bg-background px-4 py-4">
                        <ShieldCheck
                          size={16}
                          className="mt-0.5 shrink-0 text-success"
                          aria-hidden="true"
                        />

                        <p className="text-xs leading-5 text-text-muted">
                          Your checkout details are ready. No
                          real online payment has been processed
                          on this screen.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handlePaymentStep}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-border bg-surface px-5 py-3 text-sm font-semibold text-text transition-colors hover:bg-surface-muted focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <ArrowLeft
                    size={15}
                    aria-hidden="true"
                  />
                  Back to Payment
                </button>
              </div>
            )}
          </section>

          {/* Order Summary */}
          <aside className="overflow-hidden rounded-2xl border border-border bg-surface lg:sticky lg:top-28">
            <div className="border-b border-border px-5 py-5 sm:px-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">
                Order summary
              </p>

              <h2 className="mt-1.5 font-heading text-xl font-medium tracking-tight text-text">
                Your order
              </h2>
            </div>

            <div className="divide-y divide-border">
              <div className="space-y-4 px-5 py-5 sm:px-6">
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
                      <p className="line-clamp-2 text-sm font-semibold text-text">
                        {item.name}
                      </p>

                      {(item.size || item.color) && (
                        <p className="mt-1 text-[10px] text-text-muted">
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

              <div className="space-y-3 px-5 py-5 sm:px-6">
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

                  <span className="text-xs font-medium text-text-muted">
                    Confirmed at checkout
                  </span>
                </div>

                <div className="border-t border-border pt-4">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-text">
                        Total
                      </p>

                      <p className="mt-1 text-[10px] text-text-muted">
                        PKR
                      </p>
                    </div>

                    <p className="text-xl font-semibold tracking-tight text-text">
                      Rs. {subtotal.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-background px-5 py-4 sm:px-6">
                <div className="flex items-start gap-2.5">
                  <LockKeyhole
                    size={14}
                    className="mt-0.5 shrink-0 text-text-muted"
                    aria-hidden="true"
                  />

                  <p className="text-[10px] leading-5 text-text-muted">
                    Your payment credentials are never stored
                    in this frontend checkout.
                  </p>
                </div>
              </div>

              <div className="px-5 py-5 sm:px-6">
                <div className="flex items-center gap-2 text-[10px] font-medium text-text-muted">
                  <Package
                    size={14}
                    aria-hidden="true"
                  />
                  <span>
                    {shippingMethodLabel}
                  </span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default Payment;