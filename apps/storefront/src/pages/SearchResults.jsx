
import {
  ArrowLeft,
  Search,
} from "lucide-react";
import { useCallback } from "react";
import {
  Link,
  useSearchParams,
} from "react-router-dom";

import SearchBar from "../components/common/SearchBar";
import ProductGrid from "../components/ecommerce/ProductGrid";
import { searchProducts } from "../data/mock/products";

function SearchResults() {
  const [searchParams, setSearchParams] =
    useSearchParams();

  const query = searchParams.get("q")?.trim() || "";
  const results = query ? searchProducts(query) : [];

  const handleSearch = useCallback((value) => {
    const normalizedValue = value.trim();

    if (normalizedValue) {
      setSearchParams({ q: normalizedValue });
      return;
    }

    setSearchParams({});
  }, [setSearchParams]);

  const handleSubmit = (value) => {
    handleSearch(value);
  };

  const handleClear = () => {
    setSearchParams({});
  };

  return (
    <main className="min-h-[70vh] bg-background">
      <section className="mx-auto max-w-[1440px] px-5 py-8 sm:px-8 sm:py-10 lg:py-12">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-text-muted transition hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
        >
          <ArrowLeft size={15} aria-hidden="true" />
          Back to home
        </Link>

        {/* Dark Premium Search Hero */}
        <section className="relative isolate mt-8 overflow-hidden rounded-3xl border border-white/10 bg-[#171316] px-5 py-14 shadow-xl shadow-black/5 sm:mt-10 sm:px-10 sm:py-20 lg:py-24">
          {/* Burgundy ambient glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#792638]/35 blur-3xl transition-all duration-700 sm:h-96 sm:w-96"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-[#5d2837]/25 blur-3xl sm:h-96 sm:w-96"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.04] via-transparent to-[#7b2439]/10"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-3xl border border-white/[0.04]"
          />

          <div className="relative mx-auto max-w-4xl text-center">
            <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.05] px-4 py-2 backdrop-blur-sm transition duration-300 hover:border-[#c58b98]/50 hover:bg-white/[0.08]">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-[#d8a0ad] shadow-[0_0_10px_rgba(216,160,173,0.8)]"
              />
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#e5c5cc] sm:text-xs">
                Bajwa's Collection
              </span>
            </div>

            <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#c58b98] sm:text-xs">
              Find your signature style
            </p>

            <h1 className="mx-auto max-w-4xl break-words font-heading text-4xl font-medium leading-[1.12] tracking-tight text-[#faf6f2] sm:text-6xl lg:text-7xl">
              {query ? (
                <>
                  Results for{" "}
                  <span className="italic text-[#d6a0ad]">
                    "{query}"
                  </span>
                </>
              ) : (
                <>
                  Your next favourite,
                  <br className="hidden sm:block" />{" "}
                  <span className="italic text-[#d6a0ad]">
                    starts here.
                  </span>
                </>
              )}
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-[#c5b9bd] sm:text-base">
              {query
                ? "Explore matching styles from our curated collection."
                : "Explore timeless styles, signature collections and pieces made for every occasion."}
            </p>

            {/* Contrasting search input */}
            <div className="mx-auto mt-9 max-w-2xl rounded-2xl border border-white/15 bg-white/[0.06] p-2 shadow-[0_15px_50px_rgba(0,0,0,0.2)] backdrop-blur-md transition-all duration-300 hover:border-[#c58b98]/40 focus-within:border-[#d6a0ad]/70 focus-within:shadow-[0_0_30px_rgba(160,65,88,0.12)] sm:mt-10 sm:rounded-full">
              <SearchBar
                defaultValue={query}
                placeholder="Search by product, collection or SKU..."
                onSearch={handleSearch}
                onSubmit={handleSubmit}
                debounceDelay={300}
                minSearchLength={0}
                className="border-0 bg-[#f8f5f1] shadow-none focus-within:ring-0"
                inputClassName="text-[#242024] placeholder:text-[#898087]"
              />
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[9px] font-medium uppercase tracking-[0.18em] text-[#b8a8ad] sm:gap-x-4 sm:text-[10px]">
              <span>Discover</span>
              <span
                aria-hidden="true"
                className="h-1 w-1 rounded-full bg-[#a65b70]"
              />
              <span>Explore</span>
              <span
                aria-hidden="true"
                className="h-1 w-1 rounded-full bg-[#a65b70]"
              />
              <span>Find your style</span>
            </div>
          </div>
        </section>

        {/* Search Results */}
        <div className="mx-auto mt-10 max-w-6xl sm:mt-12">
          <div className="border-y border-border py-5">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-medium text-text">
                {query
                  ? `${results.length} ${
                      results.length === 1
                        ? "result"
                        : "results"
                    } found`
                  : "Search the collection"}
              </p>

              {query && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="w-fit text-xs font-semibold uppercase tracking-[0.14em] text-text-muted transition hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                >
                  Clear search
                </button>
              )}
            </div>
          </div>

          <div className="pt-8">
            {query ? (
              results.length > 0 ? (
                <ProductGrid products={results} />
              ) : (
                <div className="flex min-h-[360px] items-center justify-center rounded-2xl border border-dashed border-border bg-surface px-6 py-16 text-center">
                  <div className="max-w-md">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/5 text-primary">
                      <Search
                        size={22}
                        aria-hidden="true"
                      />
                    </div>

                    <h2 className="mt-6 font-heading text-3xl font-medium">
                      No products found
                    </h2>

                    <p className="mt-4 text-sm leading-7 text-text-muted">
                      We couldn't find any products matching
                      "{query}". Try another product name,
                      category or SKU.
                    </p>

                    <button
                      type="button"
                      onClick={handleClear}
                      className="mt-7 inline-flex h-11 items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                    >
                      Clear search
                    </button>
                  </div>
                </div>
              )
            ) : (
              <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-border bg-surface px-6 py-16 text-center sm:min-h-[360px]">
                <div className="max-w-md">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/5 text-primary">
                    <Search
                      size={22}
                      aria-hidden="true"
                    />
                  </div>

                  <h2 className="mt-6 font-heading text-3xl font-medium">
                    Start exploring
                  </h2>

                  <p className="mt-4 text-sm leading-7 text-text-muted">
                    Search by product name, category or SKU
                    to discover products from Bajwa's
                    Collection.
                  </p>

                  <Link
                    to="/shop"
                    className="mt-7 inline-flex h-11 items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                  >
                    Browse shop
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

export default SearchResults;