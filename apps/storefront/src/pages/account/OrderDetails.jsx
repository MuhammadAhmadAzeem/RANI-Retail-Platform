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
  `Rs. ${Number(amount || 0).toLocaleString("en-PK")}`;



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

function OrderDetails() {
  const { orderId } = useParams();
  const order = orderId ? getOrderById(orderId) : null;

  if (!order) {
    return (
      <section className="min-w-0">
        <div className="border-b border-border pb-7">
          <Link
            to="/account/orders"
            className="inline-flex min-h-9 items-center gap-2 text-xs font-semibold text-text-muted transition-colors hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
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
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              View Orders
              <ArrowRight size={15} aria-hidden="true" />
            </Link>

            <Link
              to="/shop"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-border bg-surface px-6 py-3 text-sm font-semibold text-text transition-colors hover:border-primary/25 hover:bg-surface-muted hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <ShoppingBag size={15} aria-hidden="true" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const currentStatusIndex = ORDER_STATUS_STEPS.indexOf(order.status);
  const isCancelled = order.status === ORDER_STATUSES.CANCELLED;
  const isReturned = order.status === ORDER_STATUSES.RETURNED;
  const timeline = Array.isArray(order.timeline) ? order.timeline : [];
  const shippingAddress = order.shippingAddress || {};
  const customer = order.customer || {};

  return (
    <section className="min-w-0">
      {/* Header */}
      <header className="border-b border-border pb-7">
        <Link
          to="/account/orders"
          className="inline-flex min-h-9 items-center gap-2 text-xs font-semibold text-text-muted transition-colors hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          <ArrowLeft size={15} aria-hidden="true" />
          Back to orders
        </Link>

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-primary">
              Order information
            </p>

            <h1 className="mt-2 font-heading text-3xl font-medium tracking-tight text-text sm:text-4xl">
              Order details
            </h1>

            <p className="mt-3 text-sm text-text-muted">
              Order #{order.orderNumber || order.id}
            </p>

            <p className="mt-2 flex items-center gap-1.5 text-xs text-text-muted">
              <CalendarDays size={14} aria-hidden="true" />
              Placed on {formatDateTime(order.createdAt)}
            </p>
          </div>

          <span className="inline-flex w-fit rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
            {formatLabel(order.status)}
          </span>
        </div>
      </header>

      {/* Order Status */}
      <section className="mt-7 rounded-2xl border border-border bg-surface p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            {isCancelled || isReturned ? (
              <PackageSearch size={21} aria-hidden="true" />
            ) : (
              <Truck size={21} aria-hidden="true" />
            )}
          </div>

          <div>
            <h2 className="text-base font-semibold text-text">
              {isCancelled
                ? "This order has been cancelled"
                : isReturned
                  ? "This order has been returned"
                  : order.status === ORDER_STATUSES.DELIVERED
                    ? "Your order has been delivered"
                    : "Order tracking"}
            </h2>

            <p className="mt-1 text-sm leading-6 text-text-muted">
              {isCancelled
                ? "Contact customer support if you need help with this order."
                : isReturned
                  ? "This order is marked as returned."
                  : "Follow the order status below for the latest recorded progress."}
            </p>
          </div>
        </div>

        {!isCancelled && !isReturned && (
          <div className="mt-7 space-y-5">
            {ORDER_STATUS_STEPS.map((status, index) => {
              const isComplete =
                currentStatusIndex >= 0 && index <= currentStatusIndex;
              const isCurrent = order.status === status;

              return (
                <div key={status} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${isComplete
                          ? "bg-primary text-primary-foreground"
                          : "border border-border bg-background text-text-muted"
                        }`}
                    >
                      {isComplete ? (
                        <CheckCircle2 size={17} aria-hidden="true" />
                      ) : (
                        <Clock3 size={16} aria-hidden="true" />
                      )}
                    </div>

                    {index < ORDER_STATUS_STEPS.length - 1 && (
                      <div
                        className={`mt-1 min-h-5 w-px flex-1 ${isComplete ? "bg-primary/40" : "bg-border"
                          }`}
                      />
                    )}
                  </div>

                  <div className="pb-3">
                    <p
                      className={`text-sm font-semibold ${isCurrent ? "text-primary" : "text-text"
                        }`}
                    >
                      {formatLabel(status)}
                      {isCurrent && (
                        <span className="ml-2 text-xs font-normal text-text-muted">
                          Current status
                        </span>
                      )}
                    </p>

                    <p className="mt-1 text-xs leading-5 text-text-muted">
                      {status === ORDER_STATUSES.PENDING
                        ? "Your order has been placed and is awaiting confirmation."
                        : status === ORDER_STATUSES.CONFIRMED
                          ? "Your order has been confirmed."
                          : status === ORDER_STATUSES.PROCESSING
                            ? "Your order is being prepared."
                            : status === ORDER_STATUSES.SHIPPED
                              ? "Your order has been dispatched."
                              : "Your order has been delivered."}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Order Items */}
      <section className="mt-7">
        <div className="mb-4 flex items-center gap-2">
          <Package size={18} className="text-primary" aria-hidden="true" />

          <h2 className="text-lg font-semibold text-text">
            Items ({order.itemCount ?? (order.items || []).length})
          </h2>
        </div>

        <div className="divide-y divide-border rounded-2xl border border-border bg-surface px-4 sm:px-5">
          {(order.items || []).map((item, index) => (
            <div
              key={`${item.productId || item.name}-${index}`}
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
                <h3 className="text-sm font-semibold text-text">
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
                  Quantity: {item.quantity}
                </p>

                <p className="mt-2 text-sm font-semibold text-text">
                  {formatCurrency(
                    Number(item.price || 0) *
                    Number(item.quantity || 0),
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Shipping and Payment */}
      <div className="mt-7 grid gap-5 lg:grid-cols-2">
        <section className="rounded-2xl border border-border bg-surface p-5">
          <div className="flex items-center gap-2">
            <MapPin size={18} className="text-primary" aria-hidden="true" />

            <h2 className="text-base font-semibold text-text">
              Delivery information
            </h2>
          </div>

          <div className="mt-4 space-y-2 text-sm">
            <p className="font-medium text-text">
              {customer.name || "Customer"}
            </p>

            {customer.phone && (
              <p className="text-text-muted">{customer.phone}</p>
            )}

            {customer.email && (
              <p className="break-words text-text-muted">
                {customer.email}
              </p>
            )}

            <p className="leading-6 text-text-muted">
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
            <div className="flex justify-between gap-3">
              <span className="text-text-muted">Subtotal</span>
              <span className="font-medium text-text">
                {formatCurrency(order.subtotal ?? order.total)}
              </span>
            </div>

            <div className="flex justify-between gap-3">
              <span className="text-text-muted">Shipping</span>
              <span className="font-medium text-text">
                {Number(order.shippingFee || 0) === 0
                  ? "Free"
                  : formatCurrency(order.shippingFee)}
              </span>
            </div>

            <div className="flex justify-between gap-3 border-t border-border pt-3">
              <span className="font-semibold text-text">Order total</span>
              <span className="text-lg font-semibold text-text">
                {formatCurrency(order.total)}
              </span>
            </div>

            <div className="border-t border-border pt-3">
              <p className="text-xs text-text-muted">Payment method</p>
              <p className="mt-1 font-medium text-text">
                {order.paymentMethod === "cod"
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

      {/* Order Timeline */}
      {timeline.length > 0 && (
        <section className="mt-7 rounded-2xl border border-border bg-surface p-5 sm:p-6">
          <h2 className="text-base font-semibold text-text">
            Order activity
          </h2>

          <div className="mt-5 space-y-5">
            {timeline.map((event, index) => (
              <div
                key={`${event.timestamp || event.status}-${index}`}
                className="flex gap-3"
              >
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  {index === 0 ? (
                    <CheckCircle2 size={16} aria-hidden="true" />
                  ) : (
                    <Clock3 size={16} aria-hidden="true" />
                  )}
                </div>

                <div className="min-w-0">
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

      {/* Footer Actions */}
      <div className="mt-7 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row">
        <Link
          to="/account/orders"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          <ArrowLeft size={15} aria-hidden="true" />
          Back to orders
        </Link>

        <Link
          to="/shop"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-border bg-surface px-6 py-3 text-sm font-semibold text-text transition-colors hover:border-primary/25 hover:bg-surface-muted hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          <ShoppingBag size={15} aria-hidden="true" />
          Continue Shopping
        </Link>
      </div>
    </section>
  );
}

export default OrderDetails;
