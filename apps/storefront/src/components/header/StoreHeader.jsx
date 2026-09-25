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

const navItems = [
  { label: "New In", to: "/shop?filter=new" },
  { label: "Men", to: "/category/men" },
  { label: "Women", to: "/category/women" },
  { label: "Collections", to: "/collections" },
  { label: "Sale", to: "/shop?filter=sale" },
];

function StoreHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <div className="border-b border-black/5 bg-primary px-4 py-2 text-center text-[11px] font-medium uppercase tracking-[0.18em] text-white sm:text-xs">
        Free delivery on orders above Rs. 5,000
      </div>

      <header className="sticky top-0 z-40 border-b border-border/80 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="mx-auto flex h-18 max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Mobile menu button */}
          <button
            type="button"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((value) => !value)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-text transition hover:bg-black/5 lg:hidden"
          >
            {isMobileMenuOpen ? (
              <X size={21} strokeWidth={1.8} />
            ) : (
              <Menu size={21} strokeWidth={1.8} />
            )}
          </button>

          {/* Desktop left navigation */}
          <nav className="hidden items-center gap-7 lg:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                className={({ isActive }) =>
                  [
                    "relative py-2 text-[12px] font-medium uppercase tracking-[0.16em] transition",
                    isActive
                      ? "text-primary"
                      : "text-text hover:text-primary",
                  ].join(" ")
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Brand */}
          <Link
            to="/"
            aria-label="Bajwa's Collection home"
            className="absolute left-1/2 -translate-x-1/2 text-center"
          >
            <span className="block font-heading text-[20px] font-medium tracking-[0.08em] sm:text-2xl">
              BAJWA'S
            </span>

            <span className="mt-[-2px] block text-[8px] font-medium uppercase tracking-[0.38em] text-text-muted sm:text-[9px]">
              Collection
            </span>
          </Link>

          {/* Actions */}
          <div className="ml-auto flex items-center gap-1">
            <Link
              to="/search"
              aria-label="Search"
              className="hidden h-10 w-10 items-center justify-center rounded-full text-text transition hover:bg-black/5 sm:inline-flex"
            >
              <Search size={20} strokeWidth={1.8} />
            </Link>

            <Link
              to="/account"
              aria-label="Account"
              className="hidden h-10 w-10 items-center justify-center rounded-full text-text transition hover:bg-black/5 sm:inline-flex"
            >
              <UserRound size={20} strokeWidth={1.8} />
            </Link>

            <Link
              to="/wishlist"
              aria-label="Wishlist"
              className="hidden h-10 w-10 items-center justify-center rounded-full text-text transition hover:bg-black/5 md:inline-flex"
            >
              <Heart size={20} strokeWidth={1.8} />
            </Link>

            <Link
              to="/cart"
              aria-label="Shopping bag"
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-text transition hover:bg-black/5"
            >
              <ShoppingBag size={20} strokeWidth={1.8} />

              <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[9px] font-semibold text-white">
                0
              </span>
            </Link>
          </div>
        </div>
      </header>

      <MobileMenu
        open={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        items={navItems}
      />
    </>
  );
}

export default StoreHeader;