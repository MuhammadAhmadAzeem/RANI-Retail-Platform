import { ArrowLeft, House } from "lucide-react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-5 py-16 sm:px-8">
      <div className="w-full max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
          Error 404
        </p>

        <h1 className="mt-5 font-heading text-6xl font-medium tracking-tight sm:text-8xl">
          404
        </h1>

        <h2 className="mt-4 font-heading text-3xl font-medium sm:text-4xl">
          Page not found
        </h2>

        <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-text-muted sm:text-base">
          The page you're looking for doesn't exist or may have been moved
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/"
            className="inline-flex h-12 items-center justify-center gap-2 bg-primary px-6 text-sm font-semibold text-white transition hover:bg-primary-hover"
          >
            <House size={17} />
            Back to home
          </Link>

          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex h-12 items-center justify-center gap-2 border border-border bg-surface px-6 text-sm font-semibold transition hover:bg-surface-muted"
          >
            <ArrowLeft size={17} />
            Go back
          </button>
        </div>
      </div>
    </main>
  );
}

export default NotFound;