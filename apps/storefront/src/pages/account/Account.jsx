import {
  ArrowRight,
  Heart,
  MapPin,
  Package,
  RotateCcw,
  ShoppingBag,
  Sparkles,
  UserRound,
} from "lucide-react";
import { Link } from "react-router-dom";

import useAuthStore from "../../store/authStore";
import useWishlistStore from "../../store/wishlistStore";

const accountActions = [
  {
    to: "/account/orders",
    label: "Orders",
    description: "View purchases, delivery updates and order history.",
    icon: Package,
  },
  {
    to: "/account/wishlist",
    label: "Wishlist",
    description: "Keep the pieces you love saved for later.",
    icon: Heart,
  },
  {
    to: "/account/addresses",
    label: "Addresses",
    description: "Manage your saved delivery information.",
    icon: MapPin,
  },
  {
    to: "/account/returns",
    label: "Returns",
    description: "Get help with eligible order returns.",
    icon: RotateCcw,
  },
];

function Account() {
  const user = useAuthStore((state) => state.user);

  const wishlistCount = useWishlistStore(
    (state) => state.items.length
  );

  const displayName = user?.name || "Customer";
  const firstName = displayName.split(" ")[0];

  return (
    <section className="min-h-[70vh] bg-background">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        {/* Welcome Header */}
        <div className="relative overflow-hidden rounded-[1.75rem] border border-border bg-surface px-5 py-7 shadow-sm sm:px-8 sm:py-9 lg:px-10 lg:py-10">
          <div
            aria-hidden="true"
            className="absolute -right-12 -top-16 h-44 w-44 rounded-full bg-primary/[0.05] blur-2xl"
          />

          <div
            aria-hidden="true"
            className="absolute bottom-[-4rem] left-[35%] h-32 w-32 rounded-full bg-gold/[0.08] blur-2xl"
          />

          <div className="relative flex flex-col gap-7 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-4 sm:gap-5">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm sm:h-[4.5rem] sm:w-[4.5rem]">
                <UserRound
                  size={25}
                  strokeWidth={1.7}
                  aria-hidden="true"
                />
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <Sparkles
                    size={14}
                    className="text-gold"
                    aria-hidden="true"
                  />

                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-primary">
                    Your account
                  </p>
                </div>

                <h1 className="mt-2 truncate font-heading text-2xl font-medium tracking-tight text-text sm:text-3xl">
                  Welcome, {firstName}
                </h1>

                <p className="mt-1 truncate text-sm text-text-muted">
                  {user?.email || "Manage your Bajwa's Collection account"}
                </p>
              </div>
            </div>

            <Link
              to="/account/profile"
              className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-border bg-background px-5 py-3 text-sm font-semibold text-text transition-colors hover:border-primary/30 hover:bg-surface-muted hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 sm:w-auto"
            >
              <UserRound size={15} aria-hidden="true" />
              Edit Profile
            </Link>
          </div>
        </div>

        {/* Account Snapshot */}
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <Link
            to="/account/orders"
            className="group flex items-center justify-between rounded-2xl border border-border bg-surface px-5 py-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-muted text-primary">
                <Package size={17} aria-hidden="true" />
              </div>

              <div>
                <p className="text-sm font-semibold text-text">
                  Orders
                </p>

                <p className="mt-0.5 text-xs text-text-muted">
                  No orders yet
                </p>
              </div>
            </div>

            <ArrowRight
              size={16}
              className="text-text-muted transition-transform group-hover:translate-x-1 group-hover:text-primary"
              aria-hidden="true"
            />
          </Link>

          <Link
            to="/account/wishlist"
            className="group flex items-center justify-between rounded-2xl border border-border bg-surface px-5 py-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-muted text-primary">
                <Heart size={17} aria-hidden="true" />
              </div>

              <div>
                <p className="text-sm font-semibold text-text">
                  Wishlist
                </p>

                <p className="mt-0.5 text-xs text-text-muted">
                  {wishlistCount > 0
                    ? `${wishlistCount} saved ${
                        wishlistCount === 1 ? "piece" : "pieces"
                      }`
                    : "Nothing saved yet"}
                </p>
              </div>
            </div>

            <ArrowRight
              size={16}
              className="text-text-muted transition-transform group-hover:translate-x-1 group-hover:text-primary"
              aria-hidden="true"
            />
          </Link>

          <Link
            to="/account/addresses"
            className="group flex items-center justify-between rounded-2xl border border-border bg-surface px-5 py-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-muted text-primary">
                <MapPin size={17} aria-hidden="true" />
              </div>

              <div>
                <p className="text-sm font-semibold text-text">
                  Addresses
                </p>

                <p className="mt-0.5 text-xs text-text-muted">
                  Manage delivery details
                </p>
              </div>
            </div>

            <ArrowRight
              size={16}
              className="text-text-muted transition-transform group-hover:translate-x-1 group-hover:text-primary"
              aria-hidden="true"
            />
          </Link>
        </div>

        {/* Main Content */}
        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
          {/* Account Actions */}
          <div>
            <div className="mb-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-primary">
                Account tools
              </p>

              <h2 className="mt-2 font-heading text-2xl font-medium tracking-tight text-text sm:text-3xl">
                Everything in one place
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-text-muted">
                Quickly access the areas you use most throughout
                your shopping journey.
              </p>
            </div>

            <div className="overflow-hidden rounded-2xl border border-border bg-surface">
              {accountActions.map((item, index) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`group flex items-center gap-4 px-5 py-5 transition-colors hover:bg-surface-muted sm:px-6 ${
                      index !== accountActions.length - 1
                        ? "border-b border-border"
                        : ""
                    }`}
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-background text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon
                        size={18}
                        strokeWidth={1.8}
                        aria-hidden="true"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-sm font-semibold text-text sm:text-base">
                          {item.label}
                        </h3>

                        {item.label === "Wishlist" &&
                          wishlistCount > 0 && (
                            <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-primary">
                              {wishlistCount} saved
                            </span>
                          )}
                      </div>

                      <p className="mt-1 text-xs leading-5 text-text-muted sm:text-sm">
                        {item.description}
                      </p>
                    </div>

                    <ArrowRight
                      size={17}
                      className="shrink-0 text-text-muted transition-all duration-200 group-hover:translate-x-1 group-hover:text-primary"
                      aria-hidden="true"
                    />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Shopping Spotlight */}
          <aside className="relative overflow-hidden rounded-2xl bg-primary p-6 text-primary-foreground sm:p-7">
            <div
              aria-hidden="true"
              className="absolute -right-12 -top-12 h-36 w-36 rounded-full border border-primary-foreground/10"
            />

            <div
              aria-hidden="true"
              className="absolute -bottom-16 -left-12 h-40 w-40 rounded-full border border-primary-foreground/10"
            />

            <div className="relative">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-foreground/10">
                <ShoppingBag
                  size={19}
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
              </div>

              <p className="mt-7 text-[10px] font-semibold uppercase tracking-[0.22em] text-primary-foreground/65">
                Bajwa&apos;s Collection
              </p>

              <h2 className="mt-2 font-heading text-2xl font-medium leading-tight sm:text-3xl">
                Find your next favourite piece.
              </h2>

              <p className="mt-3 text-sm leading-6 text-primary-foreground/70">
                Explore fresh arrivals, elegant eastern wear,
                festive styles, and everyday essentials.
              </p>

              <Link
                to="/shop"
                className="mt-7 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-primary-foreground px-5 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary-foreground/90 focus:outline-none focus:ring-2 focus:ring-primary-foreground/30"
              >
                Explore Collection
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </aside>
        </div>

        {/* Wishlist Prompt */}
        {wishlistCount > 0 && (
          <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-gold/20 bg-gold/[0.06] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div className="flex items-start gap-3">
              <Heart
                size={18}
                className="mt-0.5 shrink-0 text-gold"
                aria-hidden="true"
              />

              <div>
                <p className="text-sm font-semibold text-text">
                  You have {wishlistCount}{" "}
                  {wishlistCount === 1 ? "piece" : "pieces"} saved.
                </p>

                <p className="mt-1 text-xs leading-5 text-text-muted">
                  Revisit your favourites whenever you are ready.
                </p>
              </div>
            </div>

            <Link
              to="/account/wishlist"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary-hover"
            >
              View Wishlist
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

export default Account;