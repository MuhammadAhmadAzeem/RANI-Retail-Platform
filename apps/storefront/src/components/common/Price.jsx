import { cn } from "../../lib/cn";

function Price({
  price,
  compareAtPrice,
  currency = "PKR",
  className,
  priceClassName,
  comparePriceClassName,
}) {
  const formattedPrice = new Intl.NumberFormat("en-PK", {
    maximumFractionDigits: 0,
  }).format(price);

  const formattedComparePrice =
    compareAtPrice !== null &&
    compareAtPrice !== undefined &&
    compareAtPrice > price
      ? new Intl.NumberFormat("en-PK", {
          maximumFractionDigits: 0,
        }).format(compareAtPrice)
      : null;

  const currencyLabel = currency === "PKR" ? "Rs." : currency;

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-2",
        className
      )}
    >
      <span
        className={cn(
          "text-sm font-semibold tracking-tight text-text",
          priceClassName
        )}
      >
        {currencyLabel} {formattedPrice}
      </span>

      {formattedComparePrice && (
        <span
          className={cn(
            "text-xs text-text-muted line-through",
            comparePriceClassName
          )}
        >
          {currencyLabel} {formattedComparePrice}
        </span>
      )}
    </div>
  );
}

export default Price;