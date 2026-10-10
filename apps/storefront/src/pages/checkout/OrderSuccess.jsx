
import {
  ArrowRight,
  Check,
  Home,
  MapPin,
  PackageCheck,
  ShoppingBag,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import {
  getOrderById,
} from "../../data/mock/orders";

const formatCurrency = (amount) =>
  `Rs. ${Number(amount || 0).toLocaleString("en-PK")}`;

const formatDate = (date) => {
  if (!date) return "Not available";

  return new Date(date).toLocaleString("en-PK", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

function OrderSuccess() {
  const location = useLocation();
  const orderId = location.state?.orderId || null;
  const order = orderId ? getOrderById(orderId) : null;

  return (
    <main className="min-h-[70vh] bg-background">
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
          <div className="px-5 py-9 sm:px-8 sm:py-12">
            <div className="text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-success/[0.07] text-success">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success text-white">
                  <Check size={25} strokeWidth={2.2} aria-hidden="true" />
                </div>
              </div>

              <p className="mt-7 text-[10px] font-semibold uppercase tracking-[0.24em] text-success">
                Order received
              </p>

              <h1 className="mt-3 font-heading text-3xl font-medium tracking-tight text-text sm:text-4xl">
                Thank you for your order
              </h1>

              <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-text-muted">
                Thank you for choosing Bajwa&apos;s Collection.
                Your order confirmation and tracking details are shown below.
              </p>
            </div>

            {!order ? (
              <div className="mt-8 rounded-2xl border border-border bg-background p-6 text-center">
                <PackageCheck
                  size={28}
                  className="mx-auto text-primary"
                  aria-hidden="true"
                />

                <h2 className="mt-4 font-heading text-xl font-medium text-text">
                  Order details unavailable
                </h2>

                <p className="mt-2 text-sm leading-6 text-text-muted">
                  We could not find an order for this confirmation.
                  You can check your saved orders or continue shopping.
                </p>

                <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
                  <Link
                    to="/account/orders"
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary-hover"
                  >
                    View Orders
                    <ArrowRight size={15} aria-hidden="true" />
                  </Link>

                  <Link
                    to="/shop"
                    className="inline-flex min-h-11 items-center justify-center rounded-full border border-border px-5 py-3 text-sm font-semibold text-text hover:bg-surface-muted"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            ) : (
              <>
                <div className="mt-8 rounded-2xl border border-border bg-background p-5 sm:p-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-text-muted">
                        Order number
                      </p>

                      <p className="mt-1.5 text-lg font-semibold tracking-tight text-text">
                        {order.orderNumber}
                      </p>

                      <p className="mt-1 text-xs text-text-muted">
                        Placed on {formatDate(order.createdAt)}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
                        {order.status}
                      </span>

                      <span className="inline-flex rounded-full bg-surface-muted px-3 py-1.5 text-xs font-semibold text-text">
                        Payment: {order.paymentStatus}
                      </span>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-4 border-t border-border pt-5 sm:grid-cols-2">
                    <div>
                      <p className="text-xs text-text-muted">
                        Payment method
                      </p>

                      <p className="mt-1 text-sm font-semibold capitalize text-text">
                        {order.paymentMethod === "cod"
                          ? "Cash on Delivery"
                          : order.paymentMethod}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-text-muted">
                        Order total
                      </p>

                      <p className="mt-1 text-lg font-semibold text-text">
                        {formatCurrency(order.total)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 rounded-2xl border border-border bg-surface p-5 sm:p-6">
                  <div className="flex items-center gap-2">
                    <ShoppingBag
                      size={17}
                      className="text-primary"
                      aria-hidden="true"
                    />

                    <h2 className="font-heading text-lg font-medium text-text">
                      Order items
                    </h2>
                  </div>

                  <div className="mt-4 divide-y divide-border">
                    {order.items.map((item, index) => (
                      <div
                        key={`${item.productId || item.name}-${index}`}
                        className="flex gap-3 py-4 first:pt-0 last:pb-0"
                      >
                        <div className="h-16 w-14 shrink-0 overflow-hidden rounded-lg bg-surface-muted">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center">
                              <ShoppingBag
                                size={18}
                                className="text-text-muted"
                                aria-hidden="true"
                              />
                            </div>
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-text">
                            {item.name}
                          </p>

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
                        </div>

                        <p className="shrink-0 text-sm font-semibold text-text">
                          {formatCurrency(item.price * item.quantity)}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 space-y-3 border-t border-border pt-4">
                    <div className="flex justify-between gap-4 text-sm">
                      <span className="text-text-muted">Subtotal</span>
                      <span className="font-medium text-text">
                        {formatCurrency(order.subtotal)}
                      </span>
                    </div>

                    <div className="flex justify-between gap-4 text-sm">
                      <span className="text-text-muted">Delivery</span>
                      <span className="font-medium text-text">
                        {Number(order.shippingFee) === 0
                          ? "Free"
                          : formatCurrency(order.shippingFee)}
                      </span>
                    </div>

                    <div className="flex justify-between gap-4 border-t border-border pt-4">
                      <span className="font-semibold text-text">Total</span>
                      <span className="text-lg font-semibold text-text">
                        {formatCurrency(order.total)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 rounded-2xl border border-border bg-background p-5 sm:p-6">
                  <div className="flex items-center gap-2">
                    <MapPin
                      size={17}
                      className="text-primary"
                      aria-hidden="true"
                    />

                    <h2 className="font-heading text-lg font-medium text-text">
                      Delivery details
                    </h2>
                  </div>

                  <p className="mt-4 text-sm font-semibold text-text">
                    {order.customer?.name || "Customer"}
                  </p>

                  {order.customer?.email && (
                    <p className="mt-1 text-sm text-text-muted">
                      {order.customer.email}
                    </p>
                  )}

                  {order.customer?.phone && (
                    <p className="mt-1 text-sm text-text-muted">
                      {order.customer.phone}
                    </p>
                  )}

                  <p className="mt-3 text-sm leading-6 text-text-muted">
                    {[
                      order.shippingAddress?.address,
                      order.shippingAddress?.city,
                      order.shippingAddress?.state,
                      order.shippingAddress?.postalCode,
                      order.shippingAddress?.country,
                    ]
                      .filter(Boolean)
                      .join(", ") || "Address not provided"}
                  </p>
                </div>

                <div className="mt-5 flex items-start gap-3 rounded-xl bg-background p-4">
                  <PackageCheck
                    size={19}
                    className="mt-0.5 shrink-0 text-primary"
                    aria-hidden="true"
                  />

                  <div>
                    <p className="text-sm font-semibold text-text">
                      What happens next?
                    </p>

                    <p className="mt-1 text-xs leading-5 text-text-muted">
                      Your current order status is {order.status}.
                      Payment status is {order.paymentStatus}.
                      Tracking updates will appear as the order status changes.
                    </p>
                  </div>
                </div>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <Link
                    to={`/account/orders/${encodeURIComponent(order.id)}`}
                    className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary-hover"
                  >
                    Track Order
                    <ArrowRight size={15} aria-hidden="true" />
                  </Link>

                  <Link
                    to="/account/orders"
                    className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold text-text hover:bg-surface-muted"
                  >
                    <ShoppingBag size={15} aria-hidden="true" />
                    View All Orders
                  </Link>
                </div>
              </>
            )}

            <div className="mt-5 text-center">
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-muted hover:text-primary"
              >
                <Home size={13} aria-hidden="true" />
                Back to Home
              </Link>
            </div>
          </div>

          <div className="border-t border-border bg-surface-muted/[0.35] px-5 py-4 text-center">
            <p className="font-heading text-sm font-medium text-text">
              Bajwa&apos;s Collection
            </p>

            <p className="mt-1 text-[11px] text-text-muted">
              Order confirmation · Demo checkout
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default OrderSuccess;
