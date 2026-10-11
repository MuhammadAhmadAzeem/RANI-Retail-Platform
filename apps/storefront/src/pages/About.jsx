import {
  ArrowRight,
  Heart,
  Sparkles,
  Store,
} from "lucide-react";
import { Link } from "react-router-dom";

import siteConfig from "../config/site";

const principles = [
  {
    icon: Heart,
    title: "Rooted in Pakistani fashion",
    description:
      "Our design direction celebrates eastern wear, shalwar kameez, refined fabrics, embroidery and contemporary Pakistani styling.",
  },
  {
    icon: Sparkles,
    title: "Considered presentation",
    description:
      "We aim to present collections with clear product information, thoughtful visual details and a calm, editorial shopping experience.",
  },
  {
    icon: Store,
    title: "Designed to grow",
    description:
      "The storefront is being developed alongside RANI, a retail platform intended to support the operational needs of a growing fashion business.",
  },
];

function About() {
  return (
    <article className="mx-auto max-w-[1440px] px-5 pb-16 pt-8 sm:px-8 sm:pb-24 sm:pt-12">
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-2 text-xs text-text-muted"
      >
        <Link to="/" className="transition hover:text-primary">
          Home
        </Link>

        <span aria-hidden="true">/</span>

        <span aria-current="page" className="text-text">
          About us
        </span>
      </nav>

      <header className="mt-12 max-w-4xl sm:mt-16">
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary sm:text-xs">
          The story behind the brand
        </p>

        <h1 className="mt-5 font-heading text-4xl leading-tight text-text sm:text-5xl lg:text-7xl">
          Eastern fashion,
          <span className="block italic text-primary">
            thoughtfully presented.
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-sm leading-7 text-text-muted sm:text-base sm:leading-8">
          {siteConfig.brand.description}. Our direction is centred on
          Pakistani fashion presented through a modern, considered and
          easy-to-navigate online experience.
        </p>

        <Link
          to="/shop"
          className="mt-8 inline-flex min-h-12 items-center justify-center gap-3 bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        >
          Explore the collection
          <ArrowRight size={17} aria-hidden="true" />
        </Link>
      </header>

      <section
        aria-labelledby="our-direction"
        className="mt-16 grid gap-8 border-y border-border py-10 sm:mt-20 sm:py-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16"
      >
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-primary">
            Our direction
          </p>

          <h2
            id="our-direction"
            className="mt-3 max-w-md font-heading text-3xl leading-tight sm:text-4xl"
          >
            A modern perspective on eastern wear.
          </h2>
        </div>

        <div className="space-y-5 text-sm leading-7 text-text-muted sm:text-base sm:leading-8">
          <p>
            Bajwa&apos;s Collection is the customer-facing fashion brand
            within the RANI project. The storefront is being designed to
            make discovering categories, collections and products feel
            straightforward without losing the character of Pakistani
            fashion.
          </p>

          <p>
            From everyday eastern wear to festive styling and unstitched
            fabrics, the intended experience is elegant, responsive and
            practical on both mobile and desktop devices.
          </p>
        </div>
      </section>

      <section
        aria-labelledby="our-principles"
        className="mt-16 sm:mt-20"
      >
        <div className="max-w-2xl">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-primary">
            What guides us
          </p>

          <h2
            id="our-principles"
            className="mt-3 font-heading text-3xl sm:text-4xl"
          >
            The principles behind the experience.
          </h2>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {principles.map((principle, index) => {
            const Icon = principle.icon;

            return (
              <section
                key={principle.title}
                className="border border-border bg-surface p-6 sm:p-7"
              >
                <div className="flex size-11 items-center justify-center bg-surface-muted text-primary">
                  <Icon size={21} aria-hidden="true" />
                </div>

                <p className="mt-6 text-xs font-medium uppercase tracking-[0.15em] text-text-muted">
                  0{index + 1}
                </p>

                <h3 className="mt-2 font-heading text-2xl leading-snug">
                  {principle.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-text-muted">
                  {principle.description}
                </p>
              </section>
            );
          })}
        </div>
      </section>

      <section
        aria-labelledby="rani-platform"
        className="mt-16 border border-border bg-surface-muted p-6 sm:mt-20 sm:p-10 lg:flex lg:items-center lg:justify-between lg:gap-12"
      >
        <div className="max-w-2xl">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-primary">
            The platform behind the storefront
          </p>

          <h2
            id="rani-platform"
            className="mt-3 font-heading text-3xl sm:text-4xl"
          >
            Bajwa&apos;s Collection meets RANI.
          </h2>

          <p className="mt-4 text-sm leading-7 text-text-muted sm:text-base">
            RANI stands for Unified Retail, Inventory &amp; Commerce
            Management Platform. It is being developed to support the
            business side of retail, with the longer-term goal of
            connecting ecommerce operations, inventory and business
            management through a shared system.
          </p>
        </div>

        <Link
          to="/contact"
          className="mt-7 inline-flex min-h-11 shrink-0 items-center gap-2 text-sm font-semibold text-primary transition hover:text-primary-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary lg:mt-0"
        >
          Get in touch
          <ArrowRight size={17} aria-hidden="true" />
        </Link>
      </section>
    </article>
  );
}

export default About;