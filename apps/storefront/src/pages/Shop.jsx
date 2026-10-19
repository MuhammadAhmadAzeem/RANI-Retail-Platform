
import {
  Check,
  ChevronDown,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useSearchParams } from "react-router-dom";

import Breadcrumbs from "../components/common/Breadcrumbs";
import SearchBar from "../components/common/SearchBar";
import ProductGrid from "../components/ecommerce/ProductGrid";
import categories from "../data/mock/categories";
import collections from "../data/mock/collections";
import useProducts from "../hooks/useProducts";

const EMPTY_PRODUCTS = [];

const priceOptions = [
  { value: "all", label: "Any price" },
  { value: "under-5000", label: "Under PKR 5,000" },
  { value: "5000-10000", label: "PKR 5,000 – 10,000" },
  { value: "10000-20000", label: "PKR 10,000 – 20,000" },
  { value: "above-20000", label: "Above PKR 20,000" },
];

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A to Z" },
];

const departmentChoices = [
  { value: "women", label: "Women" },
  { value: "men", label: "Men" },
  { value: "unisex", label: "Unisex" },
];

const facetConfig = {
  size: {
    label: "Size",
    productKeys: [
      "size",
      "sizes",
      "availableSizes",
      "available_sizes",
    ],
    variantKeys: ["size"],
  },
  color: {
    label: "Colour",
    productKeys: [
      "color",
      "colour",
      "colors",
      "colours",
      "availableColors",
      "availableColours",
    ],
    variantKeys: ["color", "colour"],
  },
  fabric: {
    label: "Fabric",
    productKeys: [
      "fabric",
      "material",
      "fabricType",
      "fabric_type",
      "materials",
    ],
    variantKeys: ["fabric", "material"],
  },
  pieces: {
    label: "Pieces",
    productKeys: [
      "pieces",
      "pieceCount",
      "piece_count",
      "setType",
      "set_type",
    ],
    variantKeys: [],
  },
};

function getCategoryLabel(category) {
  return (
    category?.name ||
    category?.title ||
    category?.label ||
    "Category"
  );
}

function getCollectionLabel(collection) {
  return (
    collection?.name ||
    collection?.title ||
    collection?.label ||
    "Collection"
  );
}

