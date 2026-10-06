import {
  ArrowRight,
  PackageOpen,
  ShoppingBag,
} from "lucide-react";
import { Link } from "react-router-dom";

function Orders() {
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
              Review your purchases and keep track of your
              orders from one place.
            </p>
          </div>

          <span className="w-fit rounded-full border border-border bg-surface px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-text-muted">
            0 orders
          </span>
        </div>
      </header>

      {/* Empty State */}
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
            <ShoppingBag
              size={16}
              aria-hidden="true"
            />
            Explore Collection
            <ArrowRight
              size={15}
              aria-hidden="true"
            />
          </Link>

          <Link
            to="/collection/new-in"
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-border bg-surface px-6 py-3 text-sm font-semibold text-text transition-colors hover:border-primary/25 hover:bg-surface-muted hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 sm:w-auto"
          >
            New Arrivals
            <ArrowRight
              size={15}
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>

      {/* What will appear here */}
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
              Keep up with the status of your delivery.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-text">
              Easy returns
            </p>

            <p className="mt-1.5 text-xs leading-5 text-text-muted">
              Access return support directly from your orders.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Orders;