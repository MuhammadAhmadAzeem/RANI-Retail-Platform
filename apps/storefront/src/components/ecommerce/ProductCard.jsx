import {
  Heart,
  ShoppingBag,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

import Price from "../common/Price";
import { cn } from "../../lib/cn";

function ProductCard({
  product,
  onWishlistToggle,
  isWishlisted = false,
  showQuickAdd = true,
  className,
}) {
  const [imageLoaded, setImageLoaded] = useState(false);

  if (!product) {
    return null;
  }

  const {
    name,
    slug,
    category,
    price,
    compareAtPrice,
    currency,
    images = [],
    badge,
    availability,
  } = product;

  const image = images[0];

  const isLowStock = availability === "low-stock";
  const isOutOfStock = availability === "out-of-stock";

  const productUrl = `/product/${slug}`;

  const handleWishlistClick = (event) => {
    event.preventDefault();
    event.stopPropagation();

    onWishlistToggle?.(product);
  };

  const handleQuickAddClick = (event) => {
    event.preventDefault();
    event.stopPropagation();

    // Cart functionality will be connected in the cart milestone
  };

  return (
    <article
      className={cn(
        "group min-w-0",
        className
      )}
    >
      <div className="relative">
        <Link
          to={productUrl}
          aria-label={`View ${name}`}
          className="block"
        >
          <div className="relative aspect-[3/4] overflow-hidden bg-surface-muted">
            {!imageLoaded && (
              <div className="absolute inset-0 animate-pulse-soft bg-surface-muted" />
            )}

            {image ? (
              <img
                src={image}
                alt={name}
                width="900"
                height="1200"
                loading="lazy"
                decoding="async"
                onLoad={() => setImageLoaded(true)}
                className={cn(
                  "h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.025]",
                  imageLoaded
                    ? "opacity-100"
                    : "opacity-0"
                )}
              />
            ) : (
              <div className="flex h-full items-center justify-center px-5 text-center">
                <span className="text-xs uppercase tracking-[0.16em] text-text-muted">
                  Image unavailable
                </span>
              </div>
            )}

            <div className="absolute left-3 top-3 flex flex-wrap gap-2">
              {badge && (
                <span className="bg-primary px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-primary-foreground">
                  {badge}
                </span>
              )}

              {isLowStock && !badge && (
                <span className="bg-warning px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white">
                  Low Stock
                </span>
              )}

              {isOutOfStock && (
                <span className="bg-charcoal px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white">
                  Sold Out
                </span>
              )}
            </div>

            <div className="absolute right-3 top-3">
              <button
                type="button"
                onClick={handleWishlistClick}
                aria-label={
                  isWishlisted
                    ? `Remove ${name} from wishlist`
                    : `Add ${name} to wishlist`
                }
                aria-pressed={isWishlisted}
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full border backdrop-blur-md transition-all duration-200",
                  isWishlisted
                    ? "border-primary bg-primary text-white"
                    : "border-white/60 bg-white/85 text-text hover:border-primary hover:text-primary"
                )}
              >
                <Heart
                  size={17}
                  fill={isWishlisted ? "currentColor" : "none"}
                />
              </button>
            </div>

            {showQuickAdd && !isOutOfStock && (
              <div className="absolute inset-x-3 bottom-3 hidden translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 md:block">
                <button
                  type="button"
                  onClick={handleQuickAddClick}
                  className="flex h-11 w-full items-center justify-center gap-2 rounded-full bg-white px-4 text-sm font-semibold text-charcoal shadow-lg transition hover:bg-primary hover:text-white"
                >
                  <ShoppingBag size={16} />
                  Quick add
                </button>
              </div>
            )}
          </div>
        </Link>

        {isOutOfStock && (
          <div className="pointer-events-none absolute inset-0 bg-white/15" />
        )}
      </div>

      <Link
        to={productUrl}
        className="mt-4 block"
      >
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-text-muted">
          {category}
        </p>

        <h3 className="mt-1.5 line-clamp-2 text-sm font-medium leading-6 text-text transition-colors duration-200 group-hover:text-primary sm:text-base">
          {name}
        </h3>

        <Price
          price={price}
          compareAtPrice={compareAtPrice}
          currency={currency}
          className="mt-2"
          priceClassName="text-sm sm:text-base"
        />
      </Link>
    </article>
  );
}

export default ProductCard;