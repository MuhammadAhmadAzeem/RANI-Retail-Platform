import {
  ChevronDown,
  Heart,
  LayoutDashboard,
  LogOut,
  MapPin,
  Package,
  RotateCcw,
  UserRound,
} from "lucide-react";
import { useState } from "react";
import {
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";

import useAuthStore from "../store/authStore";

const accountLinks = [
  {
    to: "/account",
    label: "Overview",
    description: "Account summary",
    icon: LayoutDashboard,
    end: true,
  },
  {
    to: "/account/orders",
    label: "Orders",
    description: "Purchases and order history",
    icon: Package,
  },
  {
    to: "/account/wishlist",
    label: "Wishlist",
    description: "Your saved favourites",
    icon: Heart,
  },
  {
    to: "/account/addresses",
    label: "Addresses",
    description: "Delivery information",
    icon: MapPin,
  },
  {
    to: "/account/returns",
    label: "Returns",
    description: "Return requests",
    icon: RotateCcw,
  },
  {
    to: "/account/profile",
    label: "Profile",
    description: "Personal information",
    icon: UserRound,
  },
];

function getActiveLabel(pathname) {
  if (
    pathname === "/account" ||
    pathname === "/account/"
  ) {
    return "Overview";
  }

  const matchingLink = accountLinks.find(
    (item) =>
      item.to !== "/account" &&
      pathname.startsWith(item.to)
  );

  return matchingLink?.label || "Account Menu";
}

function AccountLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const activeLabel = getActiveLabel(location.pathname);
  const displayName = user?.name || "Customer";
  const firstName = displayName.split(" ")[0];

  const handleLogout = () => {
    setMobileMenuOpen(false);
    logout();
    navigate("/account/login");
  };

  const handleMobileNavigation = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div className="bg-background">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        {/* Mobile Account Navigation */}
        <div className="lg:hidden">
          <div className="relative">
            <button
              type="button"
              onClick={() =>
                setMobileMenuOpen((value) => !value)
              }
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-account-navigation"
              className="flex min-h-14 w-full items-center justify-between rounded-2xl border border-border bg-surface px-4 shadow-sm transition-colors hover:border-primary/20 focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <UserRound
                    size={17}
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                </div>

                <div className="min-w-0 text-left">
                  <p className="truncate text-sm font-semibold text-text">
                    {firstName}
                  </p>

                  <p className="truncate text-xs text-text-muted">
                    {activeLabel}
                  </p>
                </div>
              </div>

              <ChevronDown
                size={18}
                aria-hidden="true"
                className={`shrink-0 text-text-muted transition-transform duration-200 ${
                  mobileMenuOpen
                    ? "rotate-180 text-primary"
                    : ""
                }`}
              />
            </button>

            {mobileMenuOpen && (
              <div
                id="mobile-account-navigation"
                className="absolute inset-x-0 top-[calc(100%+0.5rem)] z-30 overflow-hidden rounded-2xl border border-border bg-surface p-2 shadow-lg"
              >
                <nav aria-label="Account navigation">
                  {accountLinks.map((item) => {
                    const Icon = item.icon;

                    return (
                      <NavLink
                        key={item.to}
                        to={item.to}
                        end={item.end}
                        onClick={handleMobileNavigation}
                        className={({ isActive }) =>
                          [
                            "flex items-center gap-3 rounded-xl px-3 py-3.5 transition-colors",
                            isActive
                              ? "bg-primary text-primary-foreground"
                              : "text-text hover:bg-surface-muted hover:text-primary",
                          ].join(" ")
                        }
                      >
                        {({ isActive }) => (
                          <>
                            <div
                              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                                isActive
                                  ? "bg-primary-foreground/10"
                                  : "bg-background"
                              }`}
                            >
                              <Icon
                                size={16}
                                strokeWidth={1.8}
                                aria-hidden="true"
                              />
                            </div>

                            <div className="min-w-0">
                              <p className="text-sm font-semibold">
                                {item.label}
                              </p>

                              <p
                                className={`mt-0.5 text-xs ${
                                  isActive
                                    ? "text-primary-foreground/70"
                                    : "text-text-muted"
                                }`}
                              >
                                {item.description}
                              </p>
                            </div>
                          </>
                        )}
                      </NavLink>
                    );
                  })}
                </nav>

                <div className="mt-2 border-t border-border pt-2">
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex min-h-11 w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-text-muted transition-colors hover:bg-surface-muted hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-background">
                      <LogOut
                        size={16}
                        strokeWidth={1.8}
                        aria-hidden="true"
                      />
                    </div>

                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Desktop Account Layout */}
        <div className="mt-6 grid gap-8 lg:mt-0 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
          <aside className="hidden lg:block">
            <div className="sticky top-6">
              <div className="rounded-2xl border border-border bg-surface p-4 shadow-sm">
                {/* User Summary */}
                <div className="border-b border-border px-2 pb-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <UserRound
                        size={18}
                        strokeWidth={1.8}
                        aria-hidden="true"
                      />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-text">
                        {displayName}
                      </p>

                      <p className="mt-0.5 truncate text-xs text-text-muted">
                        {user?.email || "Customer account"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Navigation */}
                <nav
                  aria-label="Account navigation"
                  className="mt-4 space-y-1"
                >
                  {accountLinks.map((item) => {
                    const Icon = item.icon;

                    return (
                      <NavLink
                        key={item.to}
                        to={item.to}
                        end={item.end}
                        className={({ isActive }) =>
                          [
                            "group flex items-center gap-3 rounded-xl px-3 py-3 transition-colors",
                            isActive
                              ? "bg-primary text-primary-foreground"
                              : "text-text-muted hover:bg-surface-muted hover:text-primary",
                          ].join(" ")
                        }
                      >
                        {() => (
                          <>
                            <Icon
                              size={17}
                              strokeWidth={1.8}
                              aria-hidden="true"
                              className="shrink-0"
                            />

                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-semibold">
                                {item.label}
                              </p>
                            </div>
                          </>
                        )}
                      </NavLink>
                    );
                  })}
                </nav>

                {/* Sign Out */}
                <div className="mt-4 border-t border-border pt-4">
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex min-h-11 w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-text-muted transition-colors hover:bg-surface-muted hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <LogOut
                      size={17}
                      strokeWidth={1.8}
                      aria-hidden="true"
                    />

                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </div>
          </aside>

          {/* Page Content */}
          <div className="min-w-0">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountLayout;