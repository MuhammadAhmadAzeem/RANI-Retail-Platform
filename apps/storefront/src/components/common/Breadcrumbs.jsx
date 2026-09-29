import {
  ChevronRight,
  Home,
} from "lucide-react";
import { Link } from "react-router-dom";

function Breadcrumbs({
  items = [],
  className = "",
}) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex items-center gap-1.5 text-xs text-text-muted ${className}`}
    >
      <Link
        to="/"
        className="inline-flex shrink-0 items-center gap-1.5 transition-colors hover:text-primary"
      >
        <Home size={14} aria-hidden="true" />
        <span>Home</span>
      </Link>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div
            key={`${item.label}-${index}`}
            className="flex min-w-0 items-center gap-1.5"
          >
            <ChevronRight
              size={13}
              aria-hidden="true"
              className="shrink-0 text-text-muted/70"
            />

            {isLast || !item.href ? (
              <span
                aria-current={
                  isLast ? "page" : undefined
                }
                className={
                  isLast
                    ? "truncate font-medium text-text"
                    : "truncate"
                }
              >
                {item.label}
              </span>
            ) : (
              <Link
                to={item.href}
                className="truncate transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}

export default Breadcrumbs;