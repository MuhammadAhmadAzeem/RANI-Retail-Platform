import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 text-text">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
          RANI ADMIN
        </p>

        <h1 className="mt-4 text-7xl font-bold">404</h1>

        <p className="mt-4 text-text-muted">
          The requested admin page could not be found.
        </p>

        <Link
          to="/"
          className="mt-8 inline-flex rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary-hover"
        >
          Go to Dashboard
        </Link>
      </div>
    </main>
  );
}

export default NotFound;