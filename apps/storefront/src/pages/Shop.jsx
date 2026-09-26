import {
  ChevronDown,
  Grid2X2,
  List,
  SlidersHorizontal,
} from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  "All",
  "Women",
  "Men",
  "Unstitched",
];

const collections = [
  "New In",
  "Signature",
  "Festive",
];

function Shop() {
  return (
    <main className="bg-background">
      {/* Header */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-[1440px] px-5 pb-10 pt-14 sm:px-8 sm:pt-16 lg:pb-12 lg:pt-20">
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-text-muted">
            <Link to="/" className="transition hover:text-primary">
              Home
            </Link>

            <span className="text-border">/</span>

            <span className="text-primary">Shop</span>
          </div>

          <div className="mt-8 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                The collection
              </p>

              <h1 className="mt-3 font-heading text-5xl font-medium leading-[1.05] tracking-tight sm:text-6xl">
                Shop the latest
              </h1>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-text-muted sm:text-base">
                Discover contemporary Pakistani fashion across refined
                everyday, festive and unstitched collections
              </p>
            </div>

            <p className="text-sm text-text-muted">
              Curated selections for every wardrobe
            </p>
          </div>
        </div>
      </section>

      {/* Toolbar */}
      <section className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-5 py-4 sm:px-8 md:flex-row md:items-center md:justify-between">
          <div className="flex gap-2 overflow-x-auto pb-1 md:pb-0">
            {categories.map((category, index) => (
              <button
                key={category}
                type="button"
                className={
                  index === 0
                    ? "whitespace-nowrap rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground"
                    : "whitespace-nowrap rounded-full border border-border bg-surface px-4 py-2 text-xs font-medium text-text-muted transition hover:border-primary hover:text-primary"
                }
              >
                {category}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="inline-flex h-10 items-center gap-2 rounded-full border border-border bg-surface px-4 text-xs font-semibold transition hover:border-primary hover:text-primary"
            >
              <SlidersHorizontal size={15} />
              Filters
            </button>

            <button
              type="button"
              className="inline-flex h-10 items-center gap-2 rounded-full border border-border bg-surface px-4 text-xs font-semibold transition hover:border-primary hover:text-primary"
            >
              Sort
              <ChevronDown size={15} />
            </button>

            <div className="hidden items-center gap-1 rounded-full border border-border bg-surface p-1 sm:flex">
              <button
                type="button"
                aria-label="Grid view"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white"
              >
                <Grid2X2 size={15} />
              </button>

              <button
                type="button"
                aria-label="List view"
                className="flex h-8 w-8 items-center justify-center rounded-full text-text-muted transition hover:text-primary"
              >
                <List size={15} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Collection links */}
      <section className="mx-auto max-w-[1440px] px-5 pt-8 sm:px-8">
        <div className="flex items-center gap-3 overflow-x-auto pb-2">
          <span className="shrink-0 text-xs font-semibold uppercase tracking-[0.16em] text-text-muted">
            Explore
          </span>

          {collections.map((collection) => (
            <Link
              key={collection}
              to={`/collection/${collection.toLowerCase().replaceAll(" ", "-")}`}
              className="shrink-0 text-sm text-text transition hover:text-primary"
            >
              {collection}
            </Link>
          ))}
        </div>
      </section>

      {/* Empty catalogue state */}
      <section className="mx-auto max-w-[1440px] px-5 pb-24 pt-12 sm:px-8 lg:pb-28">
        <div className="relative overflow-hidden border border-border bg-surface">
          <div className="absolute inset-y-0 right-0 hidden w-1/3 bg-linear-to-l from-primary/10 to-transparent lg:block" />

          <div className="relative mx-auto max-w-2xl px-6 py-24 text-center sm:px-10 lg:py-28">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-primary/20 bg-primary/5 text-primary">
              <Grid2X2 size={21} />
            </div>

            <p className="mt-7 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              Catalogue
            </p>

            <h2 className="mt-3 font-heading text-3xl font-medium sm:text-4xl">
              Curated pieces are on their way
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-text-muted sm:text-base">
              The storefront catalogue is being prepared for the RANI product
              system
            </p>

            <Link
              to="/"
              className="mt-8 inline-flex h-11 items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-white transition hover:bg-primary-hover"
            >
              Back to home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Shop;