import {
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

function formatSlug(slug) {
  if (!slug) {
    return "Collection";
  }

  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function Collection() {
  const { slug } = useParams();

  const collectionName = formatSlug(slug);

  return (
    <main className="bg-background">
      {/* Breadcrumb */}
      <section className="mx-auto max-w-[1440px] px-5 pt-8 sm:px-8">
        <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-text-muted">
          <Link
            to="/"
            className="transition hover:text-primary"
          >
            Home
          </Link>

          <ChevronRight size={13} />

          <Link
            to="/collections"
            className="transition hover:text-primary"
          >
            Collections
          </Link>

          <ChevronRight size={13} />

          <span className="text-primary">
            {collectionName}
          </span>
        </div>
      </section>

      {/* Collection hero */}
      <section className="mx-auto max-w-[1440px] px-5 pb-16 pt-12 sm:px-8 lg:pb-20 lg:pt-16">
        <div className="relative overflow-hidden bg-[#eadfce]">
          <div className="absolute inset-0 bg-linear-to-r from-[#eadfce] via-[#eadfce]/90 to-[#f7f3ec]/30" />

          <div className="relative flex min-h-[460px] items-center px-6 py-16 sm:px-10 lg:px-16">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                Bajwa's Collection
              </p>

              <h1 className="mt-4 font-heading text-5xl font-medium leading-[1.03] text-text sm:text-6xl lg:text-7xl">
                {collectionName}
              </h1>

              <p className="mt-6 max-w-xl text-sm leading-7 text-text-muted sm:text-base">
                Explore a carefully curated edit inspired by Pakistani style,
                elevated textures and modern eastern silhouettes
              </p>

              <Link
                to="/shop"
                className="mt-8 inline-flex h-11 items-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-white transition hover:bg-primary-hover"
              >
                Explore collection
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Collection information */}
      <section className="mx-auto max-w-[1440px] px-5 pb-24 sm:px-8 lg:pb-28">
        <div className="grid gap-8 border-t border-border pt-10 md:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              The edit
            </p>

            <h2 className="mt-3 font-heading text-3xl font-medium sm:text-4xl">
              A distinct point of view
            </h2>
          </div>

          <div className="max-w-2xl">
            <p className="text-sm leading-8 text-text-muted sm:text-base">
              Each collection brings together pieces that balance heritage
              with contemporary styling, allowing traditional craft to feel
              effortless in everyday life
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {["Craft", "Texture", "Silhouette"].map(
                (item) => (
                  <div
                    key={item}
                    className="border border-border bg-surface px-5 py-5"
                  >
                    <p className="text-sm font-semibold">
                      {item}
                    </p>

                    <p className="mt-2 text-xs text-text-muted">
                      Thoughtfully considered
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Collection;