import {
  ChevronRight,
  Heart,
  Search,
  ShoppingBag,
  UserRound,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";

function MobileMenu({ open, onClose, items }) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close menu"
        onClick={onClose}
        className="absolute inset-0 bg-charcoal/40 backdrop-blur-[2px]"
      />

      {/* Drawer */}
      <aside className="relative flex h-full w-[88%] max-w-sm flex-col border-r border-border bg-background shadow-2xl">
        {/* =====================================================
            HEADER
        ===================================================== */}
        <div className="flex shrink-0 items-center justify-between border-b border-border px-5 py-4 sm:px-6 sm:py-5">
          <Link
            to="/"
            onClick={onClose}
            aria-label="Bajwa's Collection home"
            className="text-left"
          >
            <span className="block font-heading text-lg font-medium leading-none tracking-[0.09em] text-text sm:text-xl">
              BAJWA&apos;S
            </span>

            <span className="mt-1 block text-[7px] font-medium uppercase tracking-[0.38em] text-text-muted sm:text-[8px]">
              Collection
            </span>
          </Link>

          <button
            type="button"
            aria-label="Close menu"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-text transition hover:border-primary/30 hover:bg-primary/5 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <X
              size={19}
              strokeWidth={1.8}
              aria-hidden="true"
            />
          </button>
        </div>

        {/* =====================================================
            SCROLLABLE CONTENT
        ===================================================== */}
        <div className="min-h-0 flex-1 overflow-y-auto">
          {/* Navigation */}
          <div className="px-5 py-6 sm:px-6 sm:py-7">
            <div className="mb-3 px-1">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted">
                Explore
              </p>
            </div>

            <nav>
              {items.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  onClick={onClose}
                  className="group flex items-center justify-between border-b border-border py-4 text-sm font-semibold uppercase tracking-[0.14em] text-text transition hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <span>
                    {item.label}
                  </span>

                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-transparent transition group-hover:border-primary/15 group-hover:bg-primary/5">
                    <ChevronRight
                      size={17}
                      strokeWidth={1.8}
                      aria-hidden="true"
                      className="transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                  </span>
                </Link>
              ))}
            </nav>
          </div>

          {/* =====================================================
              QUICK ACCESS
          ===================================================== */}
          <div className="border-y border-border bg-surface-muted px-5 py-6 sm:px-6">
            <p className="px-1 text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted">
              Quick access
            </p>

            <div className="mt-3 grid grid-cols-3 gap-2.5">
              <QuickLink
                to="/search"
                label="Search"
                icon={Search}
                onClick={onClose}
              />

              <QuickLink
                to="/account"
                label="Account"
                icon={UserRound}
                onClick={onClose}
              />

              <QuickLink
                to="/wishlist"
                label="Wishlist"
                icon={Heart}
                onClick={onClose}
              />
            </div>
          </div>

          {/* =====================================================
              BRAND MESSAGE
          ===================================================== */}
          <div className="px-5 py-6 sm:px-6 sm:py-7">
            <div className="rounded-2xl border border-primary/10 bg-linear-to-br from-primary/[0.08] to-[#F7F3EC] p-5 sm:p-6">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                Bajwa&apos;s Collection
              </span>

              <h2 className="mt-2 font-serif text-xl font-medium leading-tight tracking-tight text-text">
                Timeless Pakistani fashion.
              </h2>

              <p className="mt-2.5 text-xs leading-6 text-text-muted">
                Discover thoughtfully selected pieces designed for an elegant
                and refined wardrobe.
              </p>
            </div>
          </div>
        </div>

        {/* =====================================================
            FOOTER CTA
        ===================================================== */}
        <div className="shrink-0 border-t border-border bg-surface px-5 pb-5 pt-4 sm:px-6 sm:pb-6">
          <Link
            to="/cart"
            onClick={onClose}
            className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-sm transition-all duration-200 hover:bg-primary-hover hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary/20 active:scale-[0.99]"
          >
            <ShoppingBag
              size={18}
              strokeWidth={1.8}
              aria-hidden="true"
            />

            <span>
              View Shopping Bag
            </span>

            <ChevronRight
              size={16}
              strokeWidth={1.8}
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </Link>

          <p className="mt-3 text-center text-[9px] font-medium uppercase tracking-[0.14em] text-text-muted">
            Free delivery on orders above Rs. 5,000
          </p>
        </div>
      </aside>
    </div>
  );
}

function QuickLink({
  to,
  label,
  icon: Icon,
  onClick,
}) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="group flex min-h-[82px] flex-col items-center justify-center gap-2 rounded-2xl border border-border bg-background px-2 py-3 text-text transition hover:border-primary/20 hover:bg-surface hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
        <Icon
          size={17}
          strokeWidth={1.8}
          aria-hidden="true"
        />
      </span>

      <span className="text-[10px] font-semibold">
        {label}
      </span>
    </Link>
  );
}

export default MobileMenu;