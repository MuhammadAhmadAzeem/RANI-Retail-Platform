import {
  ArrowRight,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

import ProductGrid from "../components/ecommerce/ProductGrid";
import {
  getActiveCollections,
  getCollectionBySlug,
} from "../data/mock/collections";
import useProducts from "../hooks/useProducts";

function Collection() {
  const { slug } = useParams();

  const collection = getCollectionBySlug(slug);
  const { getProductsByCollection } = useProducts();

  const collectionProducts = collection
    ? [...getProductsByCollection(slug)].sort((a, b) => {
      const curatedSlugs = collection.productSlugs ?? [];
      const indexA = curatedSlugs.indexOf(a.slug);
      const indexB = curatedSlugs.indexOf(b.slug);

      const rankA =
        indexA === -1 ? Number.MAX_SAFE_INTEGER : indexA;
      const rankB =
        indexB === -1 ? Number.MAX_SAFE_INTEGER : indexB;

      return rankA - rankB;
    })
    : [];

  const relatedCollections = getActiveCollections()
    .filter((item) => item.slug !== slug)
    .sort(
      (a, b) => (a.sortOrder ?? 999) - (b.sortOrder ?? 999)
    )
    .slice(0, 3);

  if (!collection) {
    return (
      <main className="min-h-[55vh] bg-background px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-xl py-8 text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-primary">
            Collection not found
          </p>

          <h1 className="mt-3 font-heading text-3xl sm:text-4xl">
            This edit is unavailable.
          </h1>

          <p className="mt-3 text-sm leading-6 text-text-muted">
            Explore the available collections to find another style.
          </p>

          <Link
            to="/collections"
            className="mt-5 inline-flex min-h-10 items-center gap-2 bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground transition hover:bg-primary-hover"
          >
            Browse collections
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </main>
    );
  }

  const heroImage = collection.bannerImage || collection.image;

  return (
    <main className="min-h-screen bg-background text-text">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-7 lg:px-10">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-2 pt-6 text-xs text-text-muted"
        >
          <Link to="/" className="transition hover:text-primary">
            Home
          </Link>

          <ChevronRight size={13} aria-hidden="true" />

          <Link
            to="/collections"
            className="transition hover:text-primary"
          >
            Collections
          </Link>

          <ChevronRight size={13} aria-hidden="true" />

          <span aria-current="page" className="text-primary">
            {collection.name}
          </span>
        </nav>

        {/* Collection hero: image gets 65% of desktop width */}
        <section className="mt-5 grid overflow-hidden bg-surface-muted lg:h-[360px] lg:grid-cols-[0.7fr_1.3fr] xl:h-[380px]">
          {/* Hero image */}
          <div className="group order-1 h-[250px] overflow-hidden bg-surface-muted sm:h-[300px] lg:order-2 lg:h-full lg:min-h-0">
            {heroImage ? (
              <img
                src={heroImage}
                alt={`${collection.name} — Pakistani fashion from Bajwa's Collection`}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                width="1000"
                height="1250"
                className={`h-full w-full object-cover ${collection.slug === "eastern-classics"
                    ? "object-[center_10%]"
                    : "object-[center_18%]"
                  } transition-transform duration-500 ease-out group-hover:scale-[1.01] motion-reduce:transition-none motion-reduce:group-hover:scale-100`}
              />
            ) : (
              <div className="flex h-full min-h-64 items-center justify-center text-sm text-text-muted">
                Collection image unavailable
              </div>
            )}
          </div>

          {/* Hero content */}
          <div className="order-2 flex flex-col justify-center px-5 py-6 sm:px-8 sm:py-8 lg:order-1 lg:px-8 xl:px-10">
            <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-primary">
              <span
                className="h-px w-6 bg-primary"
                aria-hidden="true"
              />
              Bajwa&apos;s Collection
            </p>

            {collection.featured && (
              <span className="mt-4 inline-flex w-fit items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-text-muted">
                <Sparkles
                  size={13}
                  className="text-primary"
                  aria-hidden="true"
                />
                Featured edit
              </span>
            )}

            <h1 className="mt-3 font-heading text-3xl leading-tight sm:text-4xl lg:text-[42px]">
              {collection.name}
            </h1>

            <p className="mt-3 max-w-lg text-sm leading-6 text-text-muted">
              {collection.description}
            </p>

            {collection.shortDescription && (
              <p className="mt-3 max-w-lg border-l border-primary/60 pl-3 text-xs leading-5 text-text">
                {collection.shortDescription}
              </p>
            )}

            {collection.tags?.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1.5">
                {collection.tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] uppercase tracking-[0.08em] text-text-muted"
                  >
                    {tag.replace(/-/g, " ")}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-3 border-t border-border pt-4">
              <p className="text-xs text-text-muted">
                {collectionProducts.length}{" "}
                {collectionProducts.length === 1
                  ? "product"
                  : "products"}
              </p>

              <a
                href="#collection-products"
                className="inline-flex min-h-10 items-center justify-center gap-2 bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground transition hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
              >
                Shop this edit
                <ArrowRight size={14} aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        {/* Product grid */}
        <section
          id="collection-products"
          aria-labelledby="collection-products-heading"
          className="scroll-mt-6 pb-14 pt-10 sm:pb-20 sm:pt-12"
        >
          <div className="flex flex-wrap items-end justify-between gap-3 border-b border-border pb-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
                Discover the edit
              </p>

              <h2
                id="collection-products-heading"
                className="mt-1.5 font-heading text-2xl sm:text-3xl"
              >
                Shop {collection.name}
              </h2>

              <p className="mt-2 text-xs leading-5 text-text-muted sm:text-sm">
                Explore products from this collection.
              </p>
            </div>

            <span className="text-xs text-text-muted">
              {collectionProducts.length} items
            </span>
          </div>

          {collectionProducts.length > 0 ? (
            <div className="mt-5">
              <ProductGrid products={collectionProducts} />
            </div>
          ) : (
            <div className="py-12 text-center">
              <h3 className="font-heading text-xl">
                Products are being prepared.
              </h3>

              <p className="mt-2 text-sm leading-6 text-text-muted">
                There are no mock products associated with this collection yet.
              </p>

              <Link
                to="/shop"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-hover"
              >
                Explore the shop
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
          )}
        </section>
      </div>

      {/* Related collections */}
      {relatedCollections.length > 0 && (
        <section className="border-t border-border bg-surface-muted">
          <div className="mx-auto max-w-[1280px] px-4 py-8 sm:px-7 sm:py-10 lg:px-10">
            <div className="flex items-end justify-between gap-3">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
                  Keep exploring
                </p>

                <h2 className="mt-1.5 font-heading text-2xl sm:text-3xl">
                  More collections
                </h2>
              </div>

              <Link
                to="/collections"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary transition hover:text-primary-hover"
              >
                View all
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {relatedCollections.map((item) => (
                <Link
                  key={item.id}
                  to={`/collection/${item.slug}`}
                  className="group flex min-w-0 items-center gap-3 bg-surface p-2.5 transition hover:bg-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  <div className="size-[76px] shrink-0 overflow-hidden bg-surface-muted sm:size-[88px]">
                    <img
                      src={item.image || item.bannerImage}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      width="176"
                      height="220"
                      className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="font-heading text-lg leading-snug">
                      {item.name}
                    </h3>

                    <p className="mt-1 line-clamp-2 text-xs leading-5 text-text-muted">
                      {item.shortDescription || item.description}
                    </p>

                    <span className="mt-2 inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-primary">
                      Explore
                      <ArrowRight size={12} aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

export default Collection;