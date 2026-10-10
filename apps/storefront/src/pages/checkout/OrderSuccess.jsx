import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  CheckCircle2,
  Home,
  MapPin,
  Package,
  ShieldCheck,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import { getOrderById } from "../../data/mock/orders";

const ORDER_PROGRESS_STEPS = [
  { status: "pending", label: "Order placed" },
  { status: "confirmed", label: "Confirmed" },
  { status: "processing", label: "Preparing" },
  { status: "shipped", label: "Dispatched" },
  { status: "delivered", label: "Delivered" },
];

const normalizeStatus = (value) =>
  String(value || "pending")
    .trim()
    .toLowerCase()
    .replace(/[\s_-]+/g, "");

const formatCurrency = (amount) =>
  `Rs. ${Number(amount || 0).toLocaleString("en-PK")}`;

const formatDate = (date) => {
  if (!date) return "Date unavailable";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Date unavailable";
  }

  return parsedDate.toLocaleString("en-PK", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

const formatLabel = (value) => {
  if (!value) return "Not available";

  return String(value)
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
};

const getOrderStatusClass = (status) => {
  switch (normalizeStatus(status)) {
    case "delivered":
      return "border-emerald-200 bg-emerald-50 text-emerald-800";

    case "shipped":
      return "border-sky-200 bg-sky-50 text-sky-800";

    case "confirmed":
      return "border-primary/20 bg-primary/10 text-primary";

    case "processing":
      return "border-amber-200 bg-amber-50 text-amber-800";

    case "cancelled":
    case "returned":
      return "border-rose-200 bg-rose-50 text-rose-800";

    default:
      return "border-border bg-surface-muted text-text-muted";
  }
};

const getPaymentStatusClass = (status) => {
  switch (normalizeStatus(status)) {
    case "paid":
    case "completed":
      return "text-emerald-700";

    case "failed":
    case "refunded":
      return "text-rose-700";

    case "pending":
      return "text-amber-700";

    default:
      return "text-text";
  }
};

const getPaymentMethodLabel = (method) =>
  normalizeStatus(method) === "cod"
    ? "Cash on Delivery"
    : formatLabel(method);

const getOrderStatusMessage = (status) => {
  switch (normalizeStatus(status)) {
    case "pending":
      return "Your order has been received and is awaiting confirmation.";

    case "confirmed":
      return "Your order is confirmed and ready for the next stage.";

    case "processing":
      return "Your items are being prepared. Check back for recorded updates.";

    case "shipped":
      return "Your order has been dispatched. Courier details will appear when available.";

    case "delivered":
      return "Your order has been marked as delivered. Thank you for shopping with us.";

    case "cancelled":
      return "This order has been cancelled. Contact customer support if you need assistance.";

    case "returned":
      return "This order has been marked as returned. Refer to your order details for more information.";

    default:
      return "Your latest saved order status is shown below.";
  }
};

function SectionHeading({ eyebrow, title, trailing }) {
  return (
    <div className="flex items-end justify-between gap-3 border-b border-border pb-4">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
          {eyebrow}
        </p>

        <h2 className="mt-2 font-heading text-xl font-normal tracking-tight text-text sm:text-2xl">
          {title}
        </h2>
      </div>

      {trailing}
    </div>
  );
}

function OrderSuccess() {
  const location = useLocation();
  const orderId = location.state?.orderId || null;
  const order = orderId ? getOrderById(orderId) : null;

  if (!order) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-background px-4 py-12 sm:px-6">
        <section className="w-full max-w-xl rounded-2xl border border-border bg-surface px-5 py-10 text-center shadow-sm sm:px-8 sm:py-12">
          <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-surface-muted text-text-muted">
            <Package size={25} strokeWidth={1.6} />
          </div>

          <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.24em] text-primary">
            Bajwa&apos;s Collection
          </p>

          <h1 className="mt-3 font-heading text-2xl font-normal tracking-tight text-text sm:text-3xl">
            Order details unavailable
          </h1>

          <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-text-muted">
            We couldn&apos;t find the order associated with this page. Check
            your saved orders or continue exploring our collection.
          </p>

          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/account/orders"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              View my orders
              <ArrowRight size={16} />
            </Link>

            <Link
              to="/shop"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-text transition-colors hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <ShoppingBag size={16} />
              Explore collection
            </Link>
          </div>

          <Link
            to="/"
            className="mt-6 inline-flex items-center gap-2 text-xs font-medium text-text-muted transition-colors hover:text-primary"
          >
            <Home size={14} />
            Back to home
          </Link>
        </section>
      </main>
    );
  }

  const items = Array.isArray(order.items) ? order.items : [];
  const customer = order.customer || {};
  const shippingAddress = order.shippingAddress || {};

  const status = normalizeStatus(order.status);
  const orderNumber = order.orderNumber || order.id;

  const isCancelled = status === "cancelled";
  const isReturned = status === "returned";
  const isDelivered = status === "delivered";
  const isClosed = isCancelled || isReturned;

  const currentStatusIndex = ORDER_PROGRESS_STEPS.findIndex(
    (step) => step.status === status,
  );

  const calculatedSubtotal = items.reduce(
    (sum, item) =>
      sum + Number(item.price || 0) * Number(item.quantity || 0),
    0,
  );

  const subtotal = Number(order.subtotal ?? calculatedSubtotal);
  const shippingFee = Number(order.shippingFee || 0);
  const total = Number(order.total ?? subtotal + shippingFee);

  const addressLines = [
    shippingAddress.address,
    shippingAddress.city,
    shippingAddress.state,
    shippingAddress.postalCode,
    shippingAddress.country,
  ].filter(Boolean);

  const itemCount = items.reduce(
    (sum, item) => sum + Math.max(0, Number(item.quantity) || 0),
    0,
  );

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
        {/* Store header */}
        <header className="mb-6 flex items-center justify-between gap-4 border-b border-border pb-4">
          <Link
            to="/"
            className="font-heading text-lg font-medium tracking-wide text-text transition-colors hover:text-primary"
          >
            Bajwa&apos;s Collection
          </Link>

          <Link
            to="/account/orders"
            className="inline-flex items-center gap-2 text-xs font-medium text-text-muted transition-colors hover:text-primary"
          >
            <ArrowLeft size={14} />
            My orders
          </Link>
        </header>

        {/* Compact order confirmation */}
        <section className="relative isolate mx-auto max-w-4xl overflow-hidden rounded-2xl border border-border/80 bg-surface shadow-[0_12px_35px_rgba(0,0,0,0.04)]">
          {/* Burgundy accent */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-transparent via-primary/80 to-transparent"
          />

          {/* Soft background glow */}
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute left-1/2 top-0 -z-10 h-40 w-64 -translate-x-1/2 rounded-full blur-3xl ${
              isClosed ? "bg-rose-100/40" : "bg-emerald-100/40"
            }`}
          />

          <div className="mx-auto flex max-w-xl flex-col items-center px-5 py-8 text-center sm:px-8 sm:py-10">
            {/* Animated success icon */}
            <div
              role="img"
              aria-label={
                isCancelled
                  ? "Order cancelled"
                  : isReturned
                    ? "Order returned"
                    : "Order placed successfully"
              }
              className={`rani-success-pop relative flex size-20 items-center justify-center rounded-full border shadow-sm ring-4 ${
                isClosed
                  ? "border-rose-200 bg-linear-to-br from-rose-50 to-white text-rose-600 ring-rose-50/70"
                  : "border-emerald-200 bg-linear-to-br from-emerald-50 to-white text-emerald-600 ring-emerald-50/80"
              }`}
            >
              <span
                aria-hidden="true"
                className={`absolute inset-2 rounded-full border ${
                  isClosed ? "border-rose-200/70" : "border-emerald-200/70"
                }`}
              />

              {isClosed ? (
                <Package
                  size={34}
                  strokeWidth={1.8}
                  aria-hidden="true"
                  className="relative"
                />
              ) : (
                <Check
                  size={40}
                  strokeWidth={3}
                  aria-hidden="true"
                  className="rani-success-check relative"
                />
              )}
            </div>

            {/* Eyebrow label */}
            <p
              className={`mt-5 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] ${
                isClosed
                  ? "border-rose-200/80 bg-rose-50/80 text-rose-700"
                  : "border-emerald-200/80 bg-emerald-50/80 text-emerald-700"
              }`}
            >
              {!isClosed && (
                <CheckCircle2
                  size={12}
                  strokeWidth={2.5}
                  aria-hidden="true"
                />
              )}

              {isCancelled
                ? "Order cancelled"
                : isReturned
                  ? "Order returned"
                  : "Order confirmation"}
            </p>

            {/* Main heading */}
            <h1 className="mt-3 text-2xl font-semibold leading-tight tracking-tight text-text sm:text-3xl">
              {isCancelled
                ? "Your order was cancelled"
                : isReturned
                  ? "Your order was returned"
                  : "Order Placed Successfully!"}
            </h1>

            <p className="mt-3 max-w-md text-xs leading-6 text-text-muted sm:text-sm">
              {isClosed
                ? getOrderStatusMessage(order.status)
                : "Thank you for shopping with Bajwa’s Collection. Your order details are saved below."}
            </p>

            {/* Order information */}
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
              <span className="inline-flex min-h-8 items-center gap-2 rounded-full border border-border/80 bg-background/70 px-3 py-1.5 text-xs text-text-muted">
                <CalendarDays
                  size={14}
                  className="shrink-0 text-primary"
                  aria-hidden="true"
                />
                {formatDate(order.createdAt)}
              </span>

              <span className="inline-flex min-h-8 items-center gap-2 rounded-full border border-border/80 bg-background/70 px-3 py-1.5 text-xs text-text-muted">
                <ShoppingBag
                  size={14}
                  className="shrink-0 text-primary"
                  aria-hidden="true"
                />
                {itemCount} {itemCount === 1 ? "item" : "items"}
              </span>
            </div>

            {/* Order reference */}
            <div className="mt-6 w-full max-w-md rounded-xl border border-border/80 bg-background/60 px-4 py-4 sm:px-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-text-muted">
                Your order number
              </p>

              <p className="mt-2 break-all text-lg font-semibold tracking-wide text-text sm:text-xl">
                {orderNumber}
              </p>

              <div className="mt-3 flex flex-col items-center gap-1.5">
                <span className="text-[11px] text-text-muted">
                  Current order status
                </span>

                <span
                  className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${getOrderStatusClass(
                    order.status,
                  )}`}
                >
                  <span
                    aria-hidden="true"
                    className="size-1.5 rounded-full bg-current"
                  />
                  {formatLabel(order.status)}
                </span>
              </div>
            </div>

            {/* Primary actions */}
            <div className="mt-5 flex w-full max-w-md flex-col gap-2.5 sm:flex-row">
              {!isClosed && (
                <Link
                  to={`/account/orders/${encodeURIComponent(order.id)}`}
                  className="group inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-[background-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  <Truck size={16} aria-hidden="true" />
                  Track Your Order
                  <ArrowRight
                    size={15}
                    aria-hidden="true"
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </Link>
              )}

              <Link
                to="/shop"
                className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-lg border border-border bg-surface px-4 py-2.5 text-sm font-semibold text-text transition-[background-color,border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                <ShoppingBag size={15} aria-hidden="true" />
                Continue Shopping
              </Link>
            </div>

            {/* Reassurance note */}
            {!isClosed && (
              <p className="mt-4 flex items-center justify-center gap-2 text-[11px] text-text-muted">
                <ShieldCheck
                  size={14}
                  className="shrink-0 text-emerald-600"
                  aria-hidden="true"
                />
                Your order information is available in your account.
              </p>
            )}
          </div>
        </section>

        {/* Order progress */}
        <section className="mt-5 rounded-xl border border-border bg-surface p-5 sm:p-7">
          <SectionHeading
            eyebrow="Order updates"
            title={
              isCancelled
                ? "This order was cancelled"
                : isReturned
                  ? "This order was returned"
                  : isDelivered
                    ? "Your order has arrived"
                    : "Your order journey"
            }
          />

          <p className="mt-4 text-sm leading-6 text-text-muted">
            {getOrderStatusMessage(order.status)}
          </p>

          {!isClosed && (
            <div className="mt-7">
              <div
                className="grid grid-cols-5 gap-1.5"
                role="img"
                aria-label={`Order progress: ${formatLabel(order.status)}`}
              >
                {ORDER_PROGRESS_STEPS.map((step, index) => {
                  const isComplete =
                    currentStatusIndex >= 0 &&
                    index <= currentStatusIndex;

                  return (
                    <div
                      key={step.status}
                      className={`h-1.5 rounded-full transition-colors ${
                        isComplete ? "bg-primary" : "bg-border"
                      }`}
                    />
                  );
                })}
              </div>

              <div className="mt-3 grid grid-cols-5 gap-1.5">
                {ORDER_PROGRESS_STEPS.map((step, index) => {
                  const isCurrent = step.status === status;
                  const isComplete =
                    currentStatusIndex >= 0 &&
                    index <= currentStatusIndex;

                  return (
                    <div key={step.status} className="min-w-0">
                      <p
                        className={`text-[9px] leading-4 sm:text-xs ${
                          isCurrent
                            ? "font-semibold text-primary"
                            : isComplete
                              ? "font-medium text-text"
                              : "text-text-muted"
                        }`}
                      >
                        {step.label}
                      </p>

                      {isCurrent && (
                        <p className="mt-1 text-[9px] font-medium text-primary sm:text-[10px]">
                          Current stage
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="mt-5 flex items-start gap-2 border-t border-border pt-4 text-xs leading-5 text-text-muted">
                <ShieldCheck
                  size={16}
                  className="mt-0.5 shrink-0 text-primary"
                  aria-hidden="true"
                />

                <p>
                  This progress reflects the status currently saved for your
                  order. Courier tracking and delivery estimates will appear
                  when that information becomes available.
                </p>
              </div>
            </div>
          )}
        </section>

        {/* Products and delivery */}
        <div className="mt-5 grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="min-w-0 space-y-5">
            {/* Ordered products */}
            <section className="rounded-xl border border-border bg-surface p-5 sm:p-7">
              <SectionHeading
                eyebrow="Your selection"
                title="Order items"
                trailing={
                  <span className="pb-1 text-xs text-text-muted">
                    {items.length}{" "}
                    {items.length === 1 ? "product" : "products"}
                  </span>
                }
              />

              {items.length > 0 ? (
                <div className="divide-y divide-border">
                  {items.map((item, index) => (
                    <article
                      key={`${item.productId || item.name || "product"}-${index}`}
                      className="flex gap-4 py-5 last:pb-0"
                    >
                      <div className="h-28 w-[84px] shrink-0 overflow-hidden rounded-md bg-surface-muted sm:h-32 sm:w-24">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name || "Ordered product"}
                            loading={index > 1 ? "lazy" : "eager"}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-text-muted">
                            <ShoppingBag size={24} strokeWidth={1.4} />
                          </div>
                        )}
                      </div>

                      <div className="flex min-w-0 flex-1 flex-col justify-center">
                        <h3 className="text-sm font-medium leading-5 text-text sm:text-base">
                          {item.name || "Product"}
                        </h3>

                        {(item.size || item.color) && (
                          <p className="mt-1.5 text-xs leading-5 text-text-muted">
                            {item.size && `Size: ${item.size}`}
                            {item.size && item.color && " · "}
                            {item.color && `Color: ${item.color}`}
                          </p>
                        )}

                        <p className="mt-1.5 text-xs text-text-muted">
                          Quantity: {Number(item.quantity || 0)}
                        </p>

                        <p className="mt-3 text-sm font-semibold text-text">
                          {formatCurrency(
                            Number(item.price || 0) *
                              Number(item.quantity || 0),
                          )}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <p className="py-6 text-sm leading-6 text-text-muted">
                  Product details are not available for this order.
                </p>
              )}
            </section>

            {/* Delivery information */}
            <section className="rounded-xl border border-border bg-surface p-5 sm:p-7">
              <SectionHeading
                eyebrow="Shipping destination"
                title="Delivery details"
              />

              <div className="mt-5 flex items-start gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <MapPin size={19} aria-hidden="true" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-text">
                    {customer.name || "Customer"}
                  </p>

                  {customer.phone && (
                    <p className="mt-1.5 text-sm text-text-muted">
                      {customer.phone}
                    </p>
                  )}

                  {customer.email && (
                    <p className="mt-1 break-words text-sm text-text-muted">
                      {customer.email}
                    </p>
                  )}

                  <p className="mt-3 text-sm leading-6 text-text-muted">
                    {addressLines.length > 0
                      ? addressLines.join(", ")
                      : "Shipping address unavailable"}
                  </p>

                  {shippingAddress.shippingMethod && (
                    <p className="mt-4 border-t border-border pt-3 text-xs text-text-muted">
                      Shipping method:{" "}
                      <span className="font-medium text-text">
                        {formatLabel(shippingAddress.shippingMethod)}
                      </span>
                    </p>
                  )}
                </div>
              </div>
            </section>
          </div>

          {/* Payment summary */}
          <aside className="min-w-0 space-y-5 lg:sticky lg:top-6">
            <section className="rounded-xl border border-border bg-surface p-5 sm:p-6">
              <SectionHeading
                eyebrow="Your purchase"
                title="Payment summary"
              />

              <div className="mt-5 space-y-4">
                <div className="flex justify-between gap-4 text-sm">
                  <span className="text-text-muted">Subtotal</span>

                  <span className="text-right font-medium text-text">
                    {formatCurrency(subtotal)}
                  </span>
                </div>

                <div className="flex justify-between gap-4 text-sm">
                  <span className="text-text-muted">Delivery</span>

                  <span className="text-right font-medium text-text">
                    {shippingFee === 0
                      ? "Free"
                      : formatCurrency(shippingFee)}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4 border-t border-border pt-4">
                  <span className="font-semibold text-text">Total</span>

                  <span className="text-xl font-semibold tracking-tight text-text">
                    {formatCurrency(total)}
                  </span>
                </div>
              </div>

              <div className="mt-5 space-y-4 border-t border-border pt-4">
                <div>
                  <p className="text-xs text-text-muted">Payment method</p>

                  <p className="mt-1.5 text-sm font-medium text-text">
                    {getPaymentMethodLabel(order.paymentMethod)}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-text-muted">Payment status</p>

                  <p
                    className={`mt-1.5 text-sm font-semibold ${getPaymentStatusClass(
                      order.paymentStatus,
                    )}`}
                  >
                    {formatLabel(order.paymentStatus)}
                  </p>
                </div>

                {normalizeStatus(order.paymentMethod) === "cod" && (
                  <p className="border-t border-border pt-3 text-xs leading-5 text-text-muted">
                    Please prepare the payable amount for delivery. Payment
                    is not considered completed until the saved payment
                    status confirms it.
                  </p>
                )}
              </div>
            </section>

            {/* Order shortcuts */}
            <section className="rounded-xl border border-border bg-surface p-5 sm:p-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">
                Order assistance
              </p>

              <h2 className="mt-2 font-heading text-xl font-normal text-text">
                Your order, all in one place.
              </h2>

              <p className="mt-2 text-sm leading-6 text-text-muted">
                Review your saved order status, delivery information and
                payment details whenever you need them.
              </p>

              {!isClosed && (
                <Link
                  to={`/account/orders/${encodeURIComponent(order.id)}`}
                  className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  <Truck size={16} aria-hidden="true" />
                  Track your order
                  <ArrowRight size={15} aria-hidden="true" />
                </Link>
              )}

              <Link
                to="/account/orders"
                className="mt-3 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-text transition-colors hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <Package size={15} aria-hidden="true" />
                View all orders
              </Link>

              <Link
                to="/shop"
                className="mt-4 inline-flex min-h-10 w-full items-center justify-center gap-2 text-xs font-semibold text-text-muted transition-colors hover:text-primary"
              >
                <ShoppingBag size={14} aria-hidden="true" />
                Continue shopping
              </Link>
            </section>
          </aside>
        </div>

        {/* Footer */}
        <footer className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-border pt-5 text-center sm:flex-row sm:text-left">
          <div>
            <Link
              to="/"
              className="font-heading text-base font-medium text-text transition-colors hover:text-primary"
            >
              Bajwa&apos;s Collection
            </Link>

            <p className="mt-1 text-xs text-text-muted">
              Thoughtfully selected. Beautifully yours.
            </p>
          </div>

          <Link
            to="/"
            className="inline-flex min-h-10 items-center gap-2 text-xs font-semibold text-text-muted transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <Home size={14} />
            Back to home
          </Link>
        </footer>
      </div>
    </main>
  );
}

export default OrderSuccess;