import {
  ArrowRight,
  Heart,
  Sparkles,
  Trash2,
} from "lucide-react";
import { Link } from "react-router-dom";
import ProductGrid from "../components/ecommerce/ProductGrid";
import useWishlistStore from "../store/wishlistStore";

function Wishlist() {
  const items = useWishlistStore((state) => state.items);
  const clearWishlist = useWishlistStore(
    (state) => state.clearWishlist
  );

  const itemLabel =
    items.length === 1 ? "saved piece" : "saved pieces";

  return (
    <main className="min-h-[70vh] bg-background">
      <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        {/* Header */}
        <section className="border-b border-border pb-7 sm:pb-9">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="min-w-0">
              <div className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-primary">
                <Heart
                  size={13}
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
                Your favourites
              </div>

              <h1 className="mt-3 font-heading text-3xl font-medium tracking-tight text-text sm:text-4xl lg:text-5xl">
                My Wishlist
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-text-muted sm:text-base">
                Keep the pieces you love close and revisit
                them whenever you are ready to shop.
              </p>
            </div>

            {items.length > 0 && (
              <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                <div className="rounded-full border border-border bg-surface px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-text-muted">
                  {items.length} {itemLabel}
                </div>

                <button
                  type="button"
                  onClick={clearWishlist}
                  className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full border border-border bg-surface px-4 py-2.5 text-xs font-semibold text-text-muted transition-colors hover:border-danger/20 hover:bg-danger/[0.04] hover:text-danger focus:outline-none focus:ring-2 focus:ring-danger/20"
                >
                  <Trash2
                    size={14}
                    aria-hidden="true"
                  />
                  Clear Wishlist
                </button>
              </div>
            )}
          </div>
        </section>

        {items.length === 0 ? (
          /* Empty State */
          <section className="py-14 sm:py-20">
            <div className="mx-auto max-w-lg text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-primary/10 bg-primary/[0.045] text-primary">
                <Heart
                  size={32}
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </div>

              <div className="mt-7 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-primary">
                <Sparkles
                  size={12}
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
                Curate your favourites
              </div>

              <h2 className="mt-3 font-heading text-2xl font-medium tracking-tight text-text sm:text-3xl">
                Your wishlist is empty
              </h2>

              <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-text-muted sm:text-base">
                Save your favourite eastern wear, festive
                pieces and everyday essentials here so they
                are easy to find later.
              </p>

              <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  to="/shop"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  Explore Collection
                  <ArrowRight
                    size={16}
                    aria-hidden="true"
                  />
                </Link>

                <Link
                  to="/"
                  className="inline-flex min-h-11 items-center justify-center rounded-full border border-border bg-surface px-6 py-3 text-sm font-semibold text-text transition-colors hover:border-primary/25 hover:bg-surface-muted hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          </section>
        ) : (
          /* Wishlist Products */
          <section className="pt-7 sm:pt-9">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-text">
                  Saved for later
                </p>

                <p className="mt-1 text-xs text-text-muted">
                  Your selected pieces are ready whenever
                  you are.
                </p>
              </div>
            </div>

            <ProductGrid
              products={items}
              emptyMessage="Your wishlist is empty"
            />
          </section>
        )}
      </div>
    </main>
  );
}

export default Wishlist;