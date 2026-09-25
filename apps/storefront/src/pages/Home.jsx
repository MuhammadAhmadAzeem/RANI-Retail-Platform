import { ArrowRight, ChevronRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  {
    title: "Men",
    subtitle: "Contemporary essentials",
    image:
      "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Women",
    subtitle: "Refined seasonal pieces",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Unstitched",
    subtitle: "Designed your way",
    image:
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=1200&q=80",
  },
];

const featuredProducts = [
  {
    name: "Classic Kurta",
    category: "Men",
    price: "Rs. 4,999",
    image:
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Essential Shirt",
    category: "Men",
    price: "Rs. 5,499",
    image:
      "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Everyday Layer",
    category: "Women",
    price: "Rs. 6,999",
    image:
      "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Signature Co-Ord",
    category: "Women",
    price: "Rs. 7,499",
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=80",
  },
];

function Home() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-charcoal text-white">
        <div className="mx-auto grid min-h-[680px] max-w-[1440px] lg:grid-cols-[0.9fr_1.1fr]">
          <div className="order-2 flex items-center px-6 py-16 sm:px-10 lg:order-1 lg:px-14 xl:px-20">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 border border-white/15 bg-white/5 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70">
                <Sparkles size={14} />
                Autumn / Winter 2026
              </div>

              <h1 className="mt-7 font-heading text-5xl font-medium leading-[1.02] tracking-[-0.03em] sm:text-6xl lg:text-7xl">
                Crafted for the way you move.
              </h1>

              <p className="mt-6 max-w-lg text-base leading-7 text-white/65 sm:text-lg">
                Discover considered silhouettes, timeless essentials and
                elevated everyday pieces from Bajwa's Collection.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  to="/shop"
                  className="inline-flex h-12 items-center justify-center gap-2 bg-white px-6 text-sm font-semibold text-charcoal transition hover:bg-white/90"
                >
                  Shop Collection
                  <ArrowRight size={17} />
                </Link>

                <Link
                  to="/collections"
                  className="inline-flex h-12 items-center justify-center border border-white/20 px-6 text-sm font-semibold text-white transition hover:bg-white/5"
                >
                  Explore New In
                </Link>
              </div>
            </div>
          </div>

          <div className="order-1 min-h-[420px] lg:order-2 lg:min-h-full">
            <img
              src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1800&q=85"
              alt="Bajwa's Collection seasonal fashion editorial"
              width="1800"
              height="2200"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-background">
        <div className="mx-auto grid max-w-[1440px] divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {[
            ["Premium Quality", "Thoughtfully selected fabrics & finishes"],
            ["Nationwide Delivery", "Delivered across Pakistan"],
            ["Easy Returns", "Simple exchange & return support"],
          ].map(([title, text]) => (
            <div key={title} className="px-6 py-7 text-center sm:py-8">
              <p className="text-xs font-semibold uppercase tracking-[0.16em]">
                {title}
              </p>
              <p className="mt-2 text-sm text-text-muted">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:py-24">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Shop by category
            </p>

            <h2 className="mt-3 font-heading text-4xl font-medium sm:text-5xl">
              Find your look.
            </h2>
          </div>

          <Link
            to="/shop"
            className="hidden items-center gap-1 text-sm font-semibold sm:inline-flex"
          >
            View all
            <ChevronRight size={17} />
          </Link>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.title}
              to={`/category/${category.title.toLowerCase()}`}
              className="group relative overflow-hidden"
            >
              <div className="aspect-[4/5] overflow-hidden bg-surface-muted">
                <img
                  src={category.image}
                  alt={`${category.title} fashion collection`}
                  width="1200"
                  height="1500"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                />
              </div>

              <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/65 via-black/20 to-transparent p-6 pt-20 text-white">
                <p className="text-xs uppercase tracking-[0.18em] text-white/70">
                  {category.subtitle}
                </p>
                <h3 className="mt-2 font-heading text-3xl">
                  {category.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-surface-muted">
        <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:py-24">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Curated for you
              </p>

              <h2 className="mt-3 font-heading text-4xl font-medium sm:text-5xl">
                New arrivals
              </h2>
            </div>

            <Link
              to="/shop"
              className="hidden items-center gap-1 text-sm font-semibold sm:inline-flex"
            >
              Shop all
              <ChevronRight size={17} />
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-2 md:grid-cols-4">
            {featuredProducts.map((product) => (
              <Link
                key={product.name}
                to="/product/premium-kurta"
                className="group"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-background">
                  <img
                    src={product.image}
                    alt={product.name}
                    width="900"
                    height="1200"
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.025]"
                  />
                </div>

                <div className="pt-4">
                  <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-text-muted">
                    {product.category}
                  </p>

                  <h3 className="mt-1 text-sm font-medium sm:text-base">
                    {product.name}
                  </h3>

                  <p className="mt-2 text-sm font-semibold">
                    {product.price}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:py-24">
        <div className="grid overflow-hidden bg-primary text-white lg:grid-cols-[1fr_0.9fr]">
          <div className="flex items-center px-6 py-14 sm:px-10 lg:px-16">
            <div className="max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/60">
                The collection
              </p>

              <h2 className="mt-4 font-heading text-4xl font-medium leading-tight sm:text-5xl">
                Timeless pieces, thoughtfully made.
              </h2>

              <p className="mt-5 max-w-lg text-sm leading-7 text-white/70 sm:text-base">
                Explore a refined edit of contemporary fashion designed to
                become part of your everyday wardrobe.
              </p>

              <Link
                to="/collections"
                className="mt-8 inline-flex items-center gap-2 border border-white/25 px-6 py-3 text-sm font-semibold transition hover:bg-white/10"
              >
                Discover the collection
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>

          <div className="min-h-[360px] lg:min-h-[520px]">
            <img
              src="https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1400&q=85"
              alt="Bajwa's Collection clothing editorial"
              width="1400"
              height="1700"
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-background">
        <div className="mx-auto max-w-[900px] px-5 py-20 text-center sm:px-8 lg:py-24">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Stay in the loop
          </p>

          <h2 className="mt-4 font-heading text-4xl font-medium sm:text-5xl">
            New collections, first access.
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-text-muted sm:text-base">
            Join our newsletter for new arrivals, seasonal edits and selected
            offers.
          </p>

          <form className="mx-auto mt-8 flex max-w-lg flex-col gap-3 sm:flex-row">
            <label className="sr-only" htmlFor="newsletter-email">
              Email address
            </label>

            <input
              id="newsletter-email"
              type="email"
              placeholder="Your email address"
              className="h-12 flex-1 rounded-lg border border-border bg-surface px-4 text-sm outline-none transition placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/10"
            />

            <button
              type="submit"
              className="h-12 rounded-lg bg-primary px-6 text-sm font-semibold text-white transition hover:bg-primary-hover"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

export default Home;