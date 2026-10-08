import {
  ArrowRight,
  Check,
  Home,
  PackageCheck,
  ShoppingBag,
} from "lucide-react";
import { Link } from "react-router-dom";

function OrderSuccess() {
  return (
    <main className="min-h-[70vh] bg-background">
      <section className="mx-auto flex min-h-[70vh] max-w-2xl items-center px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
        <div className="w-full">
          {/* Success Card */}
          <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
            <div className="px-5 py-9 text-center sm:px-8 sm:py-12">
              {/* Icon */}
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-success/[0.07] text-success">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success text-white">
                  <Check
                    size={25}
                    strokeWidth={2.2}
                    aria-hidden="true"
                  />
                </div>
              </div>

              {/* Eyebrow */}
              <p className="mt-7 text-[10px] font-semibold uppercase tracking-[0.24em] text-success">
                Order complete
              </p>

              {/* Heading */}
              <h1 className="mt-3 font-heading text-3xl font-medium tracking-tight text-text sm:text-4xl">
                Thank you for your order
              </h1>

              <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-text-muted sm:text-base">
                Thank you for choosing Bajwa&apos;s Collection.
                Your order has been received and your checkout
                journey is complete.
              </p>

              {/* Confirmation Details */}
              <div className="mx-auto mt-8 max-w-md rounded-2xl border border-border bg-background p-5 text-left">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-muted text-primary">
                    <PackageCheck
                      size={18}
                      strokeWidth={1.8}
                      aria-hidden="true"
                    />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-text">
                      What happens next
                    </p>

                    <p className="mt-1 text-xs leading-5 text-text-muted">
                      Your order details and delivery updates
                      will be available here once order processing
                      is connected.
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Link
                  to="/shop"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  Continue Shopping
                  <ArrowRight
                    size={15}
                    aria-hidden="true"
                  />
                </Link>

                <Link
                  to="/account"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-border bg-surface px-6 py-3 text-sm font-semibold text-text transition-colors hover:border-primary/25 hover:bg-surface-muted hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <ShoppingBag
                    size={15}
                    aria-hidden="true"
                  />
                  View My Account
                </Link>
              </div>

              {/* Home */}
              <Link
                to="/"
                className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-text-muted transition-colors hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <Home
                  size={13}
                  aria-hidden="true"
                />
                Back to Home
              </Link>
            </div>

            {/* Bottom Brand Detail */}
            <div className="border-t border-border bg-surface-muted/[0.35] px-5 py-4 text-center">
              <p className="font-heading text-sm font-medium text-text">
                Bajwa&apos;s Collection
              </p>

              <p className="mt-1 text-[11px] text-text-muted">
                Thank you for shopping with us.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default OrderSuccess;