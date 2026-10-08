import {
  Check,
  ChevronDown,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
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

function DropdownSelect({
  label,
  value,
  options,
  onChange,
  placeholder,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedOption = options.find(
    (option) => option.value === value
  );

  useEffect(() => {
    function handleOutsideClick(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    function handleEscape(event) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );
    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className="relative min-w-0"
    >
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() =>
          setIsOpen((current) => !current)
        }
        className="flex h-11 w-full items-center justify-between gap-4 rounded-xl border border-border bg-surface px-4 text-left transition-colors hover:border-primary/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/10"
      >
        <span className="min-w-0">
          <span className="block text-[9px] font-semibold uppercase tracking-[0.15em] text-text-muted">
            {label}
          </span>

          <span className="mt-0.5 block truncate text-xs font-medium text-text">
            {selectedOption?.label || placeholder}
          </span>
        </span>

        <ChevronDown
          size={15}
          aria-hidden="true"
          className={`shrink-0 text-text-muted transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 top-[calc(100%+7px)] z-40 w-full min-w-[210px] overflow-hidden rounded-xl border border-border bg-surface p-1.5 shadow-xl">
          {options.map((option) => {
            const isSelected =
              option.value === value;

            return (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-xs transition-colors ${
                  isSelected
                    ? "bg-primary/5 font-semibold text-primary"
                    : "text-text hover:bg-surface-muted hover:text-primary"
                }`}
              >
                <span>{option.label}</span>

                {isSelected && (
                  <Check
                    size={13}
                    aria-hidden="true"
                  />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function SortDropdown({
  value,
  onChange,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedOption =
    sortOptions.find(
      (option) => option.value === value
    ) || sortOptions[0];

  useEffect(() => {
    function handleOutsideClick(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    function handleEscape(event) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );
    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className="relative"
    >
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() =>
          setIsOpen((current) => !current)
        }
        className="inline-flex h-10 min-w-[154px] items-center justify-between gap-3 rounded-full border border-border bg-surface px-4 text-xs font-medium text-text transition-colors hover:border-primary/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/10"
      >
        <span className="text-text-muted">
          Sort by
        </span>

        <span className="font-semibold">
          {selectedOption.label}
        </span>

        <ChevronDown
          size={13}
          aria-hidden="true"
          className={`shrink-0 text-text-muted transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-[calc(100%+7px)] z-40 min-w-[210px] overflow-hidden rounded-xl border border-border bg-surface p-1.5 shadow-xl">
          {sortOptions.map((option) => {
            const isSelected =
              option.value === value;

            return (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-xs transition-colors ${
                  isSelected
                    ? "bg-primary/5 font-semibold text-primary"
                    : "text-text hover:bg-surface-muted hover:text-primary"
                }`}
              >
                <span>{option.label}</span>

                {isSelected && (
                  <Check
                    size={13}
                    aria-hidden="true"
                  />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function FilterTag({
  label,
  onRemove,
}) {
  return (
    <span className="inline-flex h-8 items-center gap-2 rounded-full border border-border bg-surface px-3 text-[10px] font-medium text-text">
      <span className="max-w-40 truncate">
        {label}
      </span>

      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove ${label} filter`}
        className="text-text-muted transition-colors hover:text-danger"
      >
        <X size={13} />
      </button>
    </span>
  );
}

function Shop() {
  const [searchParams, setSearchParams] =
    useSearchParams();

  const query = searchParams.get("q") || "";
  const category =
    searchParams.get("category") || "";
  const collection =
    searchParams.get("collection") || "";
  const price =
    searchParams.get("price") || "all";
  const sort =
    searchParams.get("sort") || "featured";

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
      const nextParams =
        new URLSearchParams(searchParams);

      Object.entries(updates).forEach(
        ([key, value]) => {
          if (
            value === undefined ||
            value === null ||
            value === "" ||
            value === "all" ||
            value === "featured"
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
    Number(Boolean(category)) +
    Number(Boolean(collection)) +
    Number(price !== "all") +
    Number(Boolean(query));

  return (
    <main className="min-h-screen bg-background">
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-[1440px] px-5 py-7 sm:px-8 sm:py-9 lg:py-11">
          <Breadcrumbs
            items={[
              {
                label: "Shop",
                href: "/shop",
              },
            ]}
          />

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
              duration: 0.45,
              ease: "easeOut",
            }}
            className="mt-7 max-w-3xl"
          >
            <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-primary sm:text-[10px]">
              Bajwa&apos;s Collection
            </p>

            <h1 className="mt-3 font-heading text-3xl font-medium tracking-[-0.035em] text-text sm:text-4xl lg:text-5xl">
              {selectedCategory
                ? getCategoryLabel(
                    selectedCategory
                  )
                : selectedCollection
                  ? getCollectionLabel(
                      selectedCollection
                    )
                  : "Shop"}
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-text-muted">
              Discover contemporary Pakistani
              fashion designed for everyday
              elegance and special occasions.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-6 sm:px-8 sm:py-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="w-full lg:max-w-xl">
            <SearchBar
              defaultValue={query}
              placeholder="Search products by name"
              onSearch={handleSearch}
            />
          </div>

          <SortDropdown
            value={sort}
            onChange={(value) =>
              updateParams({
                sort: value,
              })
            }
          />
        </div>

        <nav
          aria-label="Shop categories"
          className="mt-7 overflow-x-auto scrollbar-none"
        >
          <div className="flex min-w-max items-center gap-7 border-b border-border">
            <button
              type="button"
              onClick={() =>
                updateParams({
                  category: "",
                })
              }
              className={`relative pb-3 text-xs font-semibold transition-colors ${
                !category
                  ? "text-primary"
                  : "text-text-muted hover:text-text"
              }`}
            >
              All

              {!category && (
                <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-primary" />
              )}
            </button>

            {categories.map((item) => {
              const isActive =
                item.slug === category;

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
                  className={`relative pb-3 text-xs font-semibold transition-colors ${
                    isActive
                      ? "text-primary"
                      : "text-text-muted hover:text-text"
                  }`}
                >
                  {getCategoryLabel(item)}

                  {isActive && (
                    <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-primary" />
                  )}
                </button>
              );
            })}
          </div>
        </nav>

        <div className="mt-6 rounded-2xl border border-border bg-surface p-4 sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/6">
                <SlidersHorizontal
                  size={16}
                  aria-hidden="true"
                  className="text-primary"
                />
              </span>

              <div>
                <p className="text-xs font-semibold text-text">
                  Shop by preference
                </p>

                <p className="mt-0.5 text-[10px] text-text-muted">
                  {total}{" "}
                  {total === 1
                    ? "product"
                    : "products"}{" "}
                  available
                </p>
              </div>

              {activeFilterCount > 0 && (
                <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-primary px-2 text-[10px] font-bold text-primary-foreground">
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
                  className="inline-flex h-8 items-center rounded-full px-3 text-[10px] font-semibold text-primary transition-colors hover:bg-primary/5"
                >
                  Clear all
                </button>
              )}
            </div>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            <DropdownSelect
              label="Collection"
              value={collection}
              onChange={(value) =>
                updateParams({
                  collection: value,
                })
              }
              placeholder="All Collections"
              options={[
                {
                  value: "",
                  label: "All Collections",
                },
                ...collections.map(
                  (item) => ({
                    value: item.slug,
                    label:
                      getCollectionLabel(
                        item
                      ),
                  })
                ),
              ]}
            />

            <DropdownSelect
              label="Price"
              value={price}
              onChange={(value) =>
                updateParams({
                  price: value,
                })
              }
              placeholder="All Prices"
              options={priceOptions}
            />

            <div className="hidden items-center rounded-xl border border-primary/15 bg-primary/[0.035] px-4 lg:flex">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Check
                    size={14}
                    strokeWidth={2.5}
                    aria-hidden="true"
                    className="text-primary"
                  />
                </span>

                <div>
                  <p className="text-xs font-semibold text-text">
                    Available products
                  </p>

                  <p className="mt-0.5 text-[10px] text-text-muted">
                    Ready to explore
                  </p>
                </div>

                <span className="ml-auto h-2 w-2 rounded-full bg-primary" />
              </div>
            </div>
          </div>
        </div>

        <motion.div
          initial={{
            opacity: 0,
            y: 10,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.08,
          }}
          transition={{
            duration: 0.45,
            ease: "easeOut",
          }}
          className="pt-7 sm:pt-9"
        >
          <ProductGrid
            products={products}
            showQuickAdd
          />
        </motion.div>
      </section>
    </main>
  );
}

export default Shop;