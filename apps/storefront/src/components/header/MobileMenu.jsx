import {
  ArrowRight,
  ChevronRight,
  ShoppingBag,
  Sparkles,
  UserRound,
  X,
} from "lucide-react";
import { useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";

const categoryDescriptions = {
  "New In": "Fresh arrivals, just discovered",
  Men: "Modern eastern essentials",
  Women: "Signature eastern style",
  Collections: "Curated edits for every mood",
  Sale: "Explore selected styles",
};

function MobileMenu({ open, onClose, items = [] }) {
  const drawerRef = useRef(null);
  const closeButtonRef = useRef(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    const previouslyFocused = document.activeElement;

    document.body.style.overflow = "hidden";

    const focusFrame = window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onCloseRef.current?.();
        return;
      }

      if (event.key !== "Tab" || !drawerRef.current) {
        return;
      }

      const focusableElements =
        drawerRef.current.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );

      const firstElement = focusableElements[0];
      const lastElement =
        focusableElements[focusableElements.length - 1];

      if (!firstElement || !lastElement) {
        return;
      }

      if (
        event.shiftKey &&
        document.activeElement === firstElement
      ) {
        event.preventDefault();
        lastElement.focus();
      } else if (
        !event.shiftKey &&
        document.activeElement === lastElement
      ) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;

      if (
        previouslyFocused instanceof HTMLElement &&
        previouslyFocused.isConnected
      ) {
        previouslyFocused.focus();
      }
    };
  }, [open]);

  if (!open) {
    return null;
  }

  return (
    <div className="rani-boutique-menu fixed inset-0 z-50 lg:hidden">
      {/* Animated, dimmed backdrop */}
      <button
        type="button"
        tabIndex={-1}
        aria-label="Close navigation menu"
        onClick={onClose}
        className="rani-boutique-backdrop absolute inset-0 cursor-default bg-[#211714]/50 backdrop-blur-[3px]"
      />

      {/* Premium boutique drawer */}
      <aside
        id="store-mobile-menu"
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Bajwa's Collection navigation"
        className="rani-boutique-panel relative flex h-[100dvh] w-[91%] max-w-[420px] flex-col overflow-hidden rounded-r-[26px] border-r border-[#E4D5C4] bg-linear-to-br from-[#FFF9F2] via-[#F7F0E8] to-[#EADCCF] text-[#30251F] shadow-[20px_0_65px_rgba(35,20,15,0.23)]"
      >
        {/* Soft multicolour ambient accents */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 top-24 size-48 rounded-full bg-[#DAB6B9]/35 blur-3xl"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-16 top-[42%] size-44 rounded-full bg-[#D5BC91]/25 blur-3xl"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 bottom-20 size-48 rounded-full bg-[#D4B3A0]/25 blur-3xl"
        />

        {/* Rich burgundy brand header */}
        <header className="relative z-10 shrink-0 overflow-hidden bg-linear-to-br from-[#4D1520] via-[#6B1F2A] to-[#925B50] px-5 pb-5 pt-6 text-[#FFF8EF] sm:px-7 sm:pb-6 sm:pt-7">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-8 -top-14 size-44 rounded-full border border-[#D8B98A]/20"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-2 -top-8 size-32 rounded-full border border-[#D8B98A]/15"
          />

          <div className="relative flex items-start justify-between gap-4">
            <Link
              to="/"
              onClick={onClose}
              aria-label="Bajwa's Collection home"
              className="block text-left"
            >
              <span className="block font-heading text-[25px] font-medium leading-none tracking-[0.12em]">
                BAJWA&apos;S
              </span>

              <span className="mt-2 block text-[8px] font-medium uppercase tracking-[0.44em] text-[#F1DCC4]/80">
                Collection
              </span>
            </Link>

            <button
              ref={closeButtonRef}
              type="button"
              aria-label="Close navigation menu"
              onClick={onClose}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/[0.09] transition-all duration-200 hover:rotate-90 hover:border-[#E7C69A]/70 hover:bg-white/[0.16] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F7DFC0]"
            >
              <X size={19} strokeWidth={1.7} aria-hidden="true" />
            </button>
          </div>

          <div className="relative mt-5 flex items-center gap-2">
            <span
              aria-hidden="true"
              className="h-px w-7 bg-[#D5B27B]"
            />

            <p className="text-[9px] font-semibold uppercase tracking-[0.19em] text-[#FFF1DF]/85">
              A more personal kind of elegance
            </p>
          </div>

          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-[#D5B27B]/80 to-transparent"
          />
        </header>

        {/* Scrollable content */}
        <div className="relative z-10 min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-6 sm:px-7">
          {/* Colourful editorial introduction */}
          <section className="rani-boutique-intro relative mt-5 overflow-hidden rounded-2xl border border-white/80 bg-linear-to-br from-[#FFFFFF]/90 via-[#F9EAE4]/90 to-[#E8D5B6]/80 p-4 shadow-[0_5px_20px_rgba(94,53,39,0.06)] sm:p-5">
            <div
              aria-hidden="true"
              className="absolute -right-7 -top-8 size-24 rounded-full bg-[#D5ABB0]/30 blur-2xl"
            />

            <div className="relative">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#B08D57]/30 bg-white/65 px-2.5 py-1.5 text-[9px] font-semibold uppercase tracking-[0.13em] text-[#8A633A]">
                <Sparkles size={12} aria-hidden="true" />
                The Bajwa&apos;s edit
              </span>

              <h2 className="mt-3 max-w-[270px] font-heading text-[28px] font-normal leading-tight tracking-[-0.025em] text-[#4D2027]">
                Find your signature style.
              </h2>

              <p className="mt-2 max-w-[270px] text-[11px] leading-5 text-[#76645A]">
                New discoveries, timeless eastern wear and
                pieces for your special moments.
              </p>

              <div
                aria-hidden="true"
                className="mt-4 h-px w-full bg-linear-to-r from-[#B08D57]/60 via-[#D7B9A4]/50 to-transparent"
              />

              <div className="mt-3 flex items-center justify-between gap-3">
                <span className="text-[9px] font-medium uppercase tracking-[0.13em] text-[#8B7668]">
                  Your wardrobe, thoughtfully curated
                </span>

                <Sparkles
                  size={15}
                  strokeWidth={1.5}
                  className="shrink-0 text-[#A27C48]"
                  aria-hidden="true"
                />
              </div>
            </div>
          </section>

          {/* Main navigation */}
          <section
            aria-labelledby="rani-boutique-categories"
            className="mt-6"
          >
            <div className="mb-3 flex items-center gap-3">
              <h3
                id="rani-boutique-categories"
                className="shrink-0 text-[9px] font-bold uppercase tracking-[0.19em] text-[#78695C]"
              >
                Explore the collection
              </h3>

              <span
                aria-hidden="true"
                className="h-px flex-1 bg-linear-to-r from-[#C7A575]/70 to-transparent"
              />
            </div>

            <nav
              aria-label="Shop categories"
              className="space-y-2"
            >
              {items.map((item, index) => (
                <NavLink
                  key={item.label}
                  to={item.to}
                  onClick={onClose}
                  style={{
                    animationDelay: `${index * 45}ms`,
                  }}
                  className={({ isActive }) =>
                    `rani-boutique-nav-item group relative flex min-h-[66px] items-center gap-3 overflow-hidden rounded-xl border px-3 py-3 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6B1F2A] ${
                      isActive
                        ? "border-transparent bg-linear-to-r from-[#6B1F2A] via-[#7E3440] to-[#956055] text-[#FFF8EF] shadow-[0_5px_14px_rgba(107,31,42,0.16)]"
                        : "border-white/80 bg-white/55 text-[#342923] shadow-[0_2px_8px_rgba(75,47,35,0.035)] hover:-translate-y-px hover:border-[#D6BCA0] hover:bg-white/90 hover:shadow-[0_4px_14px_rgba(75,47,35,0.07)]"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <span
                          aria-hidden="true"
                          className="absolute inset-y-2 left-0 w-[3px] rounded-r-full bg-[#E5C18B]"
                        />
                      )}

                      <span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border font-heading text-sm transition-colors duration-200 ${
                          isActive
                            ? "border-white/15 bg-white/10 text-[#F3D2A4]"
                            : "border-[#E9D9C8] bg-linear-to-br from-[#FAEFE4] to-[#E9D8C7] text-[#8A633A] group-hover:border-[#D8BA99]"
                        }`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="block text-[11px] font-bold uppercase tracking-[0.13em]">
                          {item.label}
                        </span>

                        <span
                          className={`mt-1 block text-[10px] leading-4 ${
                            isActive
                              ? "text-[#FFF0DE]/75"
                              : "text-[#817064]"
                          }`}
                        >
                          {categoryDescriptions[item.label] ||
                            "Discover the edit"}
                        </span>
                      </span>

                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-200 ${
                          isActive
                            ? "bg-white/10 text-[#F3D2A4]"
                            : "border border-[#E7DACC] bg-white/55 text-[#8B7C6D] group-hover:translate-x-0.5 group-hover:border-[#C8A77A] group-hover:text-[#6B1F2A]"
                        }`}
                      >
                        <ChevronRight
                          size={16}
                          strokeWidth={1.6}
                          aria-hidden="true"
                        />
                      </span>
                    </>
                  )}
                </NavLink>
              ))}
            </nav>
          </section>

          {/* Account and shopping shortcuts */}
          <section
            aria-labelledby="rani-boutique-essentials"
            className="mt-6"
          >
            <div className="flex items-center gap-3">
              <h3
                id="rani-boutique-essentials"
                className="shrink-0 text-[9px] font-bold uppercase tracking-[0.19em] text-[#78695C]"
              >
                Your essentials
              </h3>

              <span
                aria-hidden="true"
                className="h-px flex-1 bg-linear-to-r from-[#C7A575]/70 to-transparent"
              />
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2.5">
              <Link
                to="/account"
                onClick={onClose}
                className="group flex min-h-[77px] items-center gap-2.5 rounded-xl border border-white/85 bg-linear-to-br from-white/85 to-[#F1E5D8]/80 px-3 py-3 transition-all duration-200 hover:border-[#D3B18A] hover:shadow-[0_4px_14px_rgba(75,47,35,0.07)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6B1F2A]"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-[#F0DED1] to-[#DCC3AB] text-[#6B1F2A] transition-transform duration-200 group-hover:scale-105">
                  <UserRound
                    size={17}
                    strokeWidth={1.6}
                    aria-hidden="true"
                  />
                </span>

                <span className="min-w-0">
                  <span className="block text-[10px] font-bold text-[#392A24]">
                    My account
                  </span>

                  <span className="mt-1 block text-[9px] leading-4 text-[#827064]">
                    Profile & orders
                  </span>
                </span>
              </Link>

              <Link
                to="/cart"
                onClick={onClose}
                className="group flex min-h-[77px] items-center gap-2.5 rounded-xl border border-white/85 bg-linear-to-br from-white/85 to-[#E8DDD4]/80 px-3 py-3 transition-all duration-200 hover:border-[#D3B18A] hover:shadow-[0_4px_14px_rgba(75,47,35,0.07)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6B1F2A]"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-[#E9D9CB] to-[#D5C5B5] text-[#6B1F2A] transition-transform duration-200 group-hover:scale-105">
                  <ShoppingBag
                    size={17}
                    strokeWidth={1.6}
                    aria-hidden="true"
                  />
                </span>

                <span className="min-w-0">
                  <span className="block text-[10px] font-bold text-[#392A24]">
                    Shopping bag
                  </span>

                  <span className="mt-1 block text-[9px] leading-4 text-[#827064]">
                    Your selected pieces
                  </span>
                </span>
              </Link>
            </div>
          </section>

          {/* Subtle multicolour brand panel */}
          <div className="relative mt-5 mb-5 overflow-hidden rounded-2xl border border-white/80 bg-linear-to-br from-[#F3E0DD] via-[#F8F0E6] to-[#E5D2B0] p-4 shadow-[0_4px_16px_rgba(75,47,35,0.045)]">
            <div
              aria-hidden="true"
              className="absolute -right-6 -top-8 size-28 rounded-full bg-[#CA9D9D]/25 blur-2xl"
            />

            <div className="relative flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/70 bg-white/55 text-[#895A48]">
                <Sparkles
                  size={17}
                  strokeWidth={1.6}
                  aria-hidden="true"
                />
              </span>

              <div className="min-w-0 flex-1">
                <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#825B46]">
                  The art of dressing well
                </p>

                <h3 className="mt-1.5 font-heading text-[20px] leading-snug text-[#56232A]">
                  Made for your moments.
                </h3>

                <p className="mt-1.5 text-[10px] leading-5 text-[#78675B]">
                  Timeless silhouettes. Thoughtful details.
                  A distinctly eastern expression.
                </p>

                <Link
                  to="/collections"
                  onClick={onClose}
                  className="mt-3 inline-flex min-h-8 items-center gap-2 text-[9px] font-bold uppercase tracking-[0.13em] text-[#6B1F2A] transition-colors hover:text-[#45141C] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6B1F2A]"
                >
                  Discover our collections

                  <ArrowRight
                    size={13}
                    aria-hidden="true"
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Fixed footer */}
        <footer className="relative z-10 shrink-0 border-t border-[#E2D2C0] bg-linear-to-r from-[#F5E9DD] via-[#FAF2E9] to-[#EAD9C5] px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4 sm:px-7">
          <Link
            to="/shop"
            onClick={onClose}
            className="group relative inline-flex min-h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-linear-to-r from-[#5A1823] via-[#6B1F2A] to-[#8C4C43] px-5 text-[10px] font-bold uppercase tracking-[0.15em] text-white shadow-[0_5px_16px_rgba(92,27,37,0.2)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(92,27,37,0.25)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6B1F2A] active:translate-y-0"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -translate-x-full bg-linear-to-r from-transparent via-white/10 to-transparent transition-transform duration-500 group-hover:translate-x-[400%]"
            />

            <span className="relative">Explore the collection</span>

            <ArrowRight
              size={15}
              strokeWidth={1.7}
              aria-hidden="true"
              className="relative transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>

          <p className="mt-3 text-center text-[9px] font-medium uppercase tracking-[0.11em] text-[#817063]">
            Free delivery on orders above Rs. 5,000
          </p>
        </footer>
      </aside>

      {/* Drawer and category entrance animations */}
      <style>{`
        .rani-boutique-backdrop {
          animation: rani-boutique-fade 200ms ease-out both;
        }

        .rani-boutique-panel {
          animation: rani-boutique-slide 300ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .rani-boutique-nav-item {
          animation: rani-boutique-item-in 360ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        @keyframes rani-boutique-fade {
          from {
            opacity: 0;
          }

          to {
            opacity: 1;
          }
        }

        @keyframes rani-boutique-slide {
          from {
            opacity: 0.85;
            transform: translateX(-18px);
          }

          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes rani-boutique-item-in {
          from {
            opacity: 0;
            transform: translateY(7px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .rani-boutique-backdrop,
          .rani-boutique-panel,
          .rani-boutique-nav-item {
            animation: none;
          }

          .rani-boutique-nav-item,
          .rani-boutique-panel,
          .rani-boutique-backdrop {
            transition: none;
          }
        }
      `}</style>
    </div>
  );
}

export default MobileMenu;