import { cn } from "../../lib/cn";

function formatPrice(value) {
  if (value === null || value === undefined) {
    return "";
  }

  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  }).format(value);
}

function Price({
  price,
  compareAtPrice,
  className,
  priceClassName,
  comparePriceClassName,
  showDiscount = true,
}) {
  const hasDiscount =
    typeof compareAtPrice === "number" &&
    compareAtPrice > price;

  const discountPercentage = hasDiscount
    ? Math.round(
        ((compareAtPrice - price) /
          compareAtPrice) *
          100
      )
    : 0;

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-2",
        className
      )}
    >
      <span
        className={cn(
          "text-sm font-semibold text-text sm:text-base",
          priceClassName
        )}
      >
        {formatPrice(price)}
      </span>

      {hasDiscount && (
        <>
          <span
            className={cn(
              "text-xs text-text-muted line-through sm:text-sm",
              comparePriceClassName
            )}
          >
            {formatPrice(compareAtPrice)}
          </span>

          {showDiscount && (
            <span className="rounded-full bg-primary/10 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-primary">
              {discountPercentage}% Off
            </span>
          )}
        </>
      )}
    </div>
  );
}

export default Price;