import {
  ArrowLeft,
  ArrowRight,
  PackageSearch,
  ShoppingBag,
} from "lucide-react";
import { Link } from "react-router-dom";

function OrderDetails() {
  return (
    <section className="min-w-0">
      {/* Header */}
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

          <p className="mt-3 max-w-xl text-sm leading-6 text-text-muted">
            Your order items, payment information, and delivery
            updates will appear here.
          </p>
        </div>
      </div>

      {/* Empty State */}
      <div className="py-14 sm:py-20">
        <div className="mx-auto max-w-xl text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-primary/10 bg-primary/[0.045] text-primary">
            <PackageSearch
              size={32}
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </div>

          <p className="mt-7 text-[10px] font-semibold uppercase tracking-[0.22em] text-primary">
            No order selected
          </p>

          <h2 className="mt-3 font-heading text-2xl font-medium tracking-tight text-text sm:text-3xl">
            Order details will appear here.
          </h2>

          <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-text-muted">
            Select an order from your order history to view its
            items, status, payment, and delivery information.
          </p>

          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/account/orders"
              className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary/20 sm:w-auto"
            >
              View Orders
              <ArrowRight size={15} aria-hidden="true" />
            </Link>

            <Link
              to="/shop"
              className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-border bg-surface px-6 py-3 text-sm font-semibold text-text transition-colors hover:border-primary/25 hover:bg-surface-muted hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 sm:w-auto"
            >
              <ShoppingBag size={15} aria-hidden="true" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>

      {/* Future Order Sections */}
      <div className="border-t border-border pt-7">
        <div className="grid gap-6 sm:grid-cols-3">
          <div>
            <p className="text-sm font-semibold text-text">
              Items
            </p>

            <p className="mt-1.5 text-xs leading-5 text-text-muted">
              Ordered products and quantities.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-text">
              Delivery
            </p>

            <p className="mt-1.5 text-xs leading-5 text-text-muted">
              Shipping status and delivery updates.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-text">
              Payment
            </p>

            <p className="mt-1.5 text-xs leading-5 text-text-muted">
              Payment and order summary information.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OrderDetails;