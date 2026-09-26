import {
  ArrowLeft,
  Heart,
  Ruler,
  ShieldCheck,
  ShoppingBag,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

function formatSlug(slug) {
  if (!slug) {
    return "Product";
  }

  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function ProductDetails() {
  const { slug } = useParams();

  const productName = formatSlug(slug);

  return (
    <main className="bg-background">
      <section className="mx-auto max-w-[1440px] px-5 py-8 sm:px-8 lg:py-12">
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-text-muted transition hover:text-primary"
        >
          <ArrowLeft size={15} />
          Back to shop
        </Link>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* Visual area */}
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2 aspect-[4/5] overflow-hidden bg-[#eee7dc]">
              <div className="flex h-full items-end p-6 sm:p-8">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/70">
                    Product gallery
                  </p>

                  <p className="mt-2 max-w-xs font-heading text-3xl text-text/70">
                    Editorial imagery will appear here
                  </p>
                </div>
              </div>
            </div>

            <div className="aspect-square bg-[#f0ece5]" />
            <div className="aspect-square bg-[#e5ddd1]" />
          </div>

          {/* Product info */}
          <div className="lg:pt-5">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              Bajwa's Collection
            </p>

            <h1 className="mt-4 font-heading text-4xl font-medium leading-tight sm:text-5xl">
              {productName}
            </h1>

            <div className="mt-5 flex items-center gap-4">
              <p className="text-xl font-semibold text-text">
                Rs. 4,999
              </p>

              <span className="h-1 w-1 rounded-full bg-gold" />

              <p className="text-sm text-text-muted">
                Ready to wear
              </p>
            </div>

            <div className="mt-8 border-y border-border py-7">
              <p className="text-sm leading-7 text-text-muted">
                A refined product presentation for Bajwa's Collection,
                designed to showcase fabric, fit and detail with a premium
                ecommerce experience
              </p>
            </div>

            {/* Placeholder selection */}
            <div className="mt-7">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold">
                  Select size
                </p>

                <button
                  type="button"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-primary"
                >
                  <Ruler size={14} />
                  Size guide
                </button>
              </div>

              <div className="mt-3 grid grid-cols-4 gap-2">
                {["S", "M", "L", "XL"].map((size) => (
                  <button
                    key={size}
                    type="button"
                    className="h-11 border border-border bg-surface text-sm font-medium transition hover:border-primary hover:text-primary"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 grid gap-3 sm:grid-cols-[1fr_auto]">
              <button
                type="button"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-white transition hover:bg-primary-hover"
              >
                <ShoppingBag size={18} />
                Add to bag
              </button>

              <button
                type="button"
                aria-label="Add to wishlist"
                className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-surface px-5 text-text transition hover:border-primary hover:text-primary"
              >
                <Heart size={18} />
              </button>
            </div>

            {/* Trust */}
            <div className="mt-8 grid gap-4 border-t border-border pt-7 sm:grid-cols-2">
              <div className="flex gap-3">
                <ShieldCheck className="mt-0.5 shrink-0 text-primary" size={18} />

                <div>
                  <p className="text-sm font-semibold">
                    Quality focused
                  </p>

                  <p className="mt-1 text-xs leading-5 text-text-muted">
                    Thoughtfully presented collections and product details
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <ShoppingBag className="mt-0.5 shrink-0 text-primary" size={18} />

                <div>
                  <p className="text-sm font-semibold">
                    Easy shopping
                  </p>

                  <p className="mt-1 text-xs leading-5 text-text-muted">
                    Designed for a smooth and focused buying journey
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ProductDetails;