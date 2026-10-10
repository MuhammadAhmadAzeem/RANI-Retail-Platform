import {
  ArrowRight,
  CalendarDays,
  PackageOpen,
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

function Orders() {
  // Load saved orders once when this component initializes.
  const [orders] = useState(() => {
    const savedOrders = getOrders();

    return Array.isArray(savedOrders) ? savedOrders : [];
  });

  return (
    <section className="min-w-0">
      {/* Page Header */}
      <header className="border-b border-border pb-7">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-primary">
              Order history
            </p>

            <h1 className="mt-2 font-heading text-3xl font-medium tracking-tight text-text sm:text-4xl">
              Your orders
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-text-muted">
              Review your purchases and keep track of your orders
              from one place.
            </p>
          </div>

          <span className="w-fit rounded-full border border-border bg-surface px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-text-muted">
            {orders.length} {orders.length === 1 ? "order" : "orders"}
          </span>
        </div>
      </header>

      {/* Empty State */}
      {orders.length === 0 ? (
        <div className="py-14 text-center sm:py-20">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-primary/10 bg-primary/[0.045] text-primary">
            <PackageOpen
              size={32}
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </div>

          <p className="mt-7 text-[10px] font-semibold uppercase tracking-[0.22em] text-primary">
            Ready when you are
          </p>

          <h2 className="mt-3 font-heading text-2xl font-medium tracking-tight text-text sm:text-3xl">
            You haven&apos;t placed an order yet.
          </h2>

          <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-text-muted">
            Your purchases will appear here with order details,
            status updates, and delivery information.
          </p>

          <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              to="/shop"
              className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary/20 sm:w-auto"
            >
              <ShoppingBag size={16} aria-hidden="true" />
              Explore Collection
              <ArrowRight size={15} aria-hidden="true" />
            </Link>

            <Link
              to="/collection/new-in"
              className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-border bg-surface px-6 py-3 text-sm font-semibold text-text transition-colors hover:border-primary/25 hover:bg-surface-muted hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 sm:w-auto"
            >
              New Arrivals
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </div>
      ) : (
        /* Orders List */
        <div className="space-y-5 py-7">
          {orders.map((order) => (
            <article
              key={order.id}
              className="overflow-hidden rounded-2xl border border-border bg-surface"
            >
              {/* Order Header */}
              <div className="flex flex-col gap-4 border-b border-border bg-background px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-text-muted">
                    Order number
                  </p>

                  <p className="mt-1 text-sm font-semibold text-text">
                    {order.orderNumber}
                  </p>

                  <div className="mt-2 flex items-center gap-1.5 text-xs text-text-muted">
                    <CalendarDays size={13} aria-hidden="true" />
                    <span>{formatDate(order.createdAt)}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className="w-fit rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
                    {order.status}
                  </span>

                  <span className="w-fit rounded-full border border-border px-3 py-1.5 text-xs font-medium text-text-muted">
                    Payment: {order.paymentStatus}
                  </span>
                </div>
              </div>

              {/* Order Items */}
              <div className="divide-y divide-border px-4 sm:px-5">
                {(order.items || []).map((item, index) => (
                  <div
                    key={`${item.productId || item.name}-${index}`}
                    className="flex gap-3 py-4"
                  >
                    <div className="h-20 w-16 shrink-0 overflow-hidden rounded-lg bg-surface-muted">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name || "Product"}
                          loading="lazy"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-text-muted">
                          <ShoppingBag size={20} aria-hidden="true" />
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h2 className="text-sm font-semibold text-text">
                        {item.name}
                      </h2>

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

              {/* Order Footer */}
              <div className="flex flex-col gap-4 border-t border-border px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
                <div>
                  <p className="text-xs text-text-muted">
                    Order total
                  </p>

                  <p className="mt-1 text-xl font-semibold tracking-tight text-text">
                    {formatCurrency(order.total)}
                  </p>

                  <p className="mt-1 text-xs text-text-muted">
                    {order.paymentMethod === "cod"
                      ? "Cash on Delivery"
                      : order.paymentMethod}
                  </p>
                </div>

                <Link
                  to={`/account/orders/${encodeURIComponent(order.id)}`}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <Truck size={15} aria-hidden="true" />
                  Track Order
                  <ArrowRight size={15} aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Order Benefits */}
      <div className="border-t border-border py-6">
        <div className="grid gap-5 sm:grid-cols-3">
          <div>
            <p className="text-sm font-semibold text-text">
              Order details
            </p>

            <p className="mt-1.5 text-xs leading-5 text-text-muted">
              Items, quantities, totals, and order dates.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-text">
              Delivery updates
            </p>

            <p className="mt-1.5 text-xs leading-5 text-text-muted">
              Check your saved order status and tracking timeline.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-text">
              Easy returns
            </p>

            <p className="mt-1.5 text-xs leading-5 text-text-muted">
              Your order history keeps your purchase details together.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Orders;