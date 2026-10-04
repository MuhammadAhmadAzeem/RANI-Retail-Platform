
import { Heart, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ProductGrid from "../components/ecommerce/ProductGrid";
import useWishlistStore from "../store/wishlistStore";

function Wishlist() {
  const items = useWishlistStore((state) => state.items);
  const clearWishlist = useWishlistStore(
    (state) => state.clearWishlist
  );

  return (
    <main className="min-h-[70vh] bg-background">
      <div className="mx-auto max-w-[1440px] px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Your favourites
            </p>

            <h1 className="font-serif text-3xl font-medium text-text sm:text-4xl lg:text-5xl">
              My Wishlist
            </h1>

            <p className="mt-3 text-sm text-text-muted sm:text-base">
              {items.length === 1
                ? "1 item saved for later"
                : `${items.length} items saved for later`}
            </p>
          </div>

          {items.length > 0 && (
            <button
              type="button"
              onClick={clearWishlist}
              className="self-start text-sm font-medium text-text-muted underline underline-offset-4 transition-colors hover:text-primary sm:self-auto"
            >
              Clear wishlist
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="flex min-h-[360px] flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-surface px-6 py-14 text-center">
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-surface-muted">
              <Heart
                size={28}
                strokeWidth={1.5}
                className="text-text-muted"
              />
            </div>

            <h2 className="font-serif text-2xl font-medium text-text sm:text-3xl">
              Your wishlist is empty
            </h2>

            <p className="mt-3 max-w-sm text-sm leading-6 text-text-muted">
              Save your favourite pieces here so you can
              easily find them whenever you are ready.
            </p>

            <Link
              to="/shop"
              className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              Explore Collection
              <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <ProductGrid
            products={items}
            emptyMessage="Your wishlist is empty"
          />
        )}
      </div>
    </main>
  );
}

export default Wishlist;