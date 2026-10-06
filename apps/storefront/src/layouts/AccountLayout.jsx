import {
  Heart,
  LayoutDashboard,
  LogOut,
  MapPin,
  Package,
  RotateCcw,
  UserRound,
} from "lucide-react";
import {
  NavLink,
  Outlet,
  useNavigate,
} from "react-router-dom";

import useAuthStore from "../store/authStore";

const accountLinks = [
  {
    to: "/account",
    label: "Overview",
    icon: LayoutDashboard,
    end: true,
  },
  {
    to: "/account/profile",
    label: "Profile",
    icon: UserRound,
  },
  {
    to: "/account/orders",
    label: "Orders",
    icon: Package,
  },
  {
    to: "/account/addresses",
    label: "Addresses",
    icon: MapPin,
  },
  {
    to: "/account/wishlist",
    label: "Wishlist",
    icon: Heart,
  },
  {
    to: "/account/returns",
    label: "Returns",
    icon: RotateCcw,
  },
];

function AccountLayout() {
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate("/account/login");
  };

  return (
    <div className="bg-background">
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-primary">
            My Account
          </p>

          <h1 className="mt-3 font-heading text-3xl font-medium text-text sm:text-4xl">
            Account
          </h1>

          <p className="mt-2 text-sm text-text-muted">
            {user?.name
              ? `Welcome, ${user.name}.`
              : "Manage your Bajwa's Collection account."}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[240px_minmax(0,1fr)]">
          <aside>
            <nav
              aria-label="Account navigation"
              className="rounded-2xl border border-border bg-surface p-2 shadow-sm"
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
                        "flex min-h-11 items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "text-text-muted hover:bg-surface-muted hover:text-primary",
                      ].join(" ")
                    }
                  >
                    <Icon
                      size={17}
                      strokeWidth={1.8}
                      aria-hidden="true"
                    />

                    <span>{item.label}</span>
                  </NavLink>
                );
              })}

              <button
                type="button"
                onClick={handleLogout}
                className="mt-2 flex min-h-11 w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-text-muted transition-colors hover:bg-surface-muted hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <LogOut
                  size={17}
                  strokeWidth={1.8}
                  aria-hidden="true"
                />

                <span>Sign Out</span>
              </button>
            </nav>
          </aside>

          <div className="min-w-0">
            <Outlet />
          </div>
        </div>
      </section>
    </div>
  );
}

export default AccountLayout;