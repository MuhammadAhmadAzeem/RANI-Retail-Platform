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
      <button
        type="button"
        aria-label="Close menu"
        onClick={onClose}
        className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"
      />

      <aside className="relative flex h-full w-[88%] max-w-sm flex-col bg-background shadow-2xl">
        <div className="flex items-center justify-between border-b border-border px-5 py-5">
          <div>
            <p className="font-heading text-lg tracking-[0.08em]">
              BAJWA'S
            </p>

            <p className="text-[8px] uppercase tracking-[0.35em] text-text-muted">
              Collection
            </p>
          </div>

          <button
            type="button"
            aria-label="Close menu"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-black/5"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-7">
          <nav className="space-y-1">
            {items.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                onClick={onClose}
                className="flex items-center justify-between border-b border-border py-4 text-sm font-medium uppercase tracking-[0.16em]"
              >
                {item.label}
                <ChevronRight size={17} strokeWidth={1.8} />
              </Link>
            ))}
          </nav>

          <div className="mt-8 grid grid-cols-3 gap-2">
            <Link
              to="/search"
              onClick={onClose}
              className="flex flex-col items-center gap-2 rounded-xl border border-border p-4 text-xs"
            >
              <Search size={18} />
              Search
            </Link>

            <Link
              to="/account"
              onClick={onClose}
              className="flex flex-col items-center gap-2 rounded-xl border border-border p-4 text-xs"
            >
              <UserRound size={18} />
              Account
            </Link>

            <Link
              to="/wishlist"
              onClick={onClose}
              className="flex flex-col items-center gap-2 rounded-xl border border-border p-4 text-xs"
            >
              <Heart size={18} />
              Wishlist
            </Link>
          </div>
        </div>

        <div className="border-t border-border px-5 py-5">
          <Link
            to="/cart"
            onClick={onClose}
            className="flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white"
          >
            <ShoppingBag size={18} />
            View Shopping Bag
          </Link>
        </div>
      </aside>
    </div>
  );
}

export default MobileMenu;