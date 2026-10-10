import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { getOrders } from "../../data/mock/orders";

const formatCurrency = (amount) =>
  `Rs. ${Number(amount || 0).toLocaleString("en-PK")}`;

const formatDate = (date) => {
  if (!date) return "Date unavailable";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Date unavailable";
  }

  return parsedDate.toLocaleDateString("en-PK", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const normalizeStatus = (value) =>
  String(value || "pending")
    .trim()
    .toLowerCase()
    .replace(/[\s_-]+/g, "");

const formatLabel = (value) => {
  if (!value) return "Not available";

  return String(value)
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
};

const getOrderStatusClass = (status) => {
  switch (normalizeStatus(status)) {
    case "delivered":
      return "border border-emerald-200 bg-emerald-50 text-emerald-800";

    case "shipped":
      return "border border-sky-200 bg-sky-50 text-sky-800";

    case "confirmed":
      return "border border-primary/20 bg-primary/10 text-primary";

    case "processing":
      return "border border-amber-200 bg-amber-50 text-amber-800";

    case "cancelled":
    case "returned":
      return "border border-rose-200 bg-rose-50 text-rose-800";

    default:
      return "border border-border bg-surface-muted text-text-muted";
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

    default:
      return "text-text-muted";
  }
};

function Orders() {
  // Read saved orders when this page initializes.
  const [orders] = useState(() => {
    const savedOrders = getOrders();

    return Array.isArray(savedOrders) ? savedOrders : [];
  });

  const activeOrders = orders.filter(
    (order) =>
      !["delivered", "cancelled", "returned"].includes(
        normalizeStatus(order.status),
      ),
  ).length;

  const deliveredOrders = orders.filter(
    (order) => normalizeStatus(order.status) === "delivered",
  ).length;

  return (
    <section className="min-w-0">
      {/* Editorial page heading */}
      <header className="border-b border-border pb-7">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-primary">
              Bajwa&apos;s Collection
            </p>

            <h1 className="mt-3 font-heading text-3xl font-normal tracking-tight text-text sm:text-4xl lg:text-5xl">
              Your orders
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-text-muted">
              Everything you have ordered, brought together in one
              place. Review your purchases and follow each order&apos;s
              progress.
            </p>
          </div>

          <Link
            to="/shop"
            className="inline-flex min-h-10 w-fit items-center justify-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary-hover focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            Explore the collection
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>

        {/* Order overview */}
        {orders.length > 0 && (
          <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3">
            <div className="border-l-2 border-primary bg-surface px-4 py-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-text-muted">
                All orders
              </p>

              <p className="mt-2 font-heading text-2xl text-text">
                {orders.length}
              </p>
            </div>

            <div className="border-l-2 border-amber-500 bg-surface px-4 py-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-text-muted">
                In progress
              </p>

              <p className="mt-2 font-heading text-2xl text-text">
                {activeOrders}
              </p>
            </div>

            <div className="col-span-2 border-l-2 border-emerald-600 bg-surface px-4 py-3 sm:col-span-1">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-text-muted">
                Delivered
              </p>

              <p className="mt-2 font-heading text-2xl text-text">
                {deliveredOrders}
              </p>
            </div>
          </div>
        )}
      </header>

      {/* Empty state */}
      {orders.length === 0 ? (
        <div className="py-16 text-center sm:py-24">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-primary/15 bg-primary/[0.04]">
            <ShoppingBag
              size={29}
              strokeWidth={1.4}
              className="text-primary"
              aria-hidden="true"
            />
          </div>

          <p className="mt-7 text-[10px] font-semibold uppercase tracking-[0.22em] text-primary">
            A new favourite awaits
          </p>

          <h2 className="mt-3 font-heading text-2xl font-normal tracking-tight text-text sm:text-3xl">
            Your story with us starts here.
          </h2>

          <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-text-muted">
            Once you place an order, you will find your purchase
            details, payment information and order progress here.
          </p>

          <Link
            to="/shop"
            className="mt-7 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2"
          >
            <ShoppingBag size={16} aria-hidden="true" />
            Discover the collection
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
      ) : (
        /* Order history */
        <div className="space-y-5 py-6">
          {orders.map((order) => {
            const items = Array.isArray(order.items) ? order.items : [];
            const orderNumber = order.orderNumber || order.id;
            const visibleItems = items.slice(0, 2);
            const remainingItems = Math.max(0, items.length - 2);

            return (
              <article
                key={order.id}
                className="overflow-hidden border border-border bg-surface transition-colors duration-200 hover:border-primary/25"
              >
                {/* Order identity and status */}
                <div className="flex flex-col gap-4 border-b border-border bg-background/70 px-4 py-4 sm:px-6 sm:py-5">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-text-muted">
                        Order number
                      </p>

                      <p className="mt-1.5 break-all text-sm font-semibold tracking-wide text-text">
                        {orderNumber}
                      </p>

                      <p className="mt-2 flex items-center gap-1.5 text-xs text-text-muted">
                        <CalendarDays size={13} aria-hidden="true" />
                        Placed on {formatDate(order.createdAt)}
                      </p>
                    </div>

                    <span
                      className={`inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${getOrderStatusClass(order.status)}`}
                    >
                      {normalizeStatus(order.status) === "delivered" ? (
                        <CheckCircle2 size={13} aria-hidden="true" />
                      ) : normalizeStatus(order.status) === "shipped" ? (
                        <Truck size={13} aria-hidden="true" />
                      ) : (
                        <Clock3 size={13} aria-hidden="true" />
                      )}

                      {formatLabel(order.status)}
                    </span>
                  </div>
                </div>

                {/* Product preview and order summary */}
                <div className="grid gap-6 px-4 py-5 sm:px-6 sm:py-6 lg:grid-cols-[minmax(0,1fr)_220px]">
                  <div className="min-w-0">
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-text-muted">
                        Items in this order
                      </p>

                      <p className="shrink-0 text-xs text-text-muted">
                        {items.length}{" "}
                        {items.length === 1 ? "item" : "items"}
                      </p>
                    </div>

                    {items.length > 0 ? (
                      <div className="space-y-4">
                        {visibleItems.map((item, index) => (
                          <div
                            key={`${item.productId || item.name || "item"}-${index}`}
                            className="flex min-w-0 gap-3"
                          >
                            <div className="h-24 w-[76px] shrink-0 overflow-hidden bg-surface-muted">
                              {item.image ? (
                                <img
                                  src={item.image}
                                  alt={item.name || "Ordered product"}
                                  loading="lazy"
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <div className="flex h-full items-center justify-center">
                                  <ShoppingBag
                                    size={22}
                                    strokeWidth={1.4}
                                    className="text-text-muted"
                                    aria-hidden="true"
                                  />
                                </div>
                              )}
                            </div>

                            <div className="flex min-w-0 flex-1 flex-col justify-center">
                              <h2 className="line-clamp-2 text-sm font-medium leading-5 text-text">
                                {item.name || "Product"}
                              </h2>

                              {(item.size || item.color) && (
                                <p className="mt-1 text-xs leading-5 text-text-muted">
                                  {item.size && `Size: ${item.size}`}
                                  {item.size && item.color && " · "}
                                  {item.color && `Color: ${item.color}`}
                                </p>
                              )}

                              <p className="mt-1 text-xs text-text-muted">
                                Qty: {Number(item.quantity || 0)}
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

                        {remainingItems > 0 && (
                          <p className="border-t border-border pt-3 text-xs font-medium text-primary">
                            + {remainingItems} more{" "}
                            {remainingItems === 1 ? "item" : "items"} in
                            this order
                          </p>
                        )}
                      </div>
                    ) : (
                      <p className="text-sm text-text-muted">
                        Product details are unavailable for this order.
                      </p>
                    )}
                  </div>

                  {/* Total, payment and tracking action */}
                  <div className="flex flex-col border-t border-border pt-5 lg:border-l lg:border-t-0 lg:pl-5 lg:pt-0">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-text-muted">
                        Order total
                      </p>

                      <p className="mt-2 font-heading text-2xl font-normal tracking-tight text-text">
                        {formatCurrency(order.total)}
                      </p>
                    </div>

                    <div className="mt-4 space-y-2 border-t border-border pt-4">
                      <div className="flex items-start justify-between gap-3 text-xs">
                        <span className="text-text-muted">Payment</span>

                        <span className="text-right font-medium text-text">
                          {normalizeStatus(order.paymentMethod) === "cod"
                            ? "Cash on Delivery"
                            : formatLabel(order.paymentMethod)}
                        </span>
                      </div>

                      <div className="flex items-start justify-between gap-3 text-xs">
                        <span className="text-text-muted">
                          Payment status
                        </span>

                        <span
                          className={`text-right font-medium ${getPaymentStatusClass(order.paymentStatus)}`}
                        >
                          {formatLabel(order.paymentStatus)}
                        </span>
                      </div>

                      <div className="flex items-start justify-between gap-3 text-xs">
                        <span className="text-text-muted">Delivery</span>

                        <span className="text-right font-medium text-text">
                          {Number(order.shippingFee || 0) === 0
                            ? "Free"
                            : formatCurrency(order.shippingFee)}
                        </span>
                      </div>
                    </div>

                    <div className="mt-5 lg:mt-auto lg:pt-6">
                      <Link
                        to={`/account/orders/${encodeURIComponent(order.id)}`}
                        aria-label={`View tracking and details for order ${orderNumber}`}
                        className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2"
                      >
                        <Truck size={15} aria-hidden="true" />
                        Track order
                        <ChevronRight size={16} aria-hidden="true" />
                      </Link>

                      <p className="mt-3 text-center text-[11px] leading-5 text-text-muted">
                        View your order details and recorded progress.
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default Orders;

