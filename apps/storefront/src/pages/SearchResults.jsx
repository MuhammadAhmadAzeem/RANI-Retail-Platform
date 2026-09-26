import {
  ArrowLeft,
  Search,
  X,
} from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

function SearchResults() {
  const [searchParams] = useSearchParams();

  const query = searchParams.get("q")?.trim() || "";

  return (
    <main className="min-h-[70vh] bg-background">
      <section className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 lg:py-16">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-text-muted transition hover:text-primary"
        >
          <ArrowLeft size={15} />
          Back to home
        </Link>

        <div className="mx-auto mt-14 max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
            Search
          </p>

          <h1 className="mt-4 font-heading text-5xl font-medium leading-tight sm:text-6xl">
            {query ? `Results for "${query}"` : "What are you looking for"}
          </h1>

          <p className="mt-5 text-sm leading-7 text-text-muted sm:text-base">
            {query
              ? "Your search will connect to the Bajwa's Collection catalogue as the product system is completed"
              : "Search products, collections and categories across Bajwa's Collection"}
          </p>
        </div>

        {/* Search field */}
        <div className="mx-auto mt-10 max-w-2xl">
          <div className="flex h-14 items-center gap-3 rounded-full border border-border bg-surface px-5 shadow-[0_8px_30px_rgb(0_0_0_/_0.04)] focus-within:border-primary">
            <Search
              size={19}
              className="shrink-0 text-primary"
            />

            <input
              type="search"
              defaultValue={query}
              placeholder="Search products, collections or categories"
              className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-text-muted"
              aria-label="Search products"
            />

            {query && (
              <Link
                to="/search"
                aria-label="Clear search"
                className="text-text-muted transition hover:text-primary"
              >
                <X size={18} />
              </Link>
            )}
          </div>
        </div>

        {/* Search result area */}
        <div className="mx-auto mt-12 max-w-5xl">
          <div className="border-y border-border py-5">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-medium">
                {query ? "Search results" : "Explore the store"}
              </p>

              {query && (
                <p className="text-xs uppercase tracking-[0.14em] text-text-muted">
                  Catalogue coming next
                </p>
              )}
            </div>
          </div>

          <div className="grid min-h-[360px] place-items-center">
            <div className="max-w-md text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/5 text-primary">
                <Search size={22} />
              </div>

              <h2 className="mt-6 font-heading text-3xl font-medium">
                {query ? "We're preparing your results" : "Start exploring"}
              </h2>

              <p className="mt-4 text-sm leading-7 text-text-muted">
                {query
                  ? "The search interface is connected and ready for the RANI product catalogue"
                  : "Use the search field above to discover products and collections"}
              </p>

              <Link
                to="/shop"
                className="mt-7 inline-flex h-11 items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-white transition hover:bg-primary-hover"
              >
                Browse shop
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default SearchResults;