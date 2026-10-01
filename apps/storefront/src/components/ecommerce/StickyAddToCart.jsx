import { ShoppingBag } from "lucide-react";

import Price from "../common/Price";

function StickyAddToCart({
  productName = "Product",
  price,
  compareAtPrice,
  isSoldOut = false,
  onAddToBag,
}) {
  if (isSoldOut) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface/95 px-3 pb-3 pt-2 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] backdrop-blur-md sm:px-4 sm:pb-4 sm:pt-3 lg:hidden">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center gap-3">
          {/* Product Info */}
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold leading-5 text-text sm:text-sm">
              {productName}
            </p>

            <div className="mt-0.5">
              <Price
                price={price}
                compareAtPrice={compareAtPrice}
                priceClassName="text-xs sm:text-sm"
              />
            </div>
          </div>

          {/* Add To Bag */}
          <button
            type="button"
            onClick={onAddToBag}
            className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold leading-none text-primary-foreground shadow-sm transition-all duration-200 hover:bg-primary-hover hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary/30 sm:min-h-12 sm:min-w-[170px] sm:px-6"
          >
            <ShoppingBag
              size={17}
              aria-hidden="true"
            />

            <span className="whitespace-nowrap">
              Add to bag
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default StickyAddToCart;