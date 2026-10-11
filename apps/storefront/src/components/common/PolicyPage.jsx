import { ArrowRight, FileText, Info, Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

function PolicyPage({
  title,
  eyebrow,
  description,
  sections,
  draftNotice,
  relatedLink = "/contact",
}) {
  const [search, setSearch] = useState("");

  const filteredSections = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return sections;

    return sections.filter((section) =>
      [section.title, ...section.paragraphs]
        .join(" ")
        .toLowerCase()
        .includes(query)
    );
  }, [search, sections]);

  return (
    <main className="min-h-[60vh] bg-background px-4 pb-16 pt-6 sm:px-8 sm:pb-24 sm:pt-10">
      <div className="mx-auto max-w-[1240px]">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-2 text-xs text-text-muted"
        >
          <Link to="/" className="transition hover:text-primary">
            Home
          </Link>

          <span aria-hidden="true">/</span>

          <span aria-current="page" className="text-text">
            {title}
          </span>
        </nav>

        {/* Editorial page heading */}
        <header className="mt-10 border-b border-border pb-8 sm:mt-14 sm:pb-12">
          <div className="flex items-center gap-2 text-primary">
            <span
              className="h-px w-8 bg-primary"
              aria-hidden="true"
            />

            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] sm:text-xs">
              {eyebrow}
            </p>
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_340px] lg:items-end lg:gap-12">
            <div>
              <h1 className="max-w-3xl font-heading text-4xl leading-[1.12] text-text sm:text-5xl lg:text-6xl">
                {title}
              </h1>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-text-muted sm:text-base sm:leading-8">
                {description}
              </p>
            </div>

            <div className="flex items-start gap-3 border-l-2 border-primary pl-4 py-1">
              <FileText
                size={19}
                className="mt-0.5 shrink-0 text-primary"
                aria-hidden="true"
              />

              <div>
                <p className="text-sm font-semibold text-text">
                  Bajwa&apos;s Collection
                </p>

                <p className="mt-1 text-xs leading-5 text-text-muted">
                  Customer information and website policies
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Draft notice */}
        <div
          role="note"
          className="mt-6 flex items-start gap-3 border border-border bg-surface-muted px-4 py-4 sm:px-5"
        >
          <Info
            size={19}
            className="mt-0.5 shrink-0 text-primary"
            aria-hidden="true"
          />

          <div>
            <p className="text-sm font-semibold text-text">
              Development draft
            </p>

            <p className="mt-1 text-sm leading-6 text-text-muted">
              {draftNotice}
            </p>
          </div>
        </div>

        {/* Search and policy content */}
        <div className="mt-8 grid items-start gap-8 lg:mt-10 lg:grid-cols-[255px_minmax(0,1fr)] lg:gap-12">
          {/* Compact navigation */}
          <aside className="h-fit border border-border bg-surface p-5 sm:p-6 lg:sticky lg:top-6">
            <label
              htmlFor="policy-search"
              className="text-xs font-semibold uppercase tracking-[0.16em] text-text"
            >
              Find a topic
            </label>

            <div className="relative mt-3">
              <Search
                size={17}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
                aria-hidden="true"
              />

              <input
                id="policy-search"
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search sections..."
                className="min-h-11 w-full border border-border bg-background py-2 pl-10 pr-10 text-sm outline-none transition placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/10"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                  className="absolute right-2 top-1/2 flex size-7 -translate-y-1/2 items-center justify-center text-text-muted transition hover:text-primary focus-visible:outline-2 focus-visible:outline-primary"
                >
                  <X size={15} aria-hidden="true" />
                </button>
              )}
            </div>

            <p
              className="mt-3 text-xs leading-5 text-text-muted"
              aria-live="polite"
            >
              {filteredSections.length} of {sections.length} topics
            </p>

            <div className="mt-5 border-t border-border pt-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-text-muted">
                Contents
              </p>

              <nav
                aria-label={`${title} sections`}
                className="mt-3"
              >
                {filteredSections.length > 0 ? (
                  <ul className="space-y-1">
                    {filteredSections.map((section) => (
                      <li key={section.id}>
                        <a
                          href={`#${section.id}`}
                          className="block border-l-2 border-transparent px-3 py-2 text-sm leading-5 text-text-muted transition hover:border-primary hover:bg-surface-muted hover:text-primary focus-visible:outline-2 focus-visible:outline-primary"
                        >
                          {section.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm leading-6 text-text-muted">
                    No sections match this search.
                  </p>
                )}
              </nav>
            </div>
          </aside>

          {/* Editorial reading column: no separate card for every section */}
          <article className="min-w-0 border border-border bg-surface px-5 sm:px-9 lg:px-11">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border py-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-text-muted">
                {title}
              </p>

              <span className="text-xs text-text-muted">
                {filteredSections.length} sections
              </span>
            </div>

            {filteredSections.length > 0 ? (
              filteredSections.map((section, index) => (
                <section
                  key={section.id}
                  id={section.id}
                  aria-labelledby={`${section.id}-heading`}
                  className="scroll-mt-8 border-b border-border py-7 last:border-b-0 sm:py-9"
                >
                  <div className="flex items-start gap-4 sm:gap-6">
                    <span
                      aria-hidden="true"
                      className="pt-1 font-heading text-lg text-primary/70"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <div className="min-w-0 flex-1">
                      <h2
                        id={`${section.id}-heading`}
                        className="font-heading text-xl leading-snug text-text sm:text-2xl"
                      >
                        {section.title}
                      </h2>

                      <div className="mt-4 max-w-2xl space-y-4">
                        {section.paragraphs.map(
                          (paragraph, paragraphIndex) => (
                            <p
                              key={`${section.id}-${paragraphIndex}`}
                              className="break-words text-sm leading-7 text-text-muted sm:text-[15px] sm:leading-8"
                            >
                              {paragraph}
                            </p>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </section>
              ))
            ) : (
              <div className="py-14 text-center sm:py-20">
                <Search
                  size={25}
                  className="mx-auto text-text-muted"
                  aria-hidden="true"
                />

                <h2 className="mt-4 font-heading text-2xl text-text">
                  Nothing found
                </h2>

                <p className="mt-2 text-sm leading-6 text-text-muted">
                  Try a different keyword to find a policy topic.
                </p>

                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="mt-5 text-sm font-semibold text-primary underline underline-offset-4 hover:text-primary-hover focus-visible:outline-2 focus-visible:outline-primary"
                >
                  Clear search
                </button>
              </div>
            )}
          </article>
        </div>

        {/* Simple closing section */}
        <footer className="mt-8 flex flex-col gap-5 border-t border-border py-7 sm:mt-10 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-xl">
            <p className="font-heading text-xl text-text">
              Need further information?
            </p>

            <p className="mt-2 text-sm leading-6 text-text-muted">
              Visit our contact page to review the available enquiry options.
            </p>
          </div>

          <Link
            to={relatedLink}
            className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          >
            Contact us
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </footer>
      </div>
    </main>
  );
}

export default PolicyPage;
