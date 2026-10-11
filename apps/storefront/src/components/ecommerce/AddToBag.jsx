
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
    <div className="mt-0">
      <div className="flex items-center justify-between gap-3">
        <label className="text-sm font-semibold text-text">
          Quantity
        </label>

        {!isSoldOut && (
          <span className="text-[11px] text-text-muted">
            {stock} available
          </span>
        )}
      </div>

      <div className="mt-3 grid grid-cols-[116px_minmax(0,1fr)] gap-3">
        {/* QUANTITY SELECTOR */}
        <div className="flex h-12 items-center justify-between rounded-full border border-border bg-surface px-1">
          <button
            type="button"
            onClick={onDecrease}
            disabled={isSoldOut || quantity <= 1}
            aria-label="Decrease quantity"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-text transition hover:bg-background hover:text-primary disabled:cursor-not-allowed disabled:opacity-35 focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <Minus size={15} aria-hidden="true" />
          </button>

          <span
            className="min-w-5 text-center text-sm font-semibold tabular-nums text-text"
            aria-live="polite"
            aria-atomic="true"
          >
            {quantity}
          </span>

          <button
            type="button"
            onClick={onIncrease}
            disabled={isSoldOut || quantity >= stock}
            aria-label="Increase quantity"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-text transition hover:bg-background hover:text-primary disabled:cursor-not-allowed disabled:opacity-35 focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <Plus size={15} aria-hidden="true" />
          </button>
        </div>

        {/* PRIMARY CTA */}
        <button
          ref={buttonRef}
          type="button"
          onClick={onAddToBag}
          disabled={isSoldOut}
          className="
            group inline-flex min-h-12 min-w-0 items-center
            justify-center gap-2 rounded-full bg-primary
            px-4 text-sm font-semibold text-primary-foreground
            shadow-sm transition duration-200
            hover:bg-primary-hover hover:shadow-md
            active:scale-[0.99]
            disabled:cursor-not-allowed disabled:opacity-50
            focus:outline-none focus:ring-2 focus:ring-primary/30
            focus:ring-offset-2
          "
        >
          <ShoppingBag
            size={17}
            aria-hidden="true"
            className="shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5"
          />

          <span className="truncate">
            {isSoldOut
              ? "Sold out"
              : isSizeMissing
                ? "Select a size"
                : "Add to bag"}
          </span>
        </button>
      </div>

      {/* SELECTION REMINDER */}
      {!isSoldOut && isSizeMissing && (
        <p className="mt-3 text-xs leading-5 text-text-muted">
          Please choose your size above before adding this item to your bag.
        </p>
      )}

      {/* STOCK STATUS */}
      {!isSoldOut && (
        <div className="mt-4 flex items-center gap-2">
          <span
            className={`h-1.5 w-1.5 shrink-0 rounded-full ${
              stock <= 5 ? "bg-warning" : "bg-green-600"
            }`}
          />

          <p className="text-[11px] leading-5 text-text-muted">
            {stock <= 5
              ? `Limited availability — ${stock} ${stock === 1 ? "item" : "items"} left`
              : "Available to order"}
          </p>
        </div>
      )}
    </div>
  );
}

export default AddToBag;
