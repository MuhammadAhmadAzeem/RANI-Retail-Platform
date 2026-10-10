import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  MapPin,
  Package,
  PackageCheck,
  PackageSearch,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

import {
  getOrderById,
  ORDER_STATUS_STEPS,
  ORDER_STATUSES,
} from "../../data/mock/orders";

const formatCurrency = (amount) =>
  `Rs. ${Number(amount || 0).toLocaleString("en-PK", {
    maximumFractionDigits: 2,
  })}`;

const formatDateTime = (date) => {
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

const normalizeStatus = (status) =>
  String(status || "").trim().toLowerCase();

const getStatusDescription = (status) => {
  const descriptions = {
    [normalizeStatus(ORDER_STATUSES.PENDING)]:
      "Your order has been placed and is awaiting confirmation.",
    [normalizeStatus(ORDER_STATUSES.CONFIRMED)]:
      "Your order has been confirmed.",
    [normalizeStatus(ORDER_STATUSES.PROCESSING)]:
      "Your order is being prepared for dispatch.",
    [normalizeStatus(ORDER_STATUSES.SHIPPED)]:
      "Your order has been dispatched.",
    [normalizeStatus(ORDER_STATUSES.DELIVERED)]:
      "Your order has been delivered.",
  };

  return (
    descriptions[normalizeStatus(status)] ||
    "The recorded status for this order."
  );
};

function OrderDetails() {
  const { orderId } = useParams();
  const order = orderId ? getOrderById(orderId) : null;

  if (!order) {
    return (
      <section className="min-w-0">
        <div className="border-b border-border pb-7">
          <Link
            to="/account/orders"
            className="inline-flex min-h-9 items-center gap-2 text-xs font-semibold text-text-muted transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
          >
            <ArrowLeft size={15} aria-hidden="true" />
            Back to orders
          </Link>

          <div className="mt-6">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-primary">
              Order information
            </p>

            <h1 className="mt-2 font-heading text-3xl font-medium tracking-tight text-text sm:text-4xl">
              Order details
            </h1>
          </div>
        </div>

        <div className="py-14 text-center sm:py-20">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-primary/10 bg-primary/[0.045] text-primary">
            <PackageSearch
              size={32}
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </div>

          <p className="mt-7 text-[10px] font-semibold uppercase tracking-[0.22em] text-primary">
            Order not found
          </p>

          <h2 className="mt-3 font-heading text-2xl font-medium tracking-tight text-text sm:text-3xl">
            We couldn&apos;t find this order.
          </h2>

          <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-text-muted">
            This order may not be saved in this browser, or its
            details may no longer be available. Open your order
            history to select a saved order.
          </p>

          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/account/orders"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
            >
              View Orders
              <ArrowRight size={15} aria-hidden="true" />
            </Link>

            <Link
              to="/shop"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-border bg-surface px-6 py-3 text-sm font-semibold text-text transition-colors hover:border-primary/25 hover:bg-surface-muted hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
            >
              <ShoppingBag size={15} aria-hidden="true" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const orderStatus = normalizeStatus(order.status);

  const statusIndex = ORDER_STATUS_STEPS.findIndex(
    (status) => normalizeStatus(status) === orderStatus,
  );

  const isCancelled =
    orderStatus === normalizeStatus(ORDER_STATUSES.CANCELLED);

  const isReturned =
    orderStatus === normalizeStatus(ORDER_STATUSES.RETURNED);

  const isDelivered =
    orderStatus === normalizeStatus(ORDER_STATUSES.DELIVERED);

  const isTerminal = isCancelled || isReturned;
  const isKnownStatus = statusIndex !== -1 || isTerminal;

  const items = Array.isArray(order.items) ? order.items : [];

  const timeline = Array.isArray(order.timeline)
    ? order.timeline
    : [];

  const shippingAddress = order.shippingAddress || {};
  const customer = order.customer || {};

  const itemCount =
    order.itemCount ??
    items.reduce(
      (total, item) => total + Math.max(0, Number(item.quantity) || 0),
      0,
    );

  const subtotal = Number(
    order.subtotal ?? order.total ?? 0,
  );

  const shippingFee = Math.max(
    0,
    Number(order.shippingFee) || 0,
  );

  const orderTotal = Number(order.total) || 0;

  return (
    <section className="min-w-0">
      {/* Order header */}
      <header className="border-b border-border pb-7">
        <Link
          to="/account/orders"
          className="inline-flex min-h-9 items-center gap-2 text-xs font-semibold text-text-muted transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
        >
          <ArrowLeft size={15} aria-hidden="true" />
          Back to orders
        </Link>

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-primary">
              Order information
            </p>

            <h1 className="mt-2 font-heading text-3xl font-medium tracking-tight text-text sm:text-4xl">
              Order details
            </h1>

            <p className="mt-3 break-words text-sm text-text-muted">
              Order #{order.orderNumber || order.id}
            </p>

            <p className="mt-2 flex items-center gap-1.5 text-xs text-text-muted">
              <CalendarDays size={14} aria-hidden="true" />
              Placed on {formatDateTime(order.createdAt)}
            </p>
          </div>

          <span className="inline-flex w-fit shrink-0 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
            {formatLabel(order.status)}
          </span>
        </div>
      </header>

      {/* Order tracking */}
      <section
        aria-labelledby="order-tracking-heading"
        className="mt-7 rounded-2xl border border-border bg-surface p-5 sm:p-6"
      >
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            {isTerminal ? (
              <PackageSearch size={21} aria-hidden="true" />
            ) : isDelivered ? (
              <PackageCheck size={21} aria-hidden="true" />
            ) : (
              <Truck size={21} aria-hidden="true" />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <h2
              id="order-tracking-heading"
              className="text-base font-semibold text-text"
            >
              {isCancelled
                ? "This order has been cancelled"
                : isReturned
                  ? "This order has been returned"
                  : isDelivered
                    ? "Your order has been delivered"
                    : isKnownStatus
                      ? "Order tracking"
                      : "Order status unavailable"}
            </h2>

            <p className="mt-1 text-sm leading-6 text-text-muted">
              {isCancelled
                ? "This order was cancelled. Contact customer support if you need assistance."
                : isReturned
                  ? "This order is marked as returned. Contact customer support if you need further information."
                  : isDelivered
                    ? "Your order is marked as delivered in the saved order record."
                    : isKnownStatus
                      ? "Follow the recorded order progress below."
                      : "The saved order contains an unrecognized status. Check your order history or contact customer support."}
            </p>
          </div>
        </div>

        {!isTerminal && (
          <div className="mt-7 space-y-5">
            {ORDER_STATUS_STEPS.map((status, index) => {
              const isComplete =
                statusIndex >= 0 && index <= statusIndex;

              const isCurrent =
                statusIndex >= 0 && index === statusIndex;

              const isFuture =
                statusIndex < 0 || index > statusIndex;

              return (
                <div key={status} className="flex gap-3">
                  <div className="flex shrink-0 flex-col items-center">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full ${
                        isComplete
                          ? "bg-primary text-primary-foreground"
                          : "border border-border bg-background text-text-muted"
                      }`}
                    >
                      {isComplete ? (
                        <CheckCircle2
                          size={17}
                          aria-hidden="true"
                        />
                      ) : (
                        <Clock3 size={16} aria-hidden="true" />
                      )}
                    </div>

                    {index < ORDER_STATUS_STEPS.length - 1 && (
                      <div
                        aria-hidden="true"
                        className={`mt-1 min-h-5 w-px flex-1 ${
                          isComplete
                            ? "bg-primary/40"
                            : "bg-border"
                        }`}
                      />
                    )}
                  </div>

                  <div className="min-w-0 flex-1 pb-3">
                    <p
                      className={`text-sm font-semibold ${
                        isCurrent ? "text-primary" : "text-text"
                      }`}
                    >
                      {formatLabel(status)}

                      {isCurrent && (
                        <span className="ml-2 inline-block text-xs font-normal text-text-muted">
                          Current status
                        </span>
                      )}
                    </p>

                    <p className="mt-1 text-xs leading-5 text-text-muted">
                      {isFuture && !isKnownStatus
                        ? "Progress is unavailable until the order status is verified."
                        : getStatusDescription(status)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Order items */}
      <section className="mt-7">
        <div className="mb-4 flex items-center gap-2">
          <Package
            size={18}
            className="text-primary"
            aria-hidden="true"
          />

          <h2 className="text-lg font-semibold text-text">
            Items ({itemCount})
          </h2>
        </div>

        <div className="divide-y divide-border rounded-2xl border border-border bg-surface px-4 sm:px-5">
          {items.length > 0 ? (
            items.map((item, index) => (
              <div
                key={`${item.productId || item.name || "item"}-${index}`}
                className="flex gap-4 py-4"
              >
                <div className="h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-surface-muted">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name || "Ordered product"}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-text-muted">
                      <ShoppingBag size={22} aria-hidden="true" />
                    </div>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="break-words text-sm font-semibold text-text">
                    {item.name || "Product"}
                  </h3>

                  {(item.size || item.color) && (
                    <p className="mt-1 text-xs text-text-muted">
                      {item.size && `Size: ${item.size}`}
                      {item.size && item.color && " · "}
                      {item.color && `Color: ${item.color}`}
                    </p>
                  )}

                  <p className="mt-1 text-xs text-text-muted">
                    Quantity: {Math.max(0, Number(item.quantity) || 0)}
                  </p>

                  <p className="mt-2 text-sm font-semibold text-text">
                    {formatCurrency(
                      (Number(item.price) || 0) *
                        Math.max(0, Number(item.quantity) || 0),
                    )}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="py-8 text-center text-sm text-text-muted">
              No item details are available for this order.
            </p>
          )}
        </div>
      </section>

      {/* Delivery and payment */}
      <div className="mt-7 grid gap-5 lg:grid-cols-2">
        <section className="rounded-2xl border border-border bg-surface p-5">
          <div className="flex items-center gap-2">
            <MapPin
              size={18}
              className="text-primary"
              aria-hidden="true"
            />

            <h2 className="text-base font-semibold text-text">
              Delivery information
            </h2>
          </div>

          <div className="mt-4 space-y-2 text-sm">
            <p className="font-medium text-text">
              {customer.name || "Customer"}
            </p>

            {customer.phone && (
              <p className="break-words text-text-muted">
                {customer.phone}
              </p>
            )}

            {customer.email && (
              <p className="break-words text-text-muted">
                {customer.email}
              </p>
            )}

            <p className="break-words leading-6 text-text-muted">
              {[
                shippingAddress.address,
                shippingAddress.city,
                shippingAddress.state,
                shippingAddress.postalCode,
                shippingAddress.country,
              ]
                .filter(Boolean)
                .join(", ") || "Shipping address unavailable"}
            </p>

            <p className="pt-1 text-xs text-text-muted">
              Shipping method:{" "}
              {formatLabel(shippingAddress.shippingMethod)}
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-surface p-5">
          <div className="flex items-center gap-2">
            <PackageCheck
              size={18}
              className="text-primary"
              aria-hidden="true"
            />

            <h2 className="text-base font-semibold text-text">
              Payment summary
            </h2>
          </div>

          <div className="mt-4 space-y-3 text-sm">
            <div className="flex items-center justify-between gap-3">
              <span className="text-text-muted">Subtotal</span>
              <span className="text-right font-medium text-text">
                {formatCurrency(subtotal)}
              </span>
            </div>

            <div className="flex items-center justify-between gap-3">
              <span className="text-text-muted">Shipping</span>
              <span className="text-right font-medium text-text">
                {shippingFee === 0
                  ? "Free"
                  : formatCurrency(shippingFee)}
              </span>
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-border pt-3">
              <span className="font-semibold text-text">
                Order total
              </span>
              <span className="text-right text-lg font-semibold text-text">
                {formatCurrency(orderTotal)}
              </span>
            </div>

            <div className="border-t border-border pt-3">
              <p className="text-xs text-text-muted">
                Payment method
              </p>

              <p className="mt-1 font-medium text-text">
                {normalizeStatus(order.paymentMethod) === "cod"
                  ? "Cash on Delivery"
                  : formatLabel(order.paymentMethod)}
              </p>

              <p className="mt-2 text-xs text-text-muted">
                Payment status: {formatLabel(order.paymentStatus)}
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Order activity */}
      {timeline.length > 0 && (
        <section
          aria-labelledby="order-activity-heading"
          className="mt-7 rounded-2xl border border-border bg-surface p-5 sm:p-6"
        >
          <h2
            id="order-activity-heading"
            className="text-base font-semibold text-text"
          >
            Order activity
          </h2>

          <div className="mt-5 space-y-5">
            {timeline.map((event, index) => (
              <div
                key={`${event.timestamp || event.status || "event"}-${index}`}
                className="flex gap-3"
              >
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  {index === timeline.length - 1 ? (
                    <CheckCircle2 size={16} aria-hidden="true" />
                  ) : (
                    <Clock3 size={16} aria-hidden="true" />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-text">
                    {event.title || formatLabel(event.status)}
                  </p>

                  {event.description && (
                    <p className="mt-1 text-sm leading-6 text-text-muted">
                      {event.description}
                    </p>
                  )}

                  <p className="mt-1 text-xs text-text-muted">
                    {formatDateTime(event.timestamp)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Footer actions */}
      <div className="mt-7 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row">
        <Link
          to="/account/orders"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
        >
          <ArrowLeft size={15} aria-hidden="true" />
          Back to orders
        </Link>

        <Link
          to="/shop"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-border bg-surface px-6 py-3 text-sm font-semibold text-text transition-colors hover:border-primary/25 hover:bg-surface-muted hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
        >
          <ShoppingBag size={15} aria-hidden="true" />
          Continue Shopping
        </Link>
      </div>
    </section>
  );
}

export default OrderDetails;
