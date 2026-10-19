import { useCallback, useMemo } from "react";

import products from "../data/mock/products";
import { getCollectionProductSlugs } from "../data/mock/collections";

const allProducts = products;

function normalizeText(value) {
  if (typeof value === "string") {
    return value.trim().toLowerCase();
  }

  if (typeof value === "number") {
    return String(value);
  }

  return "";
}

function normalizeSlug(value) {
  return normalizeText(value)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getNumericPrice(product) {
  const value = product?.price;

  if (
    value === undefined ||
    value === null ||
    value === ""
  ) {
    return null;
  }

  const price =
    typeof value === "number"
      ? value
      : Number(String(value).replace(/[^\d.-]/g, ""));

  return Number.isFinite(price) ? price : null;
}

function matchesPriceRange(product, price) {
  if (!price || price === "all") {
    return true;
  }

  const productPrice = getNumericPrice(product);

  if (productPrice === null) {
    return false;
  }

  switch (price) {
    case "under-5000":
      return productPrice < 5000;

    case "5000-10000":
      return (
        productPrice >= 5000 &&
        productPrice <= 10000
      );

    case "10000-20000":
      return (
        productPrice > 10000 &&
        productPrice <= 20000
      );

    case "above-20000":
      return productPrice > 20000;

    default:
      return true;
  }
}

function getCategorySlug(product) {
  if (product?.categorySlug) {
    return normalizeSlug(product.categorySlug);
  }

  const category = product?.category;

  if (typeof category === "string") {
    return normalizeSlug(category);
  }

  if (category && typeof category === "object") {
    return normalizeSlug(
      category.slug || category.name || category.title
    );
  }

  return "";
}

function matchesSearch(product, query) {
  const normalizedQuery = normalizeText(query);

  if (!normalizedQuery) {
    return true;
  }

  const searchableValues = [
    product.name,
    product.slug,
    product.description,
    product.shortDescription,
    product.category,
    product.categorySlug,
    product.collection,
    product.collectionSlug,
    ...(Array.isArray(product.tags) ? product.tags : []),
  ];

  const searchableText = searchableValues
    .map((value) => {
      if (typeof value === "string" || typeof value === "number") {
        return String(value);
      }

      if (value && typeof value === "object") {
        return [
          value.name,
          value.title,
          value.label,
          value.slug,
        ]
          .filter(Boolean)
          .join(" ");
      }

      return "";
    })
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return searchableText.includes(normalizedQuery);
}

function matchesCategory(product, category) {
  if (!category) {
    return true;
  }

  return getCategorySlug(product) === normalizeSlug(category);
}

function matchesCollection(
  product,
  collection,
  collectionProductSlugs
) {
  if (!collection) {
    return true;
  }

  const targetCollection = normalizeSlug(collection);

  if (
    normalizeSlug(product.collectionSlug || "") ===
    targetCollection
  ) {
    return true;
  }

  const productCollection =
    typeof product.collection === "string"
      ? product.collection
      : product.collection?.slug ||
        product.collection?.name ||
        product.collection?.title ||
        "";

  if (normalizeSlug(productCollection) === targetCollection) {
    return true;
  }

  return Boolean(
    product.slug &&
      collectionProductSlugs.has(product.slug)
  );
}

function isNewArrival(product) {
  return (
    product.newArrival === true ||
    product.isNew === true ||
    normalizeText(product.badge) === "new in"
  );
}

function matchesProductFilter(product, filter) {
  if (!filter) {
    return true;
  }

  switch (normalizeText(filter)) {
    case "new":
      return isNewArrival(product);

    default:
      // Unknown filters do not accidentally hide all products.
      return true;
  }
}

function getProductTimestamp(product) {
  const dateValue =
    product.createdAt || product.date || null;

  if (!dateValue) {
    return 0;
  }

  const timestamp = new Date(dateValue).getTime();

  return Number.isFinite(timestamp) ? timestamp : 0;
}

function sortProducts(productList, sort) {
  const sortedProducts = [...productList];

  switch (sort) {
    case "price-asc":
      return sortedProducts.sort(
        (a, b) =>
          (getNumericPrice(a) ?? Infinity) -
          (getNumericPrice(b) ?? Infinity)
      );

    case "price-desc":
      return sortedProducts.sort(
        (a, b) =>
          (getNumericPrice(b) ?? -Infinity) -
          (getNumericPrice(a) ?? -Infinity)
      );

    case "name-asc":
      return sortedProducts.sort((a, b) =>
        String(a.name || "").localeCompare(
          String(b.name || "")
        )
      );

    case "newest":
      return sortedProducts.sort(
        (a, b) =>
          getProductTimestamp(b) -
          getProductTimestamp(a)
      );

    case "featured":
    default:
      return sortedProducts.sort(
        (a, b) =>
          Number(b.featured === true) -
          Number(a.featured === true)
      );
  }
}

function useProducts({
  query = "",
  category = "",
  collection = "",
  price = "all",
  sort = "featured",
  filter = "",
} = {}) {
  const collectionProductSlugs = useMemo(() => {
    if (!collection) {
      return new Set();
    }

    const slugs = getCollectionProductSlugs(collection);

    return new Set(Array.isArray(slugs) ? slugs : []);
  }, [collection]);

  const filteredProducts = useMemo(() => {
    const filtered = allProducts.filter((product) => {
      return (
        matchesSearch(product, query) &&
        matchesCategory(product, category) &&
        matchesCollection(
          product,
          collection,
          collectionProductSlugs
        ) &&
        matchesPriceRange(product, price) &&
        matchesProductFilter(product, filter)
      );
    });

    return sortProducts(filtered, sort);
  }, [
    query,
    category,
    collection,
    collectionProductSlugs,
    price,
    sort,
    filter,
  ]);

  const featuredProducts = useMemo(
    () => allProducts.filter((product) => product.featured === true),
    []
  );

  const newArrivals = useMemo(
    () => allProducts.filter(isNewArrival),
    []
  );

  const getProductBySlug = useCallback(
    (slug) =>
      allProducts.find((product) => product.slug === slug),
    []
  );

  const getProductsByCategory = useCallback(
    (categorySlug) =>
      allProducts.filter(
        (product) =>
          getCategorySlug(product) ===
          normalizeSlug(categorySlug)
      ),
    []
  );

  const getProductsByCollection = useCallback(
    (collectionSlug) => {
      const slugs = getCollectionProductSlugs(collectionSlug);
      const collectionSlugs = new Set(
        Array.isArray(slugs) ? slugs : []
      );

      return allProducts.filter((product) =>
        matchesCollection(
          product,
          collectionSlug,
          collectionSlugs
        )
      );
    },
    []
  );

  return {
    products: filteredProducts,
    allProducts,
    featuredProducts,
    newArrivals,
    total: filteredProducts.length,
    isEmpty: filteredProducts.length === 0,
    getProductBySlug,
    getProductsByCategory,
    getProductsByCollection,
  };
}

export default useProducts;