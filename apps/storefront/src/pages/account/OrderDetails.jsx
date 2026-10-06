import { ArrowLeft, PackageSearch } from "lucide-react";
import { Link } from "react-router-dom";

function OrderDetails() {
  return (
    <main className="min-h-[70vh] bg-background">
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
        <Link
          to="/account/orders"
          className="inline-flex items-center gap-2 text-sm font-medium text-text-muted transition-colors hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Back to Orders
        </Link>

        <div className="mt-7">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-primary">
            Account
          </p>

          <h1 className="mt-3 font-heading text-3xl font-medium text-text sm:text-4xl">
            Order Details
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-text-muted">
            Review the items, status, payment, and delivery
            information for your order.
          </p>
        </div>

        <div className="mt-8 rounded-2xl border border-border bg-surface p-6 text-center shadow-sm sm:p-10">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-surface-muted text-primary">
            <PackageSearch size={28} strokeWidth={1.8} aria-hidden="true" />
          </div>

          <h2 className="mt-6 font-heading text-2xl font-medium text-text">
            Order details unavailable
          </h2>

          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-text-muted">
            Order information will appear here when your order
            data is available.
          </p>

          <Link
            to="/account/orders"
            className="mt-7 inline-flex min-h-11 items-center justify-center rounded-full border border-border px-6 py-3 text-sm font-semibold text-text transition-colors hover:border-primary/30 hover:bg-surface-muted hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            View Orders
          </Link>
        </div>
      </section>
    </main>
  );
}

export default OrderDetails;