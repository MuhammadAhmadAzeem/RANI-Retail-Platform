import {
  Search,
  X,
} from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
} from "react";

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

  const debouncedValue = useDebounce(
    value,
    debounceDelay
  );

  const hasMounted = useRef(false);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }

    const normalizedValue = debouncedValue.trim();

    if (
      normalizedValue.length === 0 ||
      normalizedValue.length >= minSearchLength
    ) {
      onSearch?.(normalizedValue);
    }
  }, [
    debouncedValue,
    minSearchLength,
    onSearch,
  ]);

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
    setValue("");
    onSearch?.("");
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
        onChange={(event) =>
          setValue(event.target.value)
        }
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
          <X size={15} />
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