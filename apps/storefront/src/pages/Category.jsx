import {
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

function formatSlug(slug) {
  if (!slug) {
    return "Category";
  }

  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function Category() {
  const { slug } = useParams();

  const categoryName = formatSlug(slug);

  return (
    <main className="bg-background">
      {/* Breadcrumb */}
      <section className="mx-auto max-w-[1440px] px-5 pt-8 sm:px-8">
        <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-text-muted">
          <Link
            to="/"
            className="transition hover:text-primary"
          >
            Home
          </Link>

          <ChevronRight size={13} />

          <Link
            to="/shop"
            className="transition hover:text-primary"
          >
            Shop
          </Link>

          <ChevronRight size={13} />

          <span className="text-primary">
            {categoryName}
          </span>
        </div>
      </section>

      {/* Hero */}
      <section className="mx-auto max-w-[1440px] px-5 pb-16 pt-12 sm:px-8 lg:pb-20 lg:pt-16">
        <div className="overflow-hidden bg-primary">
          <div className="grid min-h-[430px] lg:grid-cols-[1fr_0.65fr]">
            <div className="flex items-center px-6 py-14 text-white sm:px-10 lg:px-16">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/55">
                  Collection category
                </p>

                <h1 className="mt-4 font-heading text-5xl font-medium leading-[1.05] sm:text-6xl">
                  {categoryName}
                </h1>

                <p className="mt-5 max-w-lg text-sm leading-7 text-white/70 sm:text-base">
                  A refined selection of Pakistani fashion shaped around
                  contemporary silhouettes, quality fabrics and timeless style
                </p>

                <Link
                  to="/shop"
                  className="mt-8 inline-flex h-11 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-primary transition hover:bg-white/90"
                >
                  Explore all pieces
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            <div className="relative hidden overflow-hidden bg-[#581923] lg:block">
              <div className="absolute inset-0 bg-linear-to-br from-white/10 via-transparent to-black/20" />

              <div className="absolute bottom-8 right-8 text-right text-white/30">
                <p className="font-heading text-7xl leading-none">
                  BC
                </p>

                <p className="mt-2 text-[9px] uppercase tracking-[0.38em]">
                  Bajwa's Collection
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-[1440px] px-5 pb-24 sm:px-8 lg:pb-28">
        <div className="flex flex-col justify-between gap-6 border-b border-border pb-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              {categoryName} edit
            </p>

            <h2 className="mt-3 font-heading text-3xl font-medium sm:text-4xl">
              Designed for the modern wardrobe
            </h2>
          </div>

          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:text-primary-hover"
          >
            Browse shop
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            ["01", "Considered design"],
            ["02", "Premium fabrics"],
            ["03", "Made for modern living"],
          ].map(([number, title]) => (
            <div
              key={number}
              className="border border-border bg-surface p-6 sm:p-7"
            >
              <p className="text-xs font-semibold tracking-[0.16em] text-primary">
                {number}
              </p>

              <h3 className="mt-8 font-heading text-2xl">
                {title}
              </h3>

              <div className="mt-8 h-px bg-border" />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Category;