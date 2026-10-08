import {
  ArrowRight,
  Search,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import {
  useCallback,
  useMemo,
} from "react";
import {
  Link,
  useSearchParams,
} from "react-router-dom";

import Breadcrumbs from "../components/common/Breadcrumbs";
import SearchBar from "../components/common/SearchBar";
import ProductGrid from "../components/ecommerce/ProductGrid";
import {
  searchProducts,
} from "../data/mock/products";

function SearchResults() {
  const [searchParams, setSearchParams] =
    useSearchParams();

  const query =
    searchParams.get("q") || "";

  const normalizedQuery =
    query.trim();

  const results = useMemo(
    () =>
      searchProducts(normalizedQuery),
    [normalizedQuery]
  );

  const handleSearch = useCallback(
    (value) => {
      const nextParams =
        new URLSearchParams(
          searchParams
        );

      const trimmedValue =
        value.trim();

      if (trimmedValue) {
        nextParams.set("q", trimmedValue);
      } else {
        nextParams.delete("q");
      }

      nextParams.delete("page");

      setSearchParams(nextParams);
    },
    [
      searchParams,
      setSearchParams,
    ]
  );

  const clearSearch = useCallback(() => {
    setSearchParams({});
  }, [setSearchParams]);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_12%_8%,rgba(107,31,42,0.08),transparent_28%),radial-gradient(circle_at_88%_18%,rgba(176,141,87,0.1),transparent_24%),linear-gradient(180deg,#FAF7F1_0%,#F7F3EC_48%,#FBF9F5_100%)]">
      <section className="border-b border-border bg-white/55 backdrop-blur-[2px]">
        <div className="mx-auto max-w-[1440px] px-5 py-5 sm:px-8">
          <Breadcrumbs
            items={[
              {
                label: "Search",
                href: "/search",
              },
            ]}
          />
        </div>
      </section>

      <section className="border-b border-border bg-white/55 backdrop-blur-[2px]">
        <div className="mx-auto max-w-[1440px] px-5 py-10 sm:px-8 sm:py-14 lg:py-16">
          <div className="mx-auto max-w-3xl">
            <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-primary sm:text-[10px]">
              Bajwa&apos;s Collection
            </p>

            <h1 className="mt-3 font-heading text-3xl font-medium tracking-[-0.04em] text-text sm:text-4xl lg:text-5xl">
              Search
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-text-muted">
              Find products across our collection
              by name, category or collection.
            </p>

            <div className="relative mt-7">
              <SearchBar
                defaultValue={query}
                placeholder="Search products..."
                onSearch={handleSearch}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-8 sm:px-8 sm:py-10">
        {normalizedQuery ? (
          <>
            <div className="flex flex-col gap-4 border-b border-border pb-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-text-muted">
                  Search results
                </p>

                <h2 className="mt-2 font-heading text-2xl font-medium tracking-[-0.03em] text-text sm:text-3xl">
                  {results.length}{" "}
                  {results.length === 1
                    ? "result"
                    : "results"}
                </h2>
              </div>

              <button
                type="button"
                onClick={clearSearch}
                className="inline-flex h-9 w-fit items-center gap-2 rounded-full border border-border bg-white/70 px-4 text-[10px] font-semibold uppercase tracking-[0.1em] text-text transition-colors hover:border-primary/30 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/10"
              >
                <X
                  size={13}
                  aria-hidden="true"
                />
                Clear search
              </button>
            </div>

            <motion.div
              initial={{
                opacity: 0,
                y: 8,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.35,
                ease: "easeOut",
              }}
              className="pt-7 sm:pt-9"
            >
              {results.length > 0 ? (
                <ProductGrid
                  products={results}
                  showQuickAdd
                />
              ) : (
                <div className="flex min-h-[320px] items-center justify-center border border-dashed border-border bg-white/40 px-6 py-12 text-center backdrop-blur-[1px]">
                  <div className="max-w-md">
                    <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white text-primary shadow-sm">
                      <Search
                        size={18}
                        aria-hidden="true"
                      />
                    </span>

                    <p className="mt-5 text-[9px] font-bold uppercase tracking-[0.22em] text-primary">
                      No matches
                    </p>

                    <h3 className="mt-2 font-heading text-2xl font-medium tracking-[-0.03em] text-text">
                      Nothing found for &quot;
                      {query}&quot;
                    </h3>

                    <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-text-muted">
                      Try another product name,
                      category or collection.
                    </p>

                    <Link
                      to="/shop"
                      className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-primary transition-colors hover:text-primary-hover"
                    >
                      Browse shop
                      <ArrowRight
                        size={14}
                        aria-hidden="true"
                      />
                    </Link>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        ) : (
          <div className="flex min-h-[220px] items-center justify-center px-6 py-12 text-center">
            <div className="max-w-md">
              <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white/75 text-primary">
                <Search
                  size={17}
                  aria-hidden="true"
                />
              </span>

              <h2 className="mt-5 font-heading text-2xl font-medium tracking-[-0.03em] text-text">
                What are you looking for?
              </h2>

              <p className="mt-2 text-sm leading-6 text-text-muted">
                Search by product, category or
                collection.
              </p>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

export default SearchResults;