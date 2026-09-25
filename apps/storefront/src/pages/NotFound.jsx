import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 text-text">
      <div className="text-center">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-primary">
          RANI
        </p>

        <h1 className="mt-4 font-heading text-7xl font-medium">404</h1>

        <p className="mt-4 text-lg text-text-muted">
          This page is not part of our collection.
        </p>

        <Link
          to="/"
          className="mt-8 inline-flex rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition hover:bg-primary-hover"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}

export default NotFound;