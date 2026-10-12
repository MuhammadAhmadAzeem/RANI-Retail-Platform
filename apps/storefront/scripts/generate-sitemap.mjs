
import path from "node:path";
import { fileURLToPath } from "node:url";
import { mkdir, writeFile } from "node:fs/promises";
import { loadEnv } from "vite";

import products from "../src/data/mock/products.js";
import categories from "../src/data/mock/categories.js";
import collections from "../src/data/mock/collections.js";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const storefrontDirectory = path.resolve(scriptDirectory, "..");
const publicDirectory = path.join(storefrontDirectory, "public");

const env = loadEnv("production", storefrontDirectory, "");
const configuredUrl = (
  process.env.VITE_SITE_URL ||
  env.VITE_SITE_URL ||
  ""
).trim();

function getPublicOrigin(value) {
  if (!value) {
    return "";
  }

  try {
    const url = new URL(value);

    if (
      !["https:", "http:"].includes(url.protocol) ||
      url.username ||
      url.password
    ) {
      return "";
    }

    const hostname = url.hostname.toLowerCase();

    const isLocalHost =
      hostname === "localhost" ||
      hostname === "127.0.0.1" ||
      hostname === "0.0.0.0" ||
      hostname === "::1" ||
      hostname.endsWith(".localhost") ||
      hostname.endsWith(".local");

    const isPlaceholder =
      hostname === "example.com" ||
      hostname === "www.example.com" ||
      hostname.startsWith("your-domain.") ||
      /\.(example|invalid|test)$/i.test(hostname);

    if (isLocalHost || isPlaceholder) {
      return "";
    }

    return url.origin;
  } catch {
    return "";
  }
}

function escapeXml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

const siteOrigin = getPublicOrigin(configuredUrl);

const staticRoutes = [
  "/",
  "/shop",
  "/collections",
  "/about",
  "/contact",
];

const categoryRoutes = categories
  .filter((category) => category.slug)
  .map((category) => `/category/${category.slug}`);

const collectionRoutes = collections
  .filter(
    (collection) =>
      collection.slug &&
      (!collection.status || collection.status === "active")
  )
  .map((collection) => `/collection/${collection.slug}`);

const productRoutes = products
  .filter(
    (product) =>
      product.slug &&
      product.status === "active"
  )
  .map((product) => `/product/${product.slug}`);

const routes = [
  ...new Set([
    ...staticRoutes,
    ...categoryRoutes,
    ...collectionRoutes,
    ...productRoutes,
  ]),
];

const sitemapEntries = siteOrigin
  ? routes
      .map((route) => {
        const absoluteUrl = new URL(route, siteOrigin).href;

        return `  <url>\n    <loc>${escapeXml(absoluteUrl)}</loc>\n  </url>`;
      })
      .join("\n")
  : "";

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  sitemapEntries,
  "</urlset>",
  "",
].join("\n");

const robots = [
  "User-agent: *",
  "Allow: /",
  ...(siteOrigin
    ? [`Sitemap: ${siteOrigin}/sitemap.xml`]
    : [
        "# Configure VITE_SITE_URL before deployment to publish the sitemap URL.",
      ]),
  "",
].join("\n");

await mkdir(publicDirectory, { recursive: true });

await writeFile(
  path.join(publicDirectory, "robots.txt"),
  robots,
  "utf8"
);

await writeFile(
  path.join(publicDirectory, "sitemap.xml"),
  sitemap,
  "utf8"
);

if (siteOrigin) {
  console.log(
    `[SEO] Generated sitemap with ${routes.length} URLs for ${siteOrigin}`
  );
} else {
  console.warn(
    "[SEO] VITE_SITE_URL is missing or invalid. Sitemap has no URLs; configure the real public domain before deployment."
  );
}
