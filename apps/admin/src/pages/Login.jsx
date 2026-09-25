function Login() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-border bg-surface p-8 shadow-[var(--rani-shadow-card)]">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
              RANI
            </p>

            <h1 className="mt-3 text-3xl font-semibold text-text">
              Sign in to Admin
            </h1>

            <p className="mt-2 text-sm text-text-muted">
              Manage your retail business from one place.
            </p>
          </div>

          <form className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-text"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                placeholder="owner@example.com"
                className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm outline-none transition placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/10"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-text"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm outline-none transition placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/10"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary-hover"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default Login;