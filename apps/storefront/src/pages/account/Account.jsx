import { LogOut, UserRound } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import useAuthStore from "../../store/authStore";

function Account() {
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate("/account/login");
  };

  return (
    <main className="min-h-[70vh] bg-background">
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-primary">
            My Account
          </p>

          <h1 className="mt-3 font-heading text-3xl font-medium text-text sm:text-4xl">
            Welcome back
          </h1>

          <p className="mt-3 text-sm text-text-muted">
            Manage your Bajwa&apos;s Collection account.
          </p>
        </div>

        <div className="mt-8 rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-7">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-surface-muted text-primary">
              <UserRound size={22} aria-hidden="true" />
            </div>

            <div className="min-w-0">
              <p className="text-sm font-semibold text-text">
                {user?.name || "Customer"}
              </p>

              <p className="mt-1 truncate text-sm text-text-muted">
                {user?.email || "No email available"}
              </p>
            </div>
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            <Link
              to="/wishlist"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-border px-5 py-3 text-sm font-semibold text-text transition-colors hover:border-primary/30 hover:bg-surface-muted hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              My Wishlist
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-semibold text-text transition-colors hover:border-primary/30 hover:bg-surface-muted hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <LogOut size={16} aria-hidden="true" />
              Sign Out
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Account;