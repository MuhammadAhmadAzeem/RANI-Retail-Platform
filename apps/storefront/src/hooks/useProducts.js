import { useMemo } from "react";

import products from "../data/mock/products";
import { getCollectionProductSlugs } from "../data/mock/collections";

const allProducts = products;

function matchesPriceRange(product, price) {
  if (!price || price === "all") {
    return true;
  }

  const productPrice = Number(product.price);

  if (Number.isNaN(productPrice)) {
    return false;
  }

  switch (price) {
    case "under-5000":
      return productPrice < 5000;

    case "5000-10000":
      return productPrice >= 5000 && productPrice <= 10000;

    case "10000-20000":
      return productPrice > 10000 && productPrice <= 20000;

    case "above-20000":
      return productPrice > 20000;

    default:
      return true;
  }
}

function matchesSearch(product, query) {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return true;
  }

  const searchableText = [
    product.name,
    product.slug,
    product.description,
    product.shortDescription,
    product.category,
    product.categorySlug,
    product.collection,
    product.collectionSlug,
    ...(Array.isArray(product.tags) ? product.tags : []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return searchableText.includes(normalizedQuery);
}

function getCategorySlug(product) {
  if (product.categorySlug) {
    return product.categorySlug;
  }

  if (typeof product.category === "string") {
    return product.category.toLowerCase().replace(/\s+/g, "-");
  }

  return product.category?.slug || "";
}

function matchesCategory(product, category) {
  if (!category) {
    return true;
  }

  return getCategorySlug(product) === category;
}

function matchesCollection(product, collection) {
  if (!collection) {
    return true;
  }

  // Direct product collection relation
  if (product.collectionSlug === collection) {
    return true;
  }

  // Collection-based relation from collections.js
  const productSlugs =
    getCollectionProductSlugs(collection);

  return productSlugs.includes(product.slug);
}

function sortProducts(productList, sort) {
  const sortedProducts = [...productList];

  switch (sort) {
    case "price-asc":
      return sortedProducts.sort(
        (a, b) =>
          Number(a.price) - Number(b.price)
      );

    case "price-desc":
      return sortedProducts.sort(
        (a, b) =>
          Number(b.price) - Number(a.price)
      );

    case "name-asc":
      return sortedProducts.sort((a, b) =>
        a.name.localeCompare(b.name)
      );

    case "newest":
      return sortedProducts.sort((a, b) => {
        const dateA = new Date(
          a.createdAt || a.date || 0
        ).getTime();

        const dateB = new Date(
          b.createdAt || b.date || 0
        ).getTime();

        return dateB - dateA;
      });

    case "featured":
    default:
      return sortedProducts.sort(
        (a, b) =>
          Number(Boolean(b.featured)) -
          Number(Boolean(a.featured))
      );
  }
}

function useProducts({
  query = "",
  category = "",
  collection = "",
  price = "all",
  sort = "featured",
} = {}) {
  const filteredProducts = useMemo(() => {
    const filtered = allProducts.filter(
      (product) =>
        matchesSearch(product, query) &&
        matchesCategory(product, category) &&
        matchesCollection(product, collection) &&
        matchesPriceRange(product, price)
    );

    return sortProducts(filtered, sort);
  }, [
    query,
    category,
    collection,
    price,
    sort,
  ]);

  const featuredProducts = useMemo(
    () =>
      allProducts.filter(
        (product) => product.featured
      ),
    []
  );

  const newArrivals = useMemo(
    () =>
      allProducts.filter(
        (product) =>
          product.newArrival ||
          product.isNew ||
          product.badge === "New In"
      ),
    []
  );

  const getProductBySlug = (slug) =>
    allProducts.find(
      (product) => product.slug === slug
    );

  const getProductsByCategory = (categorySlug) =>
    allProducts.filter(
      (product) =>
        getCategorySlug(product) === categorySlug
    );

  const getProductsByCollection = (
    collectionSlug
  ) =>
    allProducts.filter((product) =>
      matchesCollection(product, collectionSlug)
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