function normalizeValue(value) {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

function toSlug(value) {
  return normalizeValue(value)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function valuesFromField(value) {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return [];
  }

  const values = Array.isArray(value) ? value : [value];

  return values
    .map((item) => {
      if (
        typeof item === "string" ||
        typeof item === "number"
      ) {
        return String(item).trim();
      }

      if (item && typeof item === "object") {
        const label =
          item.label ||
          item.name ||
          item.title ||
          item.value ||
          item.slug;

        return label ? String(label).trim() : "";
      }

      return "";
    })
    .filter(Boolean);
}

function getProductFacetValues(product, config) {
  const values = [];

  for (const key of config.productKeys) {
    values.push(...valuesFromField(product?.[key]));
    values.push(
      ...valuesFromField(product?.attributes?.[key])
    );
  }

  if (Array.isArray(product?.variants)) {
    for (const variant of product.variants) {
      for (const key of config.variantKeys) {
        values.push(...valuesFromField(variant?.[key]));
      }
    }
  }

  return [
    ...new Map(
      values.map((value) => [
        normalizeValue(value),
        value,
      ])
    ).values(),
  ];
}

function getDepartment(product) {
  const candidates = [
    product?.department,
    product?.gender,
    product?.audience,
    product?.targetAudience,
    product?.targetGender,
    product?.genderCategory,
    product?.categorySlug,
    product?.category,
    ...(Array.isArray(product?.tags) ? product.tags : []),
    product?.name,
    product?.slug,
  ];

  const text = candidates
    .flatMap((value) => valuesFromField(value))
    .join(" ")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ");

  const words = new Set(
    text.split(/\s+/).filter(Boolean)
  );

  if (
    words.has("unisex") ||
    /\ball\s+genders?\b/.test(text)
  ) {
    return "unisex";
  }

  if (
    [
      "women",
      "woman",
      "womens",
      "ladies",
      "lady",
      "female",
      "girl",
      "girls",
    ].some((word) => words.has(word))
  ) {
    return "women";
  }

  if (
    [
      "men",
      "man",
      "mens",
      "gents",
      "gent",
      "male",
      "boy",
      "boys",
    ].some((word) => words.has(word))
  ) {
    return "men";
  }

  return "";
}

function productIsInStock(product) {
  if (typeof product?.inStock === "boolean") {
    return product.inStock;
  }

  if (typeof product?.available === "boolean") {
    return product.available;
  }

  if (typeof product?.isAvailable === "boolean") {
    return product.isAvailable;
  }

  if (typeof product?.stock === "number") {
    return product.stock > 0;
  }

  if (typeof product?.quantity === "number") {
    return product.quantity > 0;
  }

  if (typeof product?.inventory?.quantity === "number") {
    return product.inventory.quantity > 0;
  }

  if (typeof product?.inventory?.stock === "number") {
    return product.inventory.stock > 0;
  }

  if (typeof product?.stockStatus === "string") {
    const status = normalizeValue(product.stockStatus);

    if (
      [
        "in stock",
        "instock",
        "available",
        "low stock",
        "low-stock",
        "lowstock",
      ].includes(status)
    ) {
      return true;
    }

    if (
      [
        "out of stock",
        "out-of-stock",
        "sold out",
        "sold-out",
        "unavailable",
      ].includes(status)
    ) {
      return false;
    }
  }

  return null;
}

function getFacetOptions(productsToScan, config) {
  const uniqueValues = new Map();

  for (const product of productsToScan) {
    for (const value of getProductFacetValues(
      product,
      config
    )) {
      const key = toSlug(value);

      if (key && !uniqueValues.has(key)) {
        uniqueValues.set(key, value);
      }
    }
  }

  return [...uniqueValues.entries()]
    .map(([value, label]) => ({ value, label }))
    .sort((a, b) => a.label.localeCompare(b.label));
}

function getSwatchColor(value) {
  const color = normalizeValue(value);

  const knownColors = {
    black: "#171717",
    white: "#FFFFFF",
    ivory: "#F7F3EC",
    cream: "#F2E5C9",
    beige: "#D8C5A5",
    brown: "#795548",
    burgundy: "#6B1F2A",
    maroon: "#800000",
    red: "#C62828",
    pink: "#E8A1B5",
    rose: "#C77D91",
    green: "#47745B",
    sage: "#A8B5A0",
    blue: "#426A9B",
    navy: "#1E3155",
    grey: "#8C8C8C",
    gray: "#8C8C8C",
    yellow: "#E6C34A",
    orange: "#D47A36",
    purple: "#8052A0",
    gold: "#B08D57",
    silver: "#BFC3C7",
  };

  return knownColors[color] || null;
}

function DropdownSelect({
  label,
  value,
  options,
  onChange,
  placeholder = "All",
  align = "left",
  variant = "filter",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedOption = options.find(
    (option) => option.value === value
  );

  const isSort = variant === "sort";
  const isActive =
    Boolean(value) &&
    !["all", "featured"].includes(value);

  useEffect(() => {
    function handlePointerDown(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener(
      "pointerdown",
      handlePointerDown
    );

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.removeEventListener(
        "pointerdown",
        handlePointerDown
      );

      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative min-w-0">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() =>
          setIsOpen((current) => !current)
        }
        className={`inline-flex h-11 w-full items-center justify-between gap-3 rounded-full border px-4 text-left text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/15 ${
          isSort
            ? "border-border bg-surface hover:border-primary/40 sm:min-w-[190px] sm:w-auto"
            : isActive
              ? "border-primary/45 bg-primary/[0.045] text-primary hover:border-primary/60"
              : "border-border bg-surface text-text hover:border-primary/40"
        }`}
      >
        <span className="min-w-0 truncate">
          {isSort ? (
            <>
              <span className="text-text-muted">
                Sort:{" "}
              </span>
              <span className="font-semibold text-text">
                {selectedOption?.label || "Featured"}
              </span>
            </>
          ) : (
            <>
              <span className="text-text-muted">
                {label}
              </span>
              <span
                className={`ml-2 font-semibold ${
                  isActive ? "text-primary" : "text-text"
                }`}
              >
                {selectedOption?.label || placeholder}
              </span>
            </>
          )}
        </span>

        <ChevronDown
          size={14}
          aria-hidden="true"
          className={`shrink-0 text-text-muted transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div
          className={`absolute top-[calc(100%+8px)] z-[80] min-w-[220px] overflow-hidden rounded-xl border border-border bg-surface p-1.5 shadow-[0_16px_44px_rgba(23,23,23,0.12)] ${
            align === "right" ? "right-0" : "left-0"
          }`}
        >
          <div
            role="listbox"
            aria-label={label || "Sort products"}
          >
            {options.map((option) => {
              const selected = option.value === value;

              return (
                <button
                  key={option.value || "__all__"}
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`flex min-h-10 w-full items-center justify-between gap-4 rounded-lg px-3 py-2.5 text-left text-xs transition-colors ${
                    selected
                      ? "bg-primary/[0.07] font-semibold text-primary"
                      : "text-text hover:bg-surface-muted"
                  }`}
                >
                  <span>{option.label}</span>

                  {selected && (
                    <Check
                      size={14}
                      aria-hidden="true"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function FilterTag({
  label,
  onRemove,
  context = false,
}) {
  return (
    <span
      className={`inline-flex h-8 max-w-full items-center gap-2 rounded-full border px-3 text-[11px] font-medium ${
        context
          ? "border-primary/20 bg-primary/[0.045] text-primary"
          : "border-border bg-surface text-text"
      }`}
    >
      <span className="max-w-40 truncate">
        {label}
      </span>

      {!context && onRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove ${label} filter`}
          className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-text-muted transition-colors hover:bg-surface-muted hover:text-danger focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
        >
          <X size={12} aria-hidden="true" />
        </button>
      )}
    </span>
  );
}

function FacetChips({
  label,
  options,
  selectedValues,
  onToggle,
  colorSwatches = false,
}) {
  if (!options.length) {
    return null;
  }

  return (
    <fieldset className="min-w-0">
      <legend className="mb-3 text-[11px] font-semibold uppercase tracking-[0.13em] text-text-muted">
        {label}
      </legend>

      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const selected = selectedValues.includes(
            option.value
          );

          const swatch = colorSwatches
            ? getSwatchColor(option.label)
            : null;

          const isLightColor = [
            "white",
            "ivory",
            "cream",
          ].includes(normalizeValue(option.label));

          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={selected}
              onClick={() => onToggle(option.value)}
              className={`inline-flex min-h-9 items-center gap-2 rounded-full border px-3 text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 ${
                selected
                  ? "border-primary bg-primary/[0.055] font-semibold text-primary"
                  : "border-border bg-surface text-text hover:border-primary/40"
              }`}
            >
              {colorSwatches && (
                <span
                  aria-hidden="true"
                  className={`h-4 w-4 rounded-full border ${
                    isLightColor
                      ? "border-border"
                      : "border-black/10"
                  }`}
                  style={{
                    backgroundColor: swatch || "#D6D0C8",
                  }}
                />
              )}

              <span>{option.label}</span>

              {selected && (
                <Check size={12} aria-hidden="true" />
              )}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

function SidebarSection({
  title,
  children,
  defaultOpen = true,
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <details
      open={isOpen}
      className="group border-b border-border py-4 last:border-0 last:pb-0"
    >
      <summary
        aria-expanded={isOpen}
        onClick={(event) => {
          event.preventDefault();
          setIsOpen((current) => !current);
        }}
        className="flex cursor-pointer list-none items-center justify-between gap-3 text-xs font-semibold uppercase tracking-[0.12em] text-text marker:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
      >
        <span>{title}</span>

        <ChevronDown
          size={15}
          aria-hidden="true"
          className={`shrink-0 text-text-muted transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </summary>

      <div className="mt-3.5">
        {children}
      </div>
    </details>
  );
}

function SidebarSingleChoices({
  options,
  value,
  onChange,
}) {
  return (
    <div className="max-h-56 space-y-1 overflow-y-auto pr-1">
      {options.map((option) => {
        const selected =
          (option.value || "") === (value || "");

        return (
          <button
            key={option.value || "__all__"}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(option.value)}
            className={`flex min-h-9 w-full items-center justify-between gap-3 rounded-lg px-2.5 py-2 text-left text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 ${
              selected
                ? "bg-primary/[0.055] font-semibold text-primary"
                : "text-text-muted hover:bg-surface-muted hover:text-text"
            }`}
          >
            <span className="min-w-0 truncate">
              {option.label}
            </span>

            {selected && (
              <Check
                size={14}
                aria-hidden="true"
                className="shrink-0"
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

function SidebarFacetChoices({
  options,
  selectedValues,
  onToggle,
  colorSwatches = false,
}) {
  if (!options.length) {
    return null;
  }

  return (
    <div className="max-h-56 space-y-1 overflow-y-auto pr-1">
      {options.map((option) => {
        const selected = selectedValues.includes(
          option.value
        );

        const swatch = colorSwatches
          ? getSwatchColor(option.label)
          : null;

        const isLightColor = [
          "white",
          "ivory",
          "cream",
        ].includes(normalizeValue(option.label));

        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={selected}
            onClick={() => onToggle(option.value)}
            className={`flex min-h-9 w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 ${
              selected
                ? "bg-primary/[0.055] font-semibold text-primary"
                : "text-text-muted hover:bg-surface-muted hover:text-text"
            }`}
          >
            <span
              className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
                selected
                  ? "border-primary bg-primary text-white"
                  : "border-border bg-surface"
              }`}
            >
              {selected && (
                <Check
                  size={11}
                  strokeWidth={2.5}
                  aria-hidden="true"
                />
              )}
            </span>

            {colorSwatches && (
              <span
                aria-hidden="true"
                className={`h-4 w-4 shrink-0 rounded-full border ${
                  isLightColor
                    ? "border-border"
                    : "border-black/10"
                }`}
                style={{
                  backgroundColor: swatch || "#D6D0C8",
                }}
              />
            )}

            <span className="min-w-0 flex-1 truncate">
              {option.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function MobileFilterDrawer({
  open,
  onClose,
  options,
  values,
  setValue,
  facets,
  selectedFacets,
  onToggleFacet,
  availabilityAvailable,
  inStockOnly,
  onAvailabilityChange,
  total,
  onClear,
}) {
  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    function closeOnEscape(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;

      document.removeEventListener(
        "keydown",
        closeOnEscape
      );
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] lg:hidden"
        >
          <motion.button
            type="button"
            aria-label="Close filters"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/35"
          />

          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-filter-title"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              duration: 0.24,
              ease: "easeOut",
            }}
            className="absolute inset-y-0 right-0 flex w-full max-w-[430px] flex-col bg-background shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-border bg-surface px-5 py-4">
              <div>
                <h2
                  id="mobile-filter-title"
                  className="font-heading text-xl text-text"
                >
                  Filter &amp; refine
                </h2>

                <p className="mt-1 text-xs text-text-muted">
                  Find the pieces you love.
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close filter panel"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-text transition-colors hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>

            <div className="flex-1 space-y-5 overflow-y-auto px-5 py-5">
              {options.departments.length > 1 && (
                <DropdownSelect
                  label="Department"
                  value={values.department}
                  options={options.departments}
                  onChange={(value) =>
                    setValue("department", value)
                  }
                  placeholder="All departments"
                />
              )}

              <DropdownSelect
                label="Category"
                value={values.category}
                options={options.categories}
                onChange={(value) =>
                  setValue("category", value)
                }
                placeholder="All categories"
              />

              <DropdownSelect
                label="Collection"
                value={values.collection}
                options={options.collections}
                onChange={(value) =>
                  setValue("collection", value)
                }
                placeholder="All collections"
              />

              <DropdownSelect
                label="Price"
                value={values.price}
                options={priceOptions}
                onChange={(value) =>
                  setValue("price", value)
                }
                placeholder="Any price"
              />

              {(Object.values(facets).some(
                (items) => items.length > 0
              ) || availabilityAvailable) && (
                <div className="space-y-6 border-t border-border pt-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-text-muted">
                    Product details
                  </p>

                  <FacetChips
                    label="Size"
                    options={facets.size}
                    selectedValues={selectedFacets.size}
                    onToggle={(value) =>
                      onToggleFacet("size", value)
                    }
                  />

                  <FacetChips
                    label="Colour"
                    options={facets.color}
                    selectedValues={selectedFacets.color}
                    onToggle={(value) =>
                      onToggleFacet("color", value)
                    }
                    colorSwatches
                  />

                  <FacetChips
                    label="Fabric"
                    options={facets.fabric}
                    selectedValues={selectedFacets.fabric}
                    onToggle={(value) =>
                      onToggleFacet("fabric", value)
                    }
                  />

                  <FacetChips
                    label="Pieces"
                    options={facets.pieces}
                    selectedValues={selectedFacets.pieces}
                    onToggle={(value) =>
                      onToggleFacet("pieces", value)
                    }
                  />

                  {availabilityAvailable && (
                    <label className="flex cursor-pointer items-center justify-between gap-4 border-t border-border pt-4 text-sm text-text">
                      <span>
                        <span className="block text-xs font-semibold">
                          In-stock products
                        </span>

                        <span className="mt-1 block text-[11px] text-text-muted">
                          Hide items that are unavailable
                        </span>
                      </span>

                      <input
                        type="checkbox"
                        checked={inStockOnly}
                        onChange={(event) =>
                          onAvailabilityChange(
                            event.target.checked
                          )
                        }
                        className="h-4 w-4 accent-[#6B1F2A]"
                      />
                    </label>
                  )}
                </div>
              )}

              <div className="border-t border-border pt-5">
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-text-muted">
                  Sort products
                </p>

                <DropdownSelect
                  label="Sort by"
                  value={values.sort}
                  options={sortOptions}
                  onChange={(value) =>
                    setValue("sort", value)
                  }
                  variant="sort"
                />
              </div>
            </div>

            <div className="border-t border-border bg-surface px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={onClear}
                  className="min-h-12 shrink-0 rounded-full px-3 text-xs font-semibold text-text-muted transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
                >
                  Clear all
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="min-h-12 flex-1 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/25 focus-visible:ring-offset-2"
                >
                  Show {total}{" "}
                  {total === 1 ? "product" : "products"}
                </button>
              </div>
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [isMobileFilterOpen, setIsMobileFilterOpen] =
    useState(false);

  const searchString = searchParams.toString();

  const query = searchParams.get("q") || "";
  const department = searchParams.get("department") || "";
  const category = searchParams.get("category") || "";
  const collection = searchParams.get("collection") || "";
  const price = searchParams.get("price") || "all";
  const sort = searchParams.get("sort") || "featured";
  const pageFilter = searchParams.get("filter") || "";
  const isNewIn = pageFilter === "new";

  const selectedFacets = useMemo(() => {
    const currentParams = new URLSearchParams(searchString);

    const readValues = (key) =>
      (currentParams.get(key) || "")
        .split(",")
        .map((value) => value.trim())
        .filter(Boolean);

    return {
      size: readValues("size"),
      color: readValues("color"),
      fabric: readValues("fabric"),
      pieces: readValues("pieces"),
    };
  }, [searchString]);

  const inStockOnly =
    searchParams.get("availability") === "in-stock";

  const {
    products: hookProducts,
    allProducts: sourceProducts,
  } = useProducts({
    query,
    category,
    collection,
    price,
    sort,
    filter: pageFilter,
  });

  const allProducts = Array.isArray(sourceProducts)
    ? sourceProducts
    : EMPTY_PRODUCTS;

  const productsToDisplay = Array.isArray(hookProducts)
    ? hookProducts
    : EMPTY_PRODUCTS;

  const selectedCategory = useMemo(
    () => categories.find((item) => item.slug === category),
    [category]
  );

  const selectedCollection = useMemo(
    () =>
      collections.find((item) => item.slug === collection),
    [collection]
  );

  const facets = useMemo(
    () => ({
      size: getFacetOptions(
        allProducts,
        facetConfig.size
      ),
      color: getFacetOptions(
        allProducts,
        facetConfig.color
      ),
      fabric: getFacetOptions(
        allProducts,
        facetConfig.fabric
      ),
      pieces: getFacetOptions(
        allProducts,
        facetConfig.pieces
      ),
    }),
    [allProducts]
  );

  const availabilityAvailable = useMemo(
    () =>
      allProducts.some(
        (product) => productIsInStock(product) !== null
      ),
    [allProducts]
  );

  const departmentOptions = useMemo(() => {
    const existingDepartments = new Set(
      allProducts.map(getDepartment).filter(Boolean)
    );

    return [
      { value: "", label: "All departments" },
      ...departmentChoices
        .filter((option) =>
          existingDepartments.has(option.value)
        )
        .map((option) => ({
          value: option.value,
          label: option.label,
        })),
    ];
  }, [allProducts]);

  const categoryOptions = useMemo(
    () => [
      { value: "", label: "All categories" },
      ...categories.map((item) => ({
        value: item.slug,
        label: getCategoryLabel(item),
      })),
    ],
    []
  );

  const collectionOptions = useMemo(
    () => [
      { value: "", label: "All collections" },
      ...collections.map((item) => ({
        value: item.slug,
        label: getCollectionLabel(item),
      })),
    ],
    []
  );

  const updateParams = useCallback(
    (updates) => {
      const nextParams = new URLSearchParams(searchString);

      Object.entries(updates).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          const cleanValues = value
            .map((item) => String(item).trim())
            .filter(Boolean);

          if (cleanValues.length > 0) {
            nextParams.set(key, cleanValues.join(","));
          } else {
            nextParams.delete(key);
          }

          return;
        }

        const shouldDelete =
          value === undefined ||
          value === null ||
          value === "" ||
          (key === "price" && value === "all") ||
          (key === "sort" && value === "featured");

        if (shouldDelete) {
          nextParams.delete(key);
        } else {
          nextParams.set(key, String(value));
        }
      });

      nextParams.delete("page");

      // Do not navigate if the URL query has not changed.
      if (nextParams.toString() !== searchString) {
        setSearchParams(nextParams);
      }
    },
    [searchString, setSearchParams]
  );

  const setValue = useCallback(
    (key, value) => updateParams({ [key]: value }),
    [updateParams]
  );

  const handleSearch = useCallback(
    (value) => setValue("q", value),
    [setValue]
  );

  const closeMobileFilters = useCallback(() => {
    setIsMobileFilterOpen(false);
  }, []);

  const toggleFacet = useCallback(
    (key, value) => {
      const currentParams = new URLSearchParams(searchString);

      const current = (currentParams.get(key) || "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

      const next = current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value];

      updateParams({ [key]: next });
    },
    [searchString, updateParams]
  );

  const clearAllFilters = useCallback(() => {
    updateParams({
      department: "",
      category: "",
      collection: "",
      price: "all",
      sort: "featured",
      size: [],
      color: [],
      fabric: [],
      pieces: [],
      availability: "",
    });
  }, [updateParams]);

  const displayProducts = useMemo(
    () =>
      productsToDisplay.filter((product) => {
        if (
          department &&
          getDepartment(product) !== department
        ) {
          return false;
        }

        for (const key of Object.keys(facetConfig)) {
          const selectedValues = selectedFacets[key];

          if (!selectedValues.length) {
            continue;
          }

          const productValues = getProductFacetValues(
            product,
            facetConfig[key]
          ).map(toSlug);

          if (
            !selectedValues.some((value) =>
              productValues.includes(value)
            )
          ) {
            return false;
          }
        }

        if (
          inStockOnly &&
          productIsInStock(product) !== true
        ) {
          return false;
        }

        return true;
      }),
    [
      productsToDisplay,
      department,
      selectedFacets,
      inStockOnly,
    ]
  );

  const activeFacetCount = Object.values(
    selectedFacets
  ).reduce((count, values) => count + values.length, 0);

  const activeFilterCount =
    Number(Boolean(department)) +
    Number(Boolean(category)) +
    Number(Boolean(collection)) +
    Number(price !== "all") +
    activeFacetCount +
    Number(inStockOnly);

  const hasRefinements = Boolean(
    department ||
      category ||
      collection ||
      price !== "all" ||
      activeFacetCount > 0 ||
      inStockOnly
  );

  const hasActiveFilters =
    hasRefinements || Boolean(query);

  const title = isNewIn
    ? "New In"
    : selectedCategory
      ? getCategoryLabel(selectedCategory)
      : selectedCollection
        ? getCollectionLabel(selectedCollection)
        : query
          ? "Search results"
          : "Shop";

  const activeTags = useMemo(() => {
    const tags = [];

    if (department) {
      const departmentOption = departmentOptions.find(
        (item) => item.value === department
      );

      tags.push({
        key: "department",
        label: departmentOption?.label || department,
        onRemove: () => setValue("department", ""),
      });
    }

    if (category) {
      tags.push({
        key: "category",
        label: getCategoryLabel(
          selectedCategory || { name: category }
        ),
        onRemove: () => setValue("category", ""),
      });
    }

    if (collection) {
      tags.push({
        key: "collection",
        label: getCollectionLabel(
          selectedCollection || { name: collection }
        ),
        onRemove: () => setValue("collection", ""),
      });
    }

    if (price !== "all") {
      tags.push({
        key: "price",
        label:
          priceOptions.find(
            (item) => item.value === price
          )?.label || price,
        onRemove: () => setValue("price", "all"),
      });
    }

    if (query) {
      tags.push({
        key: "q",
        label: `Search: ${query}`,
        onRemove: () => setValue("q", ""),
      });
    }

    for (const key of Object.keys(facetConfig)) {
      for (const value of selectedFacets[key]) {
        const option = facets[key].find(
          (item) => item.value === value
        );

        tags.push({
          key: `${key}-${value}`,
          label: `${facetConfig[key].label}: ${
            option?.label || value
          }`,
          onRemove: () => toggleFacet(key, value),
        });
      }
    }

    if (inStockOnly) {
      tags.push({
        key: "availability",
        label: "In stock",
        onRemove: () => setValue("availability", ""),
      });
    }

    return tags;
  }, [
    department,
    departmentOptions,
    category,
    selectedCategory,
    collection,
    selectedCollection,
    price,
    query,
    selectedFacets,
    facets,
    inStockOnly,
    setValue,
    toggleFacet,
  ]);

  return (
    <main className="min-h-screen bg-background">
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-[1440px] px-5 py-7 sm:px-8 sm:py-9 lg:py-11">
          <Breadcrumbs
            items={[{ label: "Shop", href: "/shop" }]}
          />

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              ease: "easeOut",
            }}
            className="mt-7 max-w-3xl"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-primary">
              Bajwa&apos;s Collection
            </p>

            <h1 className="mt-3 font-heading text-3xl font-medium tracking-[-0.035em] text-text sm:text-4xl lg:text-5xl">
              {title}
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-text-muted">
              Discover contemporary Pakistani fashion
              designed for everyday elegance and special
              occasions.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-6 sm:px-8 sm:py-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
          <div className="w-full sm:max-w-xl">
            <SearchBar
              key={query}
              defaultValue={query}
              placeholder="Search products by name"
              onSearch={handleSearch}
            />
          </div>

          <div className="hidden lg:block">
            <DropdownSelect
              label="Sort by"
              value={sort}
              options={sortOptions}
              onChange={(value) => setValue("sort", value)}
              variant="sort"
              align="right"
            />
          </div>
        </div>

        <nav
          aria-label="Shop categories"
          className="mt-6 overflow-x-auto scrollbar-none lg:hidden"
        >
          <div className="flex min-w-max items-center gap-7 border-b border-border">
            <button
              type="button"
              onClick={() => setValue("category", "")}
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
              const active = item.slug === category;

              return (
                <button
                  key={item.slug}
                  type="button"
                  onClick={() =>
                    setValue(
                      "category",
                      active ? "" : item.slug
                    )
                  }
                  className={`relative pb-3 text-xs font-semibold transition-colors ${
                    active
                      ? "text-primary"
                      : "text-text-muted hover:text-text"
                  }`}
                >
                  {getCategoryLabel(item)}

                  {active && (
                    <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-primary" />
                  )}
                </button>
              );
            })}
          </div>
        </nav>

        <div className="mt-5 flex items-center justify-between gap-3 lg:hidden">
          <button
            type="button"
            onClick={() => setIsMobileFilterOpen(true)}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-border bg-surface px-4 text-xs font-semibold text-text transition-colors hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/15"
          >
            <SlidersHorizontal
              size={15}
              aria-hidden="true"
            />

            Filter &amp; sort

            {activeFilterCount > 0 && (
              <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-bold text-primary-foreground">
                {activeFilterCount}
              </span>
            )}
          </button>

          <p className="text-xs text-text-muted">
            <span className="font-semibold text-text">
              {displayProducts.length}
            </span>{" "}
            {displayProducts.length === 1
              ? "product"
              : "products"}
          </p>
        </div>

        <div className="mt-7 grid grid-cols-1 gap-8 lg:grid-cols-[250px_minmax(0,1fr)] xl:grid-cols-[270px_minmax(0,1fr)] xl:gap-10">
          <aside
            className="hidden min-w-0 lg:block"
            aria-label="Product filters"
          >
            <div className="sticky top-6 rounded-2xl border border-border bg-surface p-5">
              <div className="flex items-center justify-between gap-3 border-b border-border pb-4">
                <div>
                  <h2 className="text-sm font-semibold text-text">
                    Filter by
                  </h2>

                  <p className="mt-1 text-[11px] text-text-muted">
                    Refine your selection
                  </p>
                </div>

                {activeFilterCount > 0 && (
                  <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-primary px-2 text-[10px] font-bold text-primary-foreground">
                    {activeFilterCount}
                  </span>
                )}
              </div>

              <div className="mt-1">
                {departmentOptions.length > 1 && (
                  <SidebarSection title="Department">
                    <SidebarSingleChoices
                      options={departmentOptions}
                      value={department}
                      onChange={(value) =>
                        setValue("department", value)
                      }
                    />
                  </SidebarSection>
                )}

                <SidebarSection title="Category">
                  <SidebarSingleChoices
                    options={categoryOptions}
                    value={category}
                    onChange={(value) =>
                      setValue("category", value)
                    }
                  />
                </SidebarSection>

                <SidebarSection
                  title="Collection"
                  defaultOpen={false}
                >
                  <SidebarSingleChoices
                    options={collectionOptions}
                    value={collection}
                    onChange={(value) =>
                      setValue("collection", value)
                    }
                  />
                </SidebarSection>

                <SidebarSection title="Price">
                  <SidebarSingleChoices
                    options={priceOptions}
                    value={price}
                    onChange={(value) =>
                      setValue("price", value)
                    }
                  />
                </SidebarSection>

                {facets.size.length > 0 && (
                  <SidebarSection title="Size">
                    <SidebarFacetChoices
                      options={facets.size}
                      selectedValues={selectedFacets.size}
                      onToggle={(value) =>
                        toggleFacet("size", value)
                      }
                    />
                  </SidebarSection>
                )}

                {facets.color.length > 0 && (
                  <SidebarSection title="Colour">
                    <SidebarFacetChoices
                      options={facets.color}
                      selectedValues={selectedFacets.color}
                      onToggle={(value) =>
                        toggleFacet("color", value)
                      }
                      colorSwatches
                    />
                  </SidebarSection>
                )}

                {facets.fabric.length > 0 && (
                  <SidebarSection
                    title="Fabric"
                    defaultOpen={false}
                  >
                    <SidebarFacetChoices
                      options={facets.fabric}
                      selectedValues={selectedFacets.fabric}
                      onToggle={(value) =>
                        toggleFacet("fabric", value)
                      }
                    />
                  </SidebarSection>
                )}

                {facets.pieces.length > 0 && (
                  <SidebarSection
                    title="Pieces"
                    defaultOpen={false}
                  >
                    <SidebarFacetChoices
                      options={facets.pieces}
                      selectedValues={selectedFacets.pieces}
                      onToggle={(value) =>
                        toggleFacet("pieces", value)
                      }
                    />
                  </SidebarSection>
                )}

                {availabilityAvailable && (
                  <SidebarSection
                    title="Availability"
                    defaultOpen={false}
                  >
                    <label className="flex cursor-pointer items-start gap-2.5 rounded-lg px-2.5 py-2 text-xs text-text-muted transition-colors hover:bg-surface-muted hover:text-text">
                      <input
                        type="checkbox"
                        checked={inStockOnly}
                        onChange={(event) =>
                          setValue(
                            "availability",
                            event.target.checked
                              ? "in-stock"
                              : ""
                          )
                        }
                        className="mt-0.5 h-4 w-4 shrink-0 accent-[#6B1F2A]"
                      />

                      <span>
                        <span className="block font-medium text-text">
                          In stock only
                        </span>

                        <span className="mt-1 block text-[11px] leading-4 text-text-muted">
                          Hide unavailable products
                        </span>
                      </span>
                    </label>
                  </SidebarSection>
                )}
              </div>

              {hasRefinements && (
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="mt-5 inline-flex min-h-10 w-full items-center justify-center rounded-full border border-border px-4 text-xs font-semibold text-text transition-colors hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
                >
                  Clear all filters
                </button>
              )}
            </div>
          </aside>

          <div className="min-w-0">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <p
                className="hidden text-xs text-text-muted lg:block"
                aria-live="polite"
              >
                <span className="font-semibold text-text">
                  {displayProducts.length}
                </span>{" "}
                {displayProducts.length === 1
                  ? "style"
                  : "styles"}
              </p>

              {hasRefinements && (
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="hidden rounded-full px-3 py-2 text-xs font-semibold text-primary transition-colors hover:bg-primary/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/15 lg:inline-flex"
                >
                  Clear all
                </button>
              )}
            </div>

            {(hasActiveFilters || isNewIn) && (
              <div className="mb-5 flex flex-wrap items-center gap-2">
                {isNewIn && (
                  <FilterTag label="New In" context />
                )}

                {activeTags.map((tag) => (
                  <FilterTag
                    key={tag.key}
                    label={tag.label}
                    onRemove={tag.onRemove}
                  />
                ))}

                {hasRefinements && (
                  <button
                    type="button"
                    onClick={clearAllFilters}
                    className="inline-flex h-8 items-center px-2 text-[11px] font-semibold text-text-muted underline decoration-border underline-offset-4 transition-colors hover:text-primary lg:hidden"
                  >
                    Clear all
                  </button>
                )}
              </div>
            )}

            <div className="pt-1 sm:pt-2">
              {displayProducts.length > 0 ? (
                <ProductGrid
                  products={displayProducts}
                  showQuickAdd
                />
              ) : (
                <div className="rounded-2xl border border-border bg-surface px-6 py-12 text-center">
                  <h2 className="font-heading text-xl text-text">
                    No matching styles
                  </h2>

                  <p className="mt-2 text-sm text-text-muted">
                    Try removing one or more filters to see
                    more products.
                  </p>

                  <button
                    type="button"
                    onClick={clearAllFilters}
                    className="mt-5 inline-flex min-h-10 items-center justify-center rounded-full bg-primary px-5 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <MobileFilterDrawer
        open={isMobileFilterOpen}
        onClose={closeMobileFilters}
        options={{
          departments: departmentOptions,
          categories: categoryOptions,
          collections: collectionOptions,
        }}
        values={{
          department,
          category,
          collection,
          price,
          sort,
        }}
        setValue={setValue}
        facets={facets}
        selectedFacets={selectedFacets}
        onToggleFacet={toggleFacet}
        availabilityAvailable={availabilityAvailable}
        inStockOnly={inStockOnly}
        onAvailabilityChange={(checked) =>
          setValue(
            "availability",
            checked ? "in-stock" : ""
          )
        }
        total={displayProducts.length}
        onClear={clearAllFilters}
      />
    </main>
  );
}

export default Shop;
