import { Component } from "react";
import {
  isRouteErrorResponse,
  useRouteError,
} from "react-router-dom";

function ErrorState({ eyebrow, title, message }) {
  return (
    <main
      role="alert"
      className="flex min-h-[70vh] items-center justify-center bg-background px-5 py-16 text-text sm:px-8"
    >
      <div className="w-full max-w-xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          {eyebrow}
        </p>

        <h1 className="mt-5 font-heading text-3xl font-medium tracking-tight sm:text-5xl">
          {title}
        </h1>

        <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-text-muted sm:text-base">
          {message}
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="inline-flex min-h-12 items-center justify-center rounded-sm bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Try again
          </button>

          <a
            href="/"
            className="inline-flex min-h-12 items-center justify-center rounded-sm border border-border bg-surface px-6 py-3 text-sm font-semibold text-text transition hover:bg-surface-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Back to home
          </a>
        </div>
      </div>
    </main>
  );
}

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Storefront rendering error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorState
          eyebrow="Unexpected error"
          title="Something went wrong"
          message="An unexpected problem interrupted this page. Please try again."
        />
      );
    }

    return this.props.children;
  }
}

export function RouteErrorElement() {
  const error = useRouteError();

  const isNotFound =
    isRouteErrorResponse(error) && error.status === 404;

  const errorMessage =
    error instanceof Error ? error.message : String(error ?? "");

  const isNetworkFailure =
    error instanceof TypeError ||
    /network|failed to fetch|failed to load|dynamically imported module|importing a module script failed/i.test(
      errorMessage
    );

  const title = isNotFound
    ? "Page not found"
    : isNetworkFailure
      ? "Unable to load this page"
      : "Something went wrong";

  const message = isNotFound
    ? "The page you're looking for doesn't exist or may have been moved."
    : isNetworkFailure
      ? "We couldn't load this page. Check your internet connection and try again."
      : "Something interrupted this page. Please try again or return to the home page.";

  const eyebrow = isNotFound
    ? "Error 404"
    : isNetworkFailure
      ? "Connection issue"
      : "Page error";

  return (
    <ErrorState
      eyebrow={eyebrow}
      title={title}
      message={message}
    />
  );
}

export default ErrorBoundary;
