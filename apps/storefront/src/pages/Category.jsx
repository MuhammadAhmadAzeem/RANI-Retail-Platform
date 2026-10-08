import {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { motion } from "motion/react";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Link,
  useParams,
} from "react-router-dom";

import ProductGrid from "../components/ecommerce/ProductGrid";
import {
  getCategoryBySlug,
} from "../data/mock/categories";
import {
  getProductsByCategory,
} from "../data/mock/products";

const sortOptions = [
  {
    value: "featured",
    label: "Recommended",
  },
  {
    value: "name",
    label: "Name",
  },
  {
    value: "price-low",
    label: "Price: Low",
  },
  {
    value: "price-high",
    label: "Price: High",
  },
];


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
        aria-haspopup="true"
        aria-expanded={isOpen}
        onClick={() =>
          setIsOpen((current) => !current)
        }
        className="inline-flex h-10 items-center gap-3 rounded-full border border-border bg-surface px-4 text-[10px] font-semibold uppercase tracking-[0.12em] text-text transition-colors hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
      >
        <span className="text-text-muted">
          Sort
        </span>

        <span>
          {selectedOption.label}
        </span>

        <ChevronDown
          size={13}
          aria-hidden="true"
          className={`text-text-muted transition-transform duration-200 ${isOpen ? "rotate-180" : ""
            }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-[calc(100%+8px)] z-30 min-w-[190px] overflow-hidden rounded-xl border border-border bg-surface p-1.5 shadow-lg">
          {sortOptions.map((option) => {
            const isSelected =
              option.value === value;

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-[10px] font-semibold uppercase tracking-[0.1em] transition-colors ${isSelected
                  ? "bg-primary/5 text-primary"
                  : "text-text hover:bg-surface-muted hover:text-primary"
                  }`}
              >
                <span>
                  {option.label}
                </span>

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

function Category() {
  const { slug } = useParams();

  const category =
    getCategoryBySlug(slug);

  const categoryProducts = useMemo(() => {
    if (!category) {
      return [];
    }

    return getProductsByCategory(
      category.slug
    );
  }, [category]);

  const [
    activeCollection,
    setActiveCollection,
  ] = useState("all");

  const [sortBy, setSortBy] =
    useState("featured");

  const categoryImage =
    category?.bannerImage ||
    category?.image;

  const editorialImage =
    category?.image ||
    category?.bannerImage;

  const subcategories =
    category?.subcategories || [];

  const collectionLinks = useMemo(() => {
    const collections = new Map();

    categoryProducts.forEach(
      (product) => {
        if (
          product.collectionSlug &&
          product.collection
        ) {
          collections.set(
            product.collectionSlug,
            product.collection
          );
        }
      }
    );

    return Array.from(
      collections.entries()
    );
  }, [categoryProducts]);

  const filteredProducts = useMemo(() => {
    let products =
      activeCollection === "all"
        ? [...categoryProducts]
        : categoryProducts.filter(
          (product) =>
            product.collectionSlug ===
            activeCollection
        );

    switch (sortBy) {
      case "price-low":
        products.sort(
          (a, b) => a.price - b.price
        );
        break;

      case "price-high":
        products.sort(
          (a, b) => b.price - a.price
        );
        break;

      case "name":
        products.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        break;

      case "featured":
      default:
        products.sort(
          (a, b) =>
            Number(Boolean(b.featured)) -
            Number(Boolean(a.featured))
        );
        break;
    }

    return products;
  }, [
    activeCollection,
    categoryProducts,
    sortBy,
  ]);

  if (!category) {
    return (
      <main className="bg-background">
        <section className="mx-auto flex min-h-[65vh] max-w-[1440px] items-center justify-center px-5 py-16 sm:px-8">
          <div className="max-w-md text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary">
              Bajwa&apos;s Collection
            </p>

            <h1 className="mt-4 font-heading text-3xl font-medium tracking-[-0.035em] text-text sm:text-4xl">
              Category not found
            </h1>

            <p className="mt-4 text-sm leading-6 text-text-muted">
              The category you are looking for is
              not available right now.
            </p>

            <Link
              to="/shop"
              className="mt-7 inline-flex h-10 items-center gap-2 rounded-full bg-primary px-5 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
            >
              Explore shop
              <ArrowRight
                size={14}
                aria-hidden="true"
              />
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="bg-background">
      {/* Breadcrumb */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-[1440px] px-5 py-4 sm:px-8">
          <div className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.12em] text-text-muted">
            <Link
              to="/"
              className="transition-colors hover:text-primary"
            >
              Home
            </Link>

            <ChevronRight
              size={12}
              aria-hidden="true"
            />

            <Link
              to="/shop"
              className="transition-colors hover:text-primary"
            >
              Shop
            </Link>

            <ChevronRight
              size={12}
              aria-hidden="true"
            />

            <span className="text-text">
              {category.name}
            </span>
          </div>
        </div>
      </section>

      {/* Hero */}
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-[1440px] px-5 py-8 sm:px-8 sm:py-10 lg:py-14">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_430px] lg:gap-12">
            <div className="max-w-2xl">
              <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-primary sm:text-[10px]">
                Bajwa&apos;s Collection
              </p>

              <h1 className="mt-3 font-heading text-3xl font-medium leading-tight tracking-[-0.04em] text-text sm:text-4xl lg:text-5xl">
                {category.name}
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-6 text-text-muted">
                {category.description}
              </p>

              {subcategories.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3">
                  {subcategories.map(
                    (item) => {
                      const itemLabel =
                        typeof item ===
                          "string"
                          ? item
                          : item.name ||
                          item.title ||
                          item.label;

                      const itemSlug =
                        typeof item ===
                          "string"
                          ? item
                            .toLowerCase()
                            .replace(
                              /\s+/g,
                              "-"
                            )
                          : item.slug;

                      return (
                        <Link
                          key={
                            itemSlug ||
                            itemLabel
                          }
                          to={
                            itemSlug
                              ? `/category/${category.slug}?subcategory=${itemSlug}`
                              : `/category/${category.slug}`
                          }
                          className="group inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-text transition-colors hover:text-primary"
                        >
                          {itemLabel}

                          <ChevronRight
                            size={12}
                            aria-hidden="true"
                            className="transition-transform duration-200 group-hover:translate-x-0.5"
                          />
                        </Link>
                      );
                    }
                  )}
                </div>
              )}

              <Link
                to="/shop"
                className="mt-7 inline-flex h-10 items-center gap-2 rounded-full bg-primary px-5 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
              >
                Shop all
                <ArrowRight
                  size={14}
                  aria-hidden="true"
                />
              </Link>
            </div>

            {categoryImage && (
              <div className="mx-auto w-full max-w-[430px] overflow-hidden rounded-2xl bg-surface-muted">
                <div className="aspect-[4/5]">
                  <img
                    src={categoryImage}
                    alt={`${category.name} collection`}
                    className="h-full w-full object-contain"
                    loading="eager"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Category edit */}
      <section className="border-y border-border bg-linear-to-br from-surface-muted via-background to-primary/10">
        <div className="mx-auto max-w-[1440px] px-5 py-11 sm:px-8 sm:py-13 lg:py-16">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-primary sm:text-[10px]">
                {category.name} edit
              </p>

              <h2 className="mt-3 font-heading text-2xl font-medium leading-tight tracking-[-0.035em] text-text sm:text-3xl lg:text-4xl">
                {category.shortDescription}
              </h2>
            </div>

            <p className="shrink-0 text-[9px] font-semibold uppercase tracking-[0.15em] text-text-muted sm:text-[10px]">
              {categoryProducts.length}{" "}
              {categoryProducts.length === 1
                ? "Piece"
                : "Pieces"}
            </p>
          </div>
        </div>
      </section>

      {/* Product catalog */}
      <section>
        <div className="mx-auto max-w-[1440px] px-5 py-8 sm:px-8 sm:py-10 lg:py-12">
          <div className="flex flex-col gap-5 border-b border-border pb-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-primary sm:text-[10px]">
                Shop the edit
              </p>

              <h2 className="mt-2 font-heading text-2xl font-medium tracking-[-0.03em] text-text sm:text-3xl">
                {category.name}
              </h2>
            </div>

            <SortDropdown
              value={sortBy}
              onChange={setSortBy}
            />
          </div>

          {collectionLinks.length > 0 && (
            <div className="mt-5 overflow-x-auto pb-1 scrollbar-none">
              <div className="flex min-w-max items-center gap-6">
                <button
                  type="button"
                  onClick={() =>
                    setActiveCollection("all")
                  }
                  className={`relative pb-2 text-[10px] font-semibold uppercase tracking-[0.12em] transition-colors ${activeCollection === "all"
                    ? "text-primary"
                    : "text-text-muted hover:text-text"
                    }`}
                >
                  All

                  {activeCollection ===
                    "all" && (
                      <span className="absolute inset-x-0 bottom-0 h-px bg-primary" />
                    )}
                </button>

                {collectionLinks.map(
                  ([
                    collectionSlug,
                    collectionName,
                  ]) => {
                    const isActive =
                      activeCollection ===
                      collectionSlug;

                    return (
                      <button
                        key={collectionSlug}
                        type="button"
                        onClick={() =>
                          setActiveCollection(
                            collectionSlug
                          )
                        }
                        className={`relative pb-2 text-[10px] font-semibold uppercase tracking-[0.12em] transition-colors ${isActive
                          ? "text-primary"
                          : "text-text-muted hover:text-text"
                          }`}
                      >
                        {collectionName}

                        {isActive && (
                          <span className="absolute inset-x-0 bottom-0 h-px bg-primary" />
                        )}
                      </button>
                    );
                  }
                )}
              </div>
            </div>
          )}

          <div className="pt-7 sm:pt-9">
            <ProductGrid
              products={filteredProducts}
              showQuickAdd
            />
          </div>
        </div>
      </section>

      {/* Brand collection CTA */}
      <section className="relative isolate overflow-hidden bg-charcoal text-primary-foreground">
        {editorialImage && (
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-20 bg-cover bg-center opacity-20"
            style={{
              backgroundImage: `url("${editorialImage}")`,
            }}
          />
        )}

        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-charcoal/90"
        />

        <div className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 sm:py-14 lg:py-16">
          <div className="flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-primary sm:text-[10px]">
                Bajwa&apos;s Collection
              </p>

              <h2 className="mt-3 font-heading text-2xl font-medium tracking-[-0.03em] text-primary-foreground sm:text-3xl lg:text-4xl">
                Signature Collection
              </h2>

              <div className="mt-4 h-px w-10 bg-primary/70" />
            </div>

            <motion.div
              initial={{
                opacity: 0,
                y: 8,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.4,
              }}
              transition={{
                duration: 0.45,
                ease: "easeOut",
              }}
            >
              <motion.div
                whileHover={{
                  x: 4,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                transition={{
                  type: "spring",
                  stiffness: 350,
                  damping: 24,
                }}
              >
                <Link
                  to={`/shop?category=${category.slug}`}
                  className="group inline-flex items-center gap-3 text-xs font-semibold text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal"
                >
                  Continue shopping

                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-primary-foreground/20 transition-colors duration-200 group-hover:border-primary-foreground/60 group-hover:bg-primary-foreground/10">
                    <ArrowRight
                      size={13}
                      aria-hidden="true"
                      className="transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                  </span>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Category;