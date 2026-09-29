import {
  Check,
  ChevronDown,
  SlidersHorizontal,
  X,
} from "lucide-react";
import {
  useCallback,
  useMemo,
} from "react";
import {
  useSearchParams,
} from "react-router-dom";

import Breadcrumbs from "../components/common/Breadcrumbs";
import SearchBar from "../components/common/SearchBar";
import ProductGrid from "../components/ecommerce/ProductGrid";
import categories from "../data/mock/categories";
import collections from "../data/mock/collections";
import useProducts from "../hooks/useProducts";

const priceOptions = [
  {
    value: "all",
    label: "All Prices",
  },
  {
    value: "under-5000",
    label: "Under PKR 5,000",
  },
  {
    value: "5000-10000",
    label: "PKR 5,000 – 10,000",
  },
  {
    value: "10000-20000",
    label: "PKR 10,000 – 20,000",
  },
  {
    value: "above-20000",
    label: "Above PKR 20,000",
  },
];

const sortOptions = [
  {
    value: "featured",
    label: "Featured",
  },
  {
    value: "newest",
    label: "Newest",
  },
  {
    value: "price-asc",
    label: "Price: Low to High",
  },
  {
    value: "price-desc",
    label: "Price: High to Low",
  },
  {
    value: "name-asc",
    label: "Name: A to Z",
  },
];

function getCategoryLabel(category) {
  return category.name || category.title || category.label;
}

function getCollectionLabel(collection) {
  return collection.name || collection.title || collection.label;
}

function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("q") || "";
  const category = searchParams.get("category") || "";
  const collection = searchParams.get("collection") || "";
  const price = searchParams.get("price") || "all";
  const sort = searchParams.get("sort") || "featured";

  const {
    products,
    total,
  } = useProducts({
    query,
    category,
    collection,
    price,
    sort,
  });

  const selectedCategory = useMemo(
    () =>
      categories.find(
        (item) => item.slug === category
      ),
    [category]
  );

  const selectedCollection = useMemo(
    () =>
      collections.find(
        (item) => item.slug === collection
      ),
    [collection]
  );

  const updateParams = useCallback(
    (updates, options = {}) => {
      const nextParams = new URLSearchParams(
        searchParams
      );

      Object.entries(updates).forEach(
        ([key, value]) => {
          if (
            value === undefined ||
            value === null ||
            value === "" ||
            value === "all"
          ) {
            nextParams.delete(key);
          } else {
            nextParams.set(key, value);
          }
        }
      );

      if (options.resetPage !== false) {
        nextParams.delete("page");
      }

      setSearchParams(nextParams);
    },
    [searchParams, setSearchParams]
  );

  const handleSearch = useCallback(
    (value) => {
      updateParams({
        q: value,
      });
    },
    [updateParams]
  );

  const clearAllFilters = useCallback(() => {
    setSearchParams({});
  }, [setSearchParams]);

  const hasActiveFilters =
    Boolean(query) ||
    Boolean(category) ||
    Boolean(collection) ||
    price !== "all" ||
    sort !== "featured";

  const activeFilterCount =
    Number(Boolean(query)) +
    Number(Boolean(category)) +
    Number(Boolean(collection)) +
    Number(price !== "all") +
    Number(sort !== "featured");

  return (
    <main className="min-h-screen bg-background">
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <Breadcrumbs
            items={[
              {
                label: "Shop",
                href: "/shop",
              },
            ]}
          />

          <div className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Bajwa&apos;s Collection
            </p>

            <h1 className="mt-3 font-serif text-4xl font-medium tracking-tight text-text sm:text-5xl">
              {selectedCategory
                ? getCategoryLabel(selectedCategory)
                : selectedCollection
                  ? getCollectionLabel(
                      selectedCollection
                    )
                  : "Shop"}
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-text-muted sm:text-base">
              Explore curated Pakistani fashion pieces
              crafted for everyday elegance and timeless
              style
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="w-full lg:max-w-md">
            <SearchBar
              defaultValue={query}
              placeholder="Search products by name"
              onSearch={handleSearch}
            />
          </div>

          <div className="flex items-center gap-3">
            <label
              htmlFor="sort-products"
              className="hidden text-sm font-medium text-text-muted sm:block"
            >
              Sort by
            </label>

            <div className="relative w-full sm:w-auto">
              <select
                id="sort-products"
                value={sort}
                onChange={(event) =>
                  updateParams({
                    sort: event.target.value,
                  })
                }
                className="h-11 w-full appearance-none rounded-full border border-border bg-surface px-4 pr-10 text-sm font-medium text-text outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 sm:w-52"
              >
                {sortOptions.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </select>

              <ChevronDown
                size={17}
                aria-hidden="true"
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-text-muted"
              />
            </div>
          </div>
        </div>

        <div className="mt-5 flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            type="button"
            onClick={() =>
              updateParams({
                category: "",
              })
            }
            className={`inline-flex h-9 shrink-0 items-center rounded-full border px-4 text-xs font-semibold transition ${
              !category
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-surface text-text hover:border-primary/40 hover:text-primary"
            }`}
          >
            All
          </button>

          {categories.map((item) => {
            const isActive = item.slug === category;

            return (
              <button
                key={item.slug}
                type="button"
                onClick={() =>
                  updateParams({
                    category: isActive
                      ? ""
                      : item.slug,
                  })
                }
                className={`inline-flex h-9 shrink-0 items-center rounded-full border px-4 text-xs font-semibold transition ${
                  isActive
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-surface text-text hover:border-primary/40 hover:text-primary"
                }`}
              >
                {getCategoryLabel(item)}
              </button>
            );
          })}
        </div>

        <div className="sticky top-0 z-20 mt-6 border-y border-border bg-background/95 py-4 backdrop-blur">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <SlidersHorizontal
                size={18}
                aria-hidden="true"
                className="text-primary"
              />

              <p className="text-sm text-text-muted">
                <span className="font-semibold text-text">
                  {total}
                </span>{" "}
                {total === 1
                  ? "product"
                  : "products"}
              </p>

              {activeFilterCount > 0 && (
                <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-primary px-2 text-[11px] font-bold text-primary-foreground">
                  {activeFilterCount}
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {category && (
                <FilterTag
                  label={getCategoryLabel(
                    selectedCategory || {
                      name: category,
                    }
                  )}
                  onRemove={() =>
                    updateParams({
                      category: "",
                    })
                  }
                />
              )}

              {collection && (
                <FilterTag
                  label={getCollectionLabel(
                    selectedCollection || {
                      name: collection,
                    }
                  )}
                  onRemove={() =>
                    updateParams({
                      collection: "",
                    })
                  }
                />
              )}

              {price !== "all" && (
                <FilterTag
                  label={
                    priceOptions.find(
                      (option) =>
                        option.value === price
                    )?.label || price
                  }
                  onRemove={() =>
                    updateParams({
                      price: "all",
                    })
                  }
                />
              )}

              {query && (
                <FilterTag
                  label={`"${query}"`}
                  onRemove={() =>
                    updateParams({
                      q: "",
                    })
                  }
                />
              )}

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="inline-flex h-8 items-center gap-1 rounded-full px-3 text-xs font-semibold text-primary transition hover:bg-primary/5"
                >
                  Clear all
                </button>
              )}
            </div>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <FilterSelect
              label="Collection"
              value={collection}
              onChange={(value) =>
                updateParams({
                  collection: value,
                })
              }
            >
              <option value="">
                All Collections
              </option>

              {collections.map((item) => (
                <option
                  key={item.slug}
                  value={item.slug}
                >
                  {getCollectionLabel(item)}
                </option>
              ))}
            </FilterSelect>

            <FilterSelect
              label="Price"
              value={price}
              onChange={(value) =>
                updateParams({
                  price: value,
                })
              }
            >
              {priceOptions.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </option>
              ))}
            </FilterSelect>

            <div className="hidden items-center gap-2 rounded-xl border border-border bg-surface px-4 py-3 lg:flex">
              <Check
                size={17}
                aria-hidden="true"
                className="text-success"
              />

              <span className="text-sm text-text-muted">
                Showing available products
              </span>
            </div>
          </div>
        </div>

        <div className="py-8 sm:py-10">
          <ProductGrid
            products={products}
            showQuickAdd
          />
        </div>
      </section>
    </main>
  );
}

function FilterTag({ label, onRemove }) {
  return (
    <span className="inline-flex h-8 items-center gap-2 rounded-full border border-border bg-surface px-3 text-xs font-medium text-text">
      <span className="max-w-40 truncate">
        {label}
      </span>

      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove ${label} filter`}
        className="text-text-muted transition hover:text-danger"
      >
        <X size={14} />
      </button>
    </span>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  children,
}) {
  const id = `shop-filter-${label
    .toLowerCase()
    .replace(/\s+/g, "-")}`;

  return (
    <div className="relative">
      <label
        htmlFor={id}
        className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-text-muted"
      >
        {label}
      </label>

      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(event) =>
            onChange(event.target.value)
          }
          className="h-11 w-full appearance-none rounded-xl border border-border bg-surface px-4 pr-10 text-sm text-text outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
        >
          {children}
        </select>

        <ChevronDown
          size={16}
          aria-hidden="true"
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-text-muted"
        />
      </div>
    </div>
  );
}

export default Shop;