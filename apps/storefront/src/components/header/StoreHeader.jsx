import {
  Heart,
  Menu,
  Search,
  ShoppingBag,
  UserRound,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import MobileMenu from "./MobileMenu";
import CartDrawer from "../ecommerce/CartDrawer";
import useWishlistStore from "../../store/wishlistStore";
import useCartStore from "../../store/cartStore";

const navItems = [
  { label: "New In", to: "/shop?filter=new" },
  { label: "Men", to: "/category/men" },
  { label: "Women", to: "/category/women" },
  { label: "Collections", to: "/collections" },
  { label: "Sale", to: "/shop?filter=sale" },
];

function StoreHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] =
    useState(false);

  const isCartDrawerOpen = useCartStore(
    (state) => state.isCartDrawerOpen
  );

  const openCartDrawer = useCartStore(
    (state) => state.openCartDrawer
  );

  const closeCartDrawer = useCartStore(
    (state) => state.closeCartDrawer
  );

  const wishlistCount = useWishlistStore(
    (state) => state.items.length
  );

  const cartCount = useCartStore((state) =>
    state.items.reduce(
      (total, item) => total + item.quantity,
      0
    )
  );

  return (
    <>
      {/* Announcement bar */}
      <div className="relative overflow-hidden border-b border-white/10 bg-primary text-primary-foreground">
        <div className="store-announcement-track flex w-max items-center whitespace-nowrap py-2.5">
          <AnnouncementGroup />
          <AnnouncementGroup />
        </div>
      </div>

      {/* Main header */}
      <header className="sticky top-0 z-40 border-b border-border/80 bg-background/95 backdrop-blur-xl supports-[backdrop-filter]:bg-background/80">
        <div className="relative mx-auto grid h-16 max-w-[1440px] grid-cols-[36px_minmax(0,1fr)_auto] items-center gap-1 px-3 sm:flex sm:h-[4.5rem] sm:justify-between sm:px-6 lg:h-20 lg:px-8">
          {/* Mobile menu button */}
          <button
            type="button"
            aria-label={
              isMobileMenuOpen ? "Close menu" : "Open menu"
            }
            aria-expanded={isMobileMenuOpen}
            onClick={() =>
              setIsMobileMenuOpen((value) => !value)
            }
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-transparent text-text transition hover:border-border hover:bg-surface-muted hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 sm:h-10 sm:w-10 lg:hidden"
          >
            {isMobileMenuOpen ? (
              <X
                className="size-[19px] sm:size-[21px]"
                strokeWidth={1.8}
                aria-hidden="true"
              />
            ) : (
              <Menu
                className="size-[19px] sm:size-[21px]"
                strokeWidth={1.8}
                aria-hidden="true"
              />
            )}
          </button>

          {/* Desktop navigation */}
          <nav className="hidden items-center gap-6 lg:flex xl:gap-8">
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                className="group relative py-3 text-[11px] font-semibold uppercase tracking-[0.17em]"
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={
                        isActive
                          ? "text-primary"
                          : "text-text transition-colors duration-200 group-hover:text-primary"
                      }
                    >
                      {item.label}
                    </span>

                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-0 bottom-0 mx-auto h-px bg-primary transition-transform duration-200 ${
                        isActive
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Brand — always centered relative to the header */}
          <Link
            to="/"
            aria-label="Bajwa's Collection home"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
          >
            <span className="block whitespace-nowrap font-heading text-[14px] font-medium leading-none tracking-[0.035em] text-text min-[360px]:text-[16px] min-[360px]:tracking-[0.06em] sm:text-[21px] sm:tracking-[0.1em] lg:text-2xl">
              BAJWA&apos;S
            </span>

            <span className="mt-1 block whitespace-nowrap text-[6px] font-medium uppercase tracking-[0.22em] text-text-muted min-[360px]:text-[7px] min-[360px]:tracking-[0.3em] sm:text-[8px] sm:tracking-[0.4em] lg:text-[9px]">
              Collection
            </span>
          </Link>

          {/* Header actions */}
          <div className="col-start-3 ml-0 flex items-center justify-self-end gap-0 min-[380px]:gap-0.5 sm:ml-auto sm:gap-1">
            {/* Search — always visible */}
            <Link
              to="/search"
              aria-label="Search products"
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-transparent text-text transition hover:border-border hover:bg-surface-muted hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 sm:h-10 sm:w-10"
            >
              <Search
                className="size-[17px] sm:size-[19px]"
                strokeWidth={1.8}
                aria-hidden="true"
              />
            </Link>

            {/* Account — visible from 640px upward */}
            <Link
              to="/account"
              aria-label="Account"
              className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-transparent text-text transition hover:border-border hover:bg-surface-muted hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 sm:inline-flex"
            >
              <UserRound
                className="size-[19px]"
                strokeWidth={1.8}
                aria-hidden="true"
              />
            </Link>

            {/* Wishlist — always visible */}
            <Link
              to="/wishlist"
              aria-label={
                wishlistCount > 0
                  ? `Wishlist, ${wishlistCount} ${
                      wishlistCount === 1 ? "item" : "items"
                    }`
                  : "Wishlist"
              }
              className="relative inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-transparent text-text transition hover:border-border hover:bg-surface-muted hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 sm:h-10 sm:w-10"
            >
              <Heart
                className="size-[17px] sm:size-[19px]"
                strokeWidth={1.8}
                aria-hidden="true"
              />

              {wishlistCount > 0 && (
                <span
                  aria-hidden="true"
                  className="absolute right-0 top-0 flex h-[17px] min-w-[17px] items-center justify-center rounded-full border-2 border-background bg-primary px-1 text-[8px] font-bold leading-none text-primary-foreground"
                >
                  {wishlistCount > 99 ? "99+" : wishlistCount}
                </span>
              )}
            </Link>

            {/* Shopping bag — always visible */}
            <button
              type="button"
              onClick={openCartDrawer}
              aria-label={
                cartCount > 0
                  ? `Shopping bag, ${cartCount} ${
                      cartCount === 1 ? "item" : "items"
                    }`
                  : "Shopping bag"
              }
              aria-expanded={isCartDrawerOpen}
              aria-haspopup="dialog"
              className="relative inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-transparent text-text transition hover:border-border hover:bg-surface-muted hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 sm:h-10 sm:w-10"
            >
              <ShoppingBag
                className="size-[17px] sm:size-[19px]"
                strokeWidth={1.8}
                aria-hidden="true"
              />

              {cartCount > 0 && (
                <span
                  aria-hidden="true"
                  className="absolute right-0 top-0 flex h-[17px] min-w-[17px] items-center justify-center rounded-full border-2 border-background bg-primary px-1 text-[8px] font-bold leading-none text-primary-foreground"
                >
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile navigation drawer */}
      <MobileMenu
        open={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        items={navItems}
      />

      {/* Shared cart drawer */}
      <CartDrawer
        open={isCartDrawerOpen}
        onClose={closeCartDrawer}
      />

      {/* Announcement animation */}
      <style>{`
        .store-announcement-track {
          animation: store-announcement-scroll 18s linear infinite;
          will-change: transform;
        }

        @keyframes store-announcement-scroll {
          from {
            transform: translate3d(0, 0, 0);
          }

          to {
            transform: translate3d(-50%, 0, 0);
          }
        }

        .store-announcement-track:hover {
          animation-play-state: paused;
        }

        @media (prefers-reduced-motion: reduce) {
          .store-announcement-track {
            animation: none;
          }
        }
      `}</style>
    </>
  );
}

function AnnouncementGroup() {
  return (
    <div className="flex shrink-0 items-center">
      <AnnouncementMessage>
        Free delivery on orders above Rs. 5,000
      </AnnouncementMessage>

      <AnnouncementSeparator />

      <AnnouncementMessage>
        Discover timeless Pakistani fashion by Bajwa&apos;s Collections
      </AnnouncementMessage>

      <AnnouncementSeparator />
    </div>
  );
}

function AnnouncementMessage({ children }) {
  return (
    <span className="px-6 text-[10px] font-semibold uppercase tracking-[0.18em] sm:px-10 sm:text-[11px]">
      {children}
    </span>
  );
}

function AnnouncementSeparator() {
  return (
    <span
      aria-hidden="true"
      className="h-1 w-1 shrink-0 rounded-full bg-[#B08D57]"
    />
  );
}

export default StoreHeader;