import { ArrowRight, PackageOpen, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

function Orders() {
  return (
    <main className="min-h-[70vh] bg-background">
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-primary">
            Account
          </p>

          <h1 className="mt-3 font-heading text-3xl font-medium text-text sm:text-4xl">
            Your Orders
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-text-muted">
            View your recent purchases and keep track of your
            orders from one place.
          </p>
        </div>

        <div className="mt-8 rounded-2xl border border-border bg-surface p-6 text-center shadow-sm sm:p-10">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-surface-muted text-primary">
            <PackageOpen size={28} strokeWidth={1.8} aria-hidden="true" />
          </div>

          <h2 className="mt-6 font-heading text-2xl font-medium text-text">
            No orders yet
          </h2>

          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-text-muted">
            You haven&apos;t placed any orders yet. Explore our
            collection and find something you&apos;ll love.
          </p>

          <Link
            to="/shop"
            className="mt-7 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <ShoppingBag size={16} aria-hidden="true" />
            Start Shopping
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Orders;