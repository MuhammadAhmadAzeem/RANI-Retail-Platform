import {
  ArrowRight,
  ChevronRight,
  Mail,
} from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

import ProductGrid from "../components/ecommerce/ProductGrid";
import { getNewArrivals } from "../data/mock/products";

const categories = [
  {
    title: "Men",
    subtitle: "Eastern menswear",
    image:
      "https://images.pexels.com/photos/35565657/pexels-photo-35565657.jpeg?auto=compress&cs=tinysrgb&w=1400",
    href: "/category/men",
  },
  {
    title: "Women",
    subtitle: "Elegant eastern wear",
    image:
      "https://images.pexels.com/photos/28390509/pexels-photo-28390509.jpeg?auto=compress&cs=tinysrgb&w=1400",
    href: "/category/women",
  },
  {
    title: "Unstitched",
    subtitle: "Fabrics & textures",
    image:
      "https://images.pexels.com/photos/25184992/pexels-photo-25184992.jpeg?auto=compress&cs=tinysrgb&w=1400",
    href: "/category/unstitched",
  },
];

const editImages = {
  main:
    "https://images.pexels.com/photos/35902077/pexels-photo-35902077.jpeg?auto=compress&cs=tinysrgb&w=1400",
  detail:
    "https://images.pexels.com/photos/27603274/pexels-photo-27603274.jpeg?auto=compress&cs=tinysrgb&w=1000",
  fabric:
    "https://images.pexels.com/photos/31874448/pexels-photo-31874448.jpeg?auto=compress&cs=tinysrgb&w=1000",
};

const newArrivals = getNewArrivals().slice(0, 4);

const collectionLinks = [
  {
    label: "New In",
    description: "The latest additions",
    href: "/collection/new-in",
  },
  {
    label: "Signature",
    description: "Refined everyday pieces",
    href: "/collection/signature",
  },
  {
    label: "Festive",
    description: "Made for special moments",
    href: "/collection/festive",
  },
];

function SectionIntro({ eyebrow, title, description, action }) {
  return (
    <div className="mb-8 flex flex-col gap-3 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        {eyebrow ? (
          <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.28em] text-primary sm:text-[10px]">
            {eyebrow}
          </p>
        ) : null}

        <h2 className="font-serif text-3xl leading-[1.08] tracking-[-0.03em] text-foreground sm:text-4xl lg:text-[40px]">
          {title}
        </h2>

        {description ? (
          <p className="mt-3 max-w-xl text-[13px] leading-6 text-muted-foreground sm:text-sm">
            {description}
          </p>
        ) : null}
      </div>

      {action ? (
        <Link
          to={action.href}
          className="group inline-flex shrink-0 items-center gap-2 self-start pt-1 text-[12px] font-medium text-foreground transition-colors hover:text-primary sm:self-auto"
        >
          {action.label}
          <ArrowRight
            size={15}
            strokeWidth={1.7}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      ) : null}
    </div>
  );
}

function ImageLink({
  href,
  image,
  eyebrow,
  title,
  subtitle,
  className = "",
}) {
  return (
    <Link
      to={href}
      className={`group relative block overflow-hidden bg-muted ${className}`}
    >
      <img
        src={image}
        alt={`${title} eastern fashion collection`}
        className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.035]"
        loading="lazy"
        decoding="async"
      />

      <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 via-black/20 to-transparent px-5 pb-5 pt-20 sm:px-6 sm:pb-6">
        {eyebrow ? (
          <p className="mb-1.5 text-[8px] font-semibold uppercase tracking-[0.22em] text-white/70 sm:text-[9px]">
            {eyebrow}
          </p>
        ) : null}

        <div className="flex items-end justify-between gap-3">
          <div>
            <h3 className="font-serif text-2xl leading-none text-white sm:text-[28px]">
              {title}
            </h3>

            {subtitle ? (
              <p className="mt-1.5 text-[11px] text-white/70 sm:text-xs">
                {subtitle}
              </p>
            ) : null}
          </div>

          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/40 bg-black/5 text-white backdrop-blur-[2px] transition-all duration-300 group-hover:border-white group-hover:bg-white group-hover:text-foreground">
            <ArrowRight size={15} strokeWidth={1.7} />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function Home() {
  return (
    <main className="bg-background text-foreground">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#211E1D]">
        <div className="grid min-h-[600px] grid-cols-1 lg:grid-cols-[0.78fr_1.22fr] lg:min-h-[665px]">
          <div className="relative z-10 flex items-center px-6 py-14 sm:px-10 sm:py-16 lg:px-14 lg:py-20 xl:px-20">
            <div className="max-w-xl">
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55 }}
                className="mb-5 text-[9px] font-semibold uppercase tracking-[0.32em] text-[#D6BD94] sm:text-[10px]"
              >
                Bajwa&apos;s Collection
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.05 }}
                className="font-serif text-[40px] leading-[1.01] tracking-[-0.045em] text-white sm:text-5xl md:text-6xl xl:text-[68px]"
              >
                Tradition,
                <br />
                redefined.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.14 }}
                className="mt-6 max-w-md text-[13px] leading-6 text-white/62 sm:text-sm"
              >
                Modern eastern wear shaped by timeless silhouettes,
                considered detail, and the character of Pakistani craft.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.22 }}
                className="mt-8 flex flex-wrap items-center gap-3"
              >
                <Link
                  to="/collection/new-in"
                  className="inline-flex min-h-11 items-center justify-center bg-white px-6 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#211E1D] transition-all duration-300 hover:bg-[#F1EEE8]"
                >
                  Shop New In
                </Link>

                <Link
                  to="/shop"
                  className="inline-flex min-h-11 items-center justify-center border border-white/25 px-6 text-[11px] font-semibold uppercase tracking-[0.12em] text-white transition-all duration-300 hover:border-white/55 hover:bg-white/[0.06]"
                >
                  Explore Shop
                </Link>
              </motion.div>

              <div className="mt-11 border-t border-white/10 pt-5">
                <div className="flex flex-wrap items-center gap-5 text-[9px] uppercase tracking-[0.19em] text-white/40 sm:gap-6">
                  <span>Eastern Wear</span>
                  <span className="h-px w-7 bg-white/20" />
                  <span>Since 2026</span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative min-h-[430px] overflow-hidden lg:min-h-full">
            <img
              src="https://images.pexels.com/photos/35562718/pexels-photo-35562718.jpeg?auto=compress&cs=tinysrgb&w=1800"
              alt="Bajwa's Collection eastern fashion campaign"
              className="absolute inset-0 h-full w-full object-cover object-[50%_18%] lg:object-[50%_16%]"
              fetchPriority="high"
              decoding="async"
            />

            <div className="absolute inset-0 bg-linear-to-r from-[#211E1D] via-[#211E1D]/5 to-transparent lg:from-[#211E1D]/40 lg:via-transparent" />

            <div className="absolute bottom-6 right-6 hidden items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.22em] text-white/65 sm:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-white/80" />
              Autumn / Winter 2026
            </div>
          </div>
        </div>
      </section>

      {/* Service strip */}
      <section className="border-b border-border/80 bg-white">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 divide-y divide-border/80 px-5 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-8 lg:px-12">
          <div className="flex items-center gap-3 py-4 sm:px-6 lg:py-[17px]">
            <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-primary">
              01
            </span>
            <p className="text-[11px] font-medium tracking-[0.01em] text-foreground sm:text-xs">
              Premium fabrics
            </p>
          </div>

          <div className="flex items-center gap-3 py-4 sm:px-6 lg:py-[17px]">
            <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-primary">
              02
            </span>
            <p className="text-[11px] font-medium tracking-[0.01em] text-foreground sm:text-xs">
              Nationwide delivery
            </p>
          </div>

          <div className="flex items-center gap-3 py-4 sm:px-6 lg:py-[17px]">
            <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-primary">
              03
            </span>
            <p className="text-[11px] font-medium tracking-[0.01em] text-foreground sm:text-xs">
              Easy returns
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-[1440px] px-5 py-14 sm:px-8 sm:py-18 lg:px-12 lg:py-22">
        <SectionIntro
          eyebrow="Discover"
          title="Shop by category"
          description="Explore the collections that define the Bajwa&apos;s Collection wardrobe."
        />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => (
            <ImageLink
              key={category.title}
              {...category}
              eyebrow={`0${index + 1}`}
              className="h-[470px] sm:h-[530px] lg:h-[575px]"
            />
          ))}
        </div>
      </section>

      {/* New arrivals */}
      <section className="bg-[#F7F3EC]">
        <div className="mx-auto max-w-[1440px] px-5 py-14 sm:px-8 sm:py-18 lg:px-12 lg:py-22">
          <SectionIntro
            eyebrow="Just in"
            title="New arrivals"
            description="Fresh silhouettes and refined essentials, selected for the season ahead."
            action={{
              label: "View all new in",
              href: "/collection/new-in",
            }}
          />

          <ProductGrid
            products={newArrivals}
            showQuickAdd
          />
        </div>
      </section>

      {/* Editorial campaign */}
      <section className="mx-auto max-w-[1440px] px-5 py-14 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <div className="grid overflow-hidden bg-[#6B1F2A] lg:grid-cols-[1.15fr_0.85fr]">
          <div className="relative min-h-[410px] lg:min-h-[560px]">
            <img
              src={editImages.main}
              alt="Elegant eastern wear from Bajwa's Collection"
              className="absolute inset-0 h-full w-full object-cover object-center"
              loading="lazy"
              decoding="async"
            />

            <div className="absolute inset-0 bg-black/10" />
          </div>

          <div className="flex items-center px-7 py-11 sm:px-12 sm:py-14 lg:px-14 xl:px-20">
            <motion.div
              initial={{ opacity: 0, x: 18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className="max-w-md"
            >
              <p className="mb-4 text-[9px] font-semibold uppercase tracking-[0.27em] text-[#D6BD94] sm:text-[10px]">
                The Signature Edit
              </p>

              <h2 className="font-serif text-4xl leading-[1.04] tracking-[-0.04em] text-white sm:text-5xl">
                Tradition,
                <br />
                refined for now.
              </h2>

              <p className="mt-6 text-[13px] leading-6 text-white/68 sm:text-sm">
                Thoughtful eastern essentials made for the way modern life
                moves — understated, versatile, and rooted in familiar
                craft.
              </p>

              <Link
                to="/collection/signature"
                className="group mt-8 inline-flex items-center gap-2 border-b border-white/35 pb-2 text-[11px] font-semibold uppercase tracking-[0.17em] text-white transition-colors hover:border-white"
              >
                Discover signature
                <ArrowRight
                  size={15}
                  strokeWidth={1.7}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The edit / image story */}
      <section className="mx-auto max-w-[1440px] px-5 pb-14 sm:px-8 sm:pb-20 lg:px-12 lg:pb-24">
        <SectionIntro
          eyebrow="The edit"
          title="Made for every moment."
          description="From everyday dressing to occasions worth remembering."
        />

        <div className="grid gap-3 lg:grid-cols-[1.45fr_0.75fr]">
          <Link
            to="/collection/signature"
            className="group relative min-h-[490px] overflow-hidden bg-muted lg:min-h-[625px]"
          >
            <img
              src={editImages.detail}
              alt="Two models wearing contemporary eastern fashion"
              className="absolute inset-0 h-full w-full object-cover object-[50%_18%] transition-transform duration-700 group-hover:scale-[1.02]"
              loading="lazy"
              decoding="async"
            />

            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4 sm:bottom-8 sm:left-8 sm:right-8">
              <div>
                <p className="mb-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/70">
                  Signature
                </p>
                <h3 className="font-serif text-3xl leading-none text-white sm:text-4xl">
                  Everyday, elevated.
                </h3>
              </div>

              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-foreground transition-transform duration-300 group-hover:translate-x-1">
                <ArrowRight size={16} strokeWidth={1.7} />
              </span>
            </div>
          </Link>

          <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
            <Link
              to="/collection/festive"
              className="group relative min-h-[240px] overflow-hidden bg-muted lg:min-h-0 lg:flex-1"
            >
              <img
                src="https://images.pexels.com/photos/19487469/pexels-photo-19487469.jpeg?auto=compress&cs=tinysrgb&w=1000"
                alt="Embroidered Pakistani festive fashion"
                className="absolute inset-0 h-full w-full object-cover object-[50%_12%] transition-transform duration-700 group-hover:scale-[1.02]"
                loading="lazy"
                decoding="async"
              />

              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/5 to-transparent" />

              <div className="absolute bottom-5 left-5 right-5">
                <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/70">
                  Festive
                </p>
                <div className="mt-1 flex items-center justify-between gap-3">
                  <h3 className="font-serif text-2xl text-white">
                    Occasion dressing
                  </h3>
                  <ChevronRight
                    size={18}
                    className="text-white transition-transform duration-300 group-hover:translate-x-1"
                  />
                </div>
              </div>
            </Link>

            <Link
              to="/category/unstitched"
              className="group relative min-h-[240px] overflow-hidden bg-muted lg:min-h-0 lg:flex-1"
            >
              <img
                src={editImages.fabric}
                alt="Detailed textile texture and eastern fabric"
                className="absolute inset-0 h-full w-full object-cover object-[50%_10%] transition-transform duration-700 group-hover:scale-[1.02]"
                loading="lazy"
                decoding="async"
              />

              <div className="absolute inset-0 bg-linear-to-t from-black/65 via-black/5 to-transparent" />

              <div className="absolute bottom-5 left-5 right-5">
                <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/70">
                  Unstitched
                </p>
                <div className="mt-1 flex items-center justify-between gap-3">
                  <h3 className="font-serif text-2xl text-white">
                    Fabric stories
                  </h3>
                  <ChevronRight
                    size={18}
                    className="text-white transition-transform duration-300 group-hover:translate-x-1"
                  />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Collection links */}
      <section className="border-y border-border bg-white">
        <div className="mx-auto max-w-[1100px] px-5 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
          <div className="mb-8">
            <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.28em] text-primary sm:text-[10px]">
              Explore
            </p>

            <h2 className="font-serif text-3xl leading-[1.08] tracking-[-0.03em] sm:text-4xl">
              Find your edit.
            </h2>
          </div>

          <div className="border-t border-border">
            {collectionLinks.map((item, index) => (
              <Link
                key={item.label}
                to={item.href}
                className="group flex items-center justify-between border-b border-border px-0 py-5 transition-all duration-300 hover:bg-[#F7F3EC] sm:px-4 sm:py-[22px]"
              >
                <div className="flex items-center gap-5">
                  <span className="w-5 text-[9px] font-semibold tracking-[0.18em] text-muted-foreground">
                    0{index + 1}
                  </span>

                  <div>
                    <h3 className="font-serif text-xl leading-none text-foreground transition-colors duration-300 group-hover:text-primary sm:text-[25px]">
                      {item.label}
                    </h3>

                    <p className="mt-1.5 text-[11px] text-muted-foreground sm:text-xs">
                      {item.description}
                    </p>
                  </div>
                </div>

                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border transition-all duration-300 group-hover:border-primary/20 group-hover:bg-primary group-hover:text-white">
                  <ArrowRight
                    size={15}
                    strokeWidth={1.7}
                    className="transition-transform duration-300 group-hover:translate-x-0.5"
                  />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-[#F7F3EC]">
        <div className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
          <div className="relative overflow-hidden border border-[#DDD4C7] bg-[#EEE7DD]">
            <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-primary/[0.045] blur-3xl" />
            <div className="absolute -bottom-24 left-[32%] h-64 w-64 rounded-full bg-[#B08D57]/[0.07] blur-3xl" />

            <div className="relative flex flex-col gap-8 px-6 py-10 sm:px-10 sm:py-12 lg:flex-row lg:items-end lg:justify-between lg:px-14 lg:py-14 xl:px-16">
              <div className="max-w-md">
                <div className="mb-5 flex h-9 w-9 items-center justify-center border border-primary/15 bg-white text-primary">
                  <Mail size={16} strokeWidth={1.6} />
                </div>

                <p className="text-[9px] font-semibold uppercase tracking-[0.26em] text-primary sm:text-[10px]">
                  Stay connected
                </p>

                <h2 className="mt-2 font-serif text-3xl leading-[1.08] tracking-[-0.03em] sm:text-4xl lg:text-[42px]">
                  Be first to know.
                </h2>

                <p className="mt-3 max-w-md text-[13px] leading-6 text-muted-foreground sm:text-sm">
                  New arrivals, collection updates, and early access — kept
                  simple.
                </p>
              </div>

              <form
                onSubmit={(event) => event.preventDefault()}
                className="w-full max-w-xl"
              >
                <label
                  htmlFor="home-newsletter-email"
                  className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.18em] text-muted-foreground"
                >
                  Email address
                </label>

                <div className="flex flex-col overflow-hidden border border-black/10 bg-white/70 sm:flex-row sm:items-stretch">
                  <input
                    id="home-newsletter-email"
                    type="email"
                    placeholder="Email address"
                    autoComplete="email"
                    className="min-h-12 min-w-0 flex-1 bg-transparent px-4 text-[13px] text-foreground outline-none placeholder:text-muted-foreground focus:bg-white"
                  />

                  <button
                    type="submit"
                    className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 bg-[#6B1F2A] px-6 text-[11px] font-semibold uppercase tracking-[0.13em] text-white transition-colors hover:bg-[#581923]"
                  >
                    Subscribe
                    <ArrowRight
                      size={15}
                      strokeWidth={1.7}
                    />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}