import {
  Minus,
  Plus,
  ShoppingBag,
} from "lucide-react";

function AddToBag({
  quantity = 1,
  stock = 0,
  isSoldOut = false,
  requiresSize = false,
  selectedSize = "",
  buttonRef,
  onDecrease,
  onIncrease,
  onAddToBag,
}) {
  const isSizeMissing = requiresSize && !selectedSize;

  return (
    <div className="mt-8">
      {/* Quantity Header */}
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-semibold text-text">
          Quantity
        </p>

        {!isSoldOut && (
          <span className="text-xs font-medium text-text-muted">
            {stock} available
          </span>
        )}
      </div>

      {/* Controls */}
      <div className="mt-3 flex flex-col items-stretch gap-3 sm:flex-row sm:items-stretch">
        {/* Quantity Selector */}
        <div className="mx-auto flex h-13 w-full max-w-[220px] items-center justify-between rounded-full border border-border bg-background p-1.5 sm:mx-0 sm:w-36 sm:max-w-none sm:shrink-0">
          <button
            type="button"
            onClick={onDecrease}
            disabled={isSoldOut || quantity <= 1}
            aria-label="Decrease quantity"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-text transition hover:bg-surface-muted disabled:cursor-not-allowed disabled:opacity-40 focus:outline-none focus:ring-2 focus:ring-primary/30"
          >
            <Minus
              size={16}
              aria-hidden="true"
            />
          </button>

          <span
            className="min-w-8 text-center text-sm font-semibold text-text"
            aria-live="polite"
          >
            {quantity}
          </span>

          <button
            type="button"
            onClick={onIncrease}
            disabled={isSoldOut || quantity >= stock}
            aria-label="Increase quantity"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-text transition hover:bg-surface-muted disabled:cursor-not-allowed disabled:opacity-40 focus:outline-none focus:ring-2 focus:ring-primary/30"
          >
            <Plus
              size={16}
              aria-hidden="true"
            />
          </button>
        </div>

        {/* Add To Bag */}
        <button
          ref={buttonRef}
          type="button"
          onClick={onAddToBag}
          disabled={isSoldOut}
          className="group mx-auto inline-flex h-13 w-[94%] items-center justify-center gap-2 rounded-full bg-primary px-8 text-sm font-semibold leading-none text-primary-foreground shadow-sm transition-all duration-200 hover:bg-primary-hover hover:shadow-md disabled:pointer-events-none disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-primary/30 active:scale-[0.99] sm:mx-0 sm:w-auto sm:flex-1 sm:px-6"
        >
          <ShoppingBag
            size={18}
            aria-hidden="true"
            className="shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5"
          />

          <span className="whitespace-nowrap">
            {isSoldOut
              ? "Sold out"
              : isSizeMissing
                ? "Select a size"
                : "Add to bag"}
          </span>
        </button>
      </div>

      {/* Stock Information */}
      {!isSoldOut && (
        <p className="mt-3 text-center text-xs text-text-muted sm:text-left">
          {stock <= 5
            ? `Only ${stock} left in stock`
            : `${stock} items available`}
        </p>
      )}
    </div>
  );
}

export default AddToBag;