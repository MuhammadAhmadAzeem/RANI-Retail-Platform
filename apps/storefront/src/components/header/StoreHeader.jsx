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
import MiniCart from "../ecommerce/MiniCart";
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

  const [isMiniCartOpen, setIsMiniCartOpen] =
    useState(false);

  const [isCartDrawerOpen, setIsCartDrawerOpen] =
    useState(false);

  const wishlistCount = useWishlistStore(
    (state) => state.items.length
  );

  const cartCount = useCartStore(
    (state) =>
      state.items.reduce(
        (total, item) => total + item.quantity,
        0
      )
  );

  return (
    <>
      {/* =========================================================
          ANNOUNCEMENT BAR
      ========================================================= */}
      <div className="relative overflow-hidden border-b border-white/10 bg-primary text-primary-foreground">
        <div className="store-announcement-track flex w-max items-center whitespace-nowrap py-2.5">
          <AnnouncementGroup />
          <AnnouncementGroup />
        </div>
      </div>

      {/* =========================================================
          MAIN HEADER
      ========================================================= */}
      <header className="sticky top-0 z-40 border-b border-border/80 bg-background/95 backdrop-blur-xl supports-[backdrop-filter]:bg-background/80">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 sm:h-[4.5rem] sm:px-6 lg:h-20 lg:px-8">
          {/* =====================================================
              MOBILE MENU BUTTON
          ===================================================== */}
          <button
            type="button"
            aria-label={
              isMobileMenuOpen
                ? "Close menu"
                : "Open menu"
            }
            aria-expanded={isMobileMenuOpen}
            onClick={() =>
              setIsMobileMenuOpen((value) => !value)
            }
            className="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-transparent text-text transition hover:border-border hover:bg-surface-muted hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 lg:hidden"
          >
            {isMobileMenuOpen ? (
              <X
                size={21}
                strokeWidth={1.8}
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:rotate-90"
              />
            ) : (
              <Menu
                size={21}
                strokeWidth={1.8}
                aria-hidden="true"
              />
            )}
          </button>

          {/* =====================================================
              DESKTOP NAVIGATION
          ===================================================== */}
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

          {/* =====================================================
              BRAND
          ===================================================== */}
          <Link
            to="/"
            aria-label="Bajwa's Collection home"
            className="absolute left-1/2 -translate-x-1/2 text-center"
          >
            <span className="block font-heading text-[19px] font-medium leading-none tracking-[0.1em] text-text sm:text-[21px] lg:text-2xl">
              BAJWA&apos;S
            </span>

            <span className="mt-1 block text-[7px] font-medium uppercase tracking-[0.4em] text-text-muted sm:text-[8px] lg:text-[9px]">
              Collection
            </span>
          </Link>

          {/* =====================================================
              HEADER ACTIONS
          ===================================================== */}
          <div className="ml-auto flex items-center gap-0.5 sm:gap-1">
            {/* Search */}
            <Link
              to="/search"
              aria-label="Search"
              className="hidden h-10 w-10 items-center justify-center rounded-full border border-transparent text-text transition hover:border-border hover:bg-surface-muted hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 sm:inline-flex"
            >
              <Search
                size={19}
                strokeWidth={1.8}
                aria-hidden="true"
              />
            </Link>

            {/* Account */}
            <Link
              to="/account"
              aria-label="Account"
              className="hidden h-10 w-10 items-center justify-center rounded-full border border-transparent text-text transition hover:border-border hover:bg-surface-muted hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 sm:inline-flex"
            >
              <UserRound
                size={19}
                strokeWidth={1.8}
                aria-hidden="true"
              />
            </Link>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              aria-label={
                wishlistCount > 0
                  ? `Wishlist, ${wishlistCount} ${
                      wishlistCount === 1
                        ? "item"
                        : "items"
                    }`
                  : "Wishlist"
              }
              className="relative hidden h-10 w-10 items-center justify-center rounded-full border border-transparent text-text transition hover:border-border hover:bg-surface-muted hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 md:inline-flex"
            >
              <Heart
                size={19}
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

            {/* Shopping Bag */}
            <button
              type="button"
              onClick={() =>
                setIsCartDrawerOpen(true)
              }
              aria-label={
                cartCount > 0
                  ? `Shopping bag, ${cartCount} ${
                      cartCount === 1
                        ? "item"
                        : "items"
                    }`
                  : "Shopping bag"
              }
              aria-expanded={isCartDrawerOpen}
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-transparent text-text transition hover:border-border hover:bg-surface-muted hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <ShoppingBag
                size={19}
                strokeWidth={1.8}
                aria-hidden="true"
              />

              <span
                aria-hidden="true"
                className="absolute right-0 top-0 flex h-[17px] min-w-[17px] items-center justify-center rounded-full border-2 border-background bg-primary px-1 text-[8px] font-bold leading-none text-primary-foreground"
              >
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* =========================================================
          MOBILE MENU
      ========================================================= */}
      <MobileMenu
        open={isMobileMenuOpen}
        onClose={() =>
          setIsMobileMenuOpen(false)
        }
        items={navItems}
      />

      {/* =========================================================
          MINI CART
      ========================================================= */}
      <MiniCart
        open={isMiniCartOpen}
        onClose={() =>
          setIsMiniCartOpen(false)
        }
      />

      {/* =========================================================
          CART DRAWER
      ========================================================= */}
      <CartDrawer
        open={isCartDrawerOpen}
        onClose={() =>
          setIsCartDrawerOpen(false)
        }
      />

      {/* =========================================================
          ANNOUNCEMENT MARQUEE ANIMATION
      ========================================================= */}
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