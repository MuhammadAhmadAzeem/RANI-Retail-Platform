import { ArrowRight, ChevronRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

import { getActiveCollections } from "../data/mock/collections";

const activeCollections = [...getActiveCollections()].sort(
  (a, b) => (a.sortOrder ?? 999) - (b.sortOrder ?? 999)
);

function CollectionImage({ collection, featured = false }) {
  // Featured hero uses the banner; gallery cards use their own image.
  const image = featured
    ? collection.bannerImage || collection.image
    : collection.image || collection.bannerImage;

  return (
    <img
      src={image}
      alt={`${collection.name} — Pakistani fashion by Bajwa's Collection`}
      loading={featured ? "eager" : "lazy"}
      fetchPriority={featured ? "high" : "auto"}
      decoding="async"
      width="1000"
      height="1250"
      className="h-full w-full object-contain object-center transition-transform duration-700 ease-out group-hover:scale-[1.025] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
    />
  );
}

function Collections() {
  const featuredCollection = activeCollections[0];
  const otherCollections = activeCollections.slice(1);

  return (
    <main className="min-h-screen bg-background text-text">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-7 lg:px-10">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 pt-6 text-xs text-text-muted"
        >
          <Link to="/" className="transition hover:text-primary">
            Home
          </Link>

          <ChevronRight size={13} aria-hidden="true" />

          <span aria-current="page" className="text-primary">
            Collections
          </span>
        </nav>

        {/* Editorial introduction */}
        <header className="flex flex-col gap-4 border-b border-border py-8 sm:py-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-primary">
              <span
                className="h-px w-6 bg-primary"
                aria-hidden="true"
              />
              The Bajwa&apos;s edit
            </p>

            <h1 className="mt-3 font-heading text-3xl leading-tight sm:text-4xl lg:text-5xl">
              Collections for every expression.
            </h1>
          </div>

          <p className="max-w-md text-sm leading-6 text-text-muted">
            Discover curated Pakistani fashion, from fresh arrivals to
            refined eastern essentials and festive styles.
          </p>
        </header>

        {/* Featured collection hero */}
        {featuredCollection && (
          <section className="mt-6 grid overflow-hidden bg-surface-muted lg:h-[360px] lg:grid-cols-[1.3fr_0.7fr] xl:h-[380px]">
            {/* Featured image */}
            <Link
              to={`/collection/${featuredCollection.slug}`}
              aria-label={`Explore ${featuredCollection.name}`}
              className="group block h-[250px] overflow-hidden bg-surface-muted sm:h-[300px] lg:h-full lg:min-h-0"
            >
              <CollectionImage
                collection={featuredCollection}
                featured
              />
            </Link>

            {/* Featured collection information */}
            <div className="flex flex-col justify-center px-5 py-7 sm:px-8 sm:py-9 lg:px-7 xl:px-9">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-primary">
                <Sparkles
                  size={13}
                  className="mr-1.5 inline"
                  aria-hidden="true"
                />
                Featured edit
              </p>

              <h2 className="mt-3 font-heading text-3xl leading-tight sm:text-4xl">
                {featuredCollection.name}
              </h2>

              <p className="mt-3 max-w-md text-sm leading-6 text-text-muted">
                {featuredCollection.shortDescription ||
                  featuredCollection.description}
              </p>

              <p className="mt-3 text-xs leading-5 text-text-muted">
                {featuredCollection.description}
              </p>

              <Link
                to={`/collection/${featuredCollection.slug}`}
                className="mt-6 inline-flex min-h-10 w-fit items-center gap-2 bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground transition-colors duration-300 hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
              >
                Explore collection
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </section>
        )}

        {/* Collection gallery */}
        <section className="pb-14 pt-10 sm:pb-20 sm:pt-12">
          <div className="flex items-end justify-between gap-4 border-b border-border pb-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-primary">
                Discover
              </p>

              <h2 className="mt-1.5 font-heading text-2xl sm:text-3xl">
                Explore the edits
              </h2>
            </div>

            <Link
              to="/shop"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary transition-colors duration-300 hover:text-primary-hover sm:text-sm"
            >
              Shop all
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>

          {otherCollections.length > 0 ? (
            <div className="mt-5 grid grid-cols-2 gap-x-3 gap-y-7 sm:gap-x-5 sm:gap-y-9 lg:grid-cols-3 lg:gap-x-6">
              {otherCollections.map((collection, index) => (
                <article
                  key={collection.id}
                  className="min-w-0"
                >
                  <Link
                    to={`/collection/${collection.slug}`}
                    aria-label={`Explore ${collection.name}`}
                    className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                  >
                    {/* Portrait-oriented image frame */}
                    <div className="relative aspect-[4/5] overflow-hidden bg-surface-muted">
                      <CollectionImage collection={collection} />

                      <span className="absolute left-2.5 top-2.5 bg-background/90 px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-text sm:left-3 sm:top-3 sm:px-2.5">
                        Edit {String(index + 2).padStart(2, "0")}
                      </span>

                      <span className="absolute bottom-2.5 right-2.5 flex size-8 items-center justify-center bg-background/95 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground sm:bottom-3 sm:right-3 sm:size-9">
                        <ArrowRight
                          size={15}
                          aria-hidden="true"
                        />
                      </span>
                    </div>

                    {/* Collection information */}
                    <h3 className="mt-3 font-heading text-lg leading-snug sm:text-xl">
                      {collection.name}
                    </h3>

                    <p className="mt-1.5 line-clamp-2 text-xs leading-5 text-text-muted sm:text-sm sm:leading-6">
                      {collection.shortDescription ||
                        collection.description}
                    </p>

                    <span className="mt-2.5 inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-primary sm:text-xs">
                      Discover the edit
                      <ArrowRight
                        size={13}
                        aria-hidden="true"
                      />
                    </span>
                  </Link>
                </article>
              ))}
            </div>
          ) : !featuredCollection ? (
            <div className="py-12 text-center">
              <h3 className="font-heading text-xl">
                Collections are being prepared.
              </h3>

              <Link
                to="/shop"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary-hover"
              >
                Explore the shop
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
          ) : null}
        </section>
      </div>

      {/* Closing section */}
      <section className="border-t border-border bg-surface-muted">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-3 px-4 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-7 lg:px-10">
          <div>
            <h2 className="font-heading text-xl sm:text-2xl">
              Find your next favourite.
            </h2>

            <p className="mt-1 text-xs leading-5 text-text-muted">
              Explore more from Bajwa&apos;s Collection.
            </p>
          </div>

          <Link
            to="/shop"
            className="inline-flex min-h-10 w-fit items-center gap-2 bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground transition-colors duration-300 hover:bg-primary-hover"
          >
            Browse products
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Collections;