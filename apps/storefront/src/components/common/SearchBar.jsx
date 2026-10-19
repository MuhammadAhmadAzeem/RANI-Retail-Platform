import { Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import useDebounce from "../../hooks/useDebounce";
import { cn } from "../../lib/cn";

function SearchBar({
  defaultValue = "",
  placeholder = "Search products",
  onSearch,
  onSubmit,
  debounceDelay = 300,
  minSearchLength = 0,
  showSubmitButton = false,
  className,
  inputClassName,
  disabled = false,
}) {
  const [value, setValue] = useState(defaultValue);

  const debouncedValue = useDebounce(value, debounceDelay);

  // Keep the latest callback without making the search effect
  // depend on a callback that may change on every parent render.
  const onSearchRef = useRef(onSearch);

  const lastHandledSearch = useRef({
    value: debouncedValue,
    minSearchLength,
  });

  useEffect(() => {
    onSearchRef.current = onSearch;
  }, [onSearch]);

  useEffect(() => {
    const previous = lastHandledSearch.current;

    // Ignore unchanged search values.
    if (
      previous.value === debouncedValue &&
      previous.minSearchLength === minSearchLength
    ) {
      return;
    }

    // Record the value before notifying the parent.
    lastHandledSearch.current = {
      value: debouncedValue,
      minSearchLength,
    };

    const normalizedValue = debouncedValue.trim();

    if (
      normalizedValue.length === 0 ||
      normalizedValue.length >= minSearchLength
    ) {
      onSearchRef.current?.(normalizedValue);
    }
  }, [debouncedValue, minSearchLength]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const normalizedValue = value.trim();

    if (
      normalizedValue.length > 0 &&
      normalizedValue.length < minSearchLength
    ) {
      return;
    }

    onSubmit?.(normalizedValue);
  };

  const handleClear = () => {
    // Prevent the debounced empty value from triggering
    // the same search update a second time.
    lastHandledSearch.current = {
      value: "",
      minSearchLength,
    };

    setValue("");
    onSearchRef.current?.("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      className={cn(
        "flex h-11 w-full items-center rounded-full border border-border bg-surface px-4 transition-all duration-200 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/5",
        className
      )}
    >
      <Search
        size={17}
        aria-hidden="true"
        className="shrink-0 text-text-muted"
      />

      <input
        type="search"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        aria-label={placeholder}
        autoComplete="off"
        className={cn(
          "ml-3 min-w-0 flex-1 bg-transparent text-sm text-text outline-none placeholder:text-text-muted disabled:cursor-not-allowed disabled:opacity-50",
          inputClassName
        )}
      />

      {value && (
        <button
          type="button"
          onClick={handleClear}
          disabled={disabled}
          aria-label="Clear search"
          className="ml-2 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-text-muted transition hover:bg-surface-muted hover:text-primary disabled:pointer-events-none disabled:opacity-50"
        >
          <X size={15} aria-hidden="true" />
        </button>
      )}

      {showSubmitButton && (
        <button
          type="submit"
          disabled={disabled}
          className="ml-2 shrink-0 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition hover:bg-primary-hover disabled:pointer-events-none disabled:opacity-50"
        >
          Search
        </button>
      )}
    </form>
  );
}

export default SearchBar;