import {
  Heart,
  Plus,
} from "lucide-react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import Price from "../common/Price";
import useCartStore from "../../store/cartStore";

function getProductImage(product) {
  if (Array.isArray(product.images)) {
    const firstImage = product.images[0];

    if (typeof firstImage === "string") {
      return firstImage;
    }

    if (firstImage?.url) {
      return firstImage.url;
    }

    if (firstImage?.src) {
      return firstImage.src;
    }
  }

  return product.image || product.imageUrl || "";
}

function getProductCategory(product) {
  if (typeof product.category === "string") {
    return product.category;
  }

  return (
    product.category?.name ||
    product.category?.title ||
    ""
  );
}

function getStockState(product) {
  if (
    product.stock === 0 ||
    product.stockStatus === "out-of-stock" ||
    product.available === false
  ) {
    return "sold-out";
  }

  if (
    product.stockStatus === "low-stock" ||
    (typeof product.stock === "number" &&
      product.stock > 0 &&
      product.stock <= 5)
  ) {
    return "low-stock";
  }

  return "available";
}

function ProductCard({
  product,
  isWishlisted = false,
  onWishlistToggle,
  showQuickAdd = false,
}) {
  const navigate = useNavigate();

  const addToCart = useCartStore(
    (state) => state.addToCart
  );

  const openCartDrawer = useCartStore(
    (state) => state.openCartDrawer
  );

  const image = getProductImage(product);
  const category = getProductCategory(product);
  const stockState = getStockState(product);

  const hasComparePrice =
    typeof product.compareAtPrice === "number" &&
    product.compareAtPrice > product.price;

  const badge =
    product.badge ||
    product.label ||
    (product.isNew ? "New In" : null);

  const isSoldOut = stockState === "sold-out";
  const isLowStock = stockState === "low-stock";

  const hasSizes =
    Array.isArray(product.sizes) &&
    product.sizes.length > 0;

  const hasColors =
    Array.isArray(product.colors) &&
    product.colors.length > 0;

  const requiresOptions = hasSizes || hasColors;

  const handleWishlistClick = (event) => {
    event.preventDefault();
    event.stopPropagation();

    onWishlistToggle?.(product);
  };

  const handleQuickAdd = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (isSoldOut) {
      return;
    }

    // Products with variants need selection on the product page.
    if (requiresOptions) {
      navigate(`/product/${product.slug}`);
      return;
    }

    // Add products without variants directly to the cart.
    addToCart(product, 1);

    // Open the shared drawer when its store action is available.
    openCartDrawer?.();
  };

  return (
    <article className="group min-w-0">
      <div className="relative overflow-hidden rounded-2xl bg-surface-muted">
        <Link
          to={`/product/${product.slug}`}
          aria-label={`View ${product.name}`}
          className="block"
        >
          <div className="aspect-[3/4] overflow-hidden">
            {image ? (
              <img
                src={image}
                alt={product.imageAlt || product.name}
                loading="lazy"
                width="600"
                height="800"
                className={`h-full w-full object-cover transition duration-500 ease-out group-hover:scale-[1.03] ${
                  isSoldOut
                    ? "opacity-55 grayscale-[0.2]"
                    : ""
                }`}
              />
            ) : (
              <div
                className="flex h-full w-full items-center justify-center bg-surface-muted text-xs text-text-muted"
                aria-label={product.name}
              >
                Image unavailable
              </div>
            )}
          </div>
        </Link>

        <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between p-3">
          <div className="flex flex-col gap-2">
            {badge && (
              <span className="rounded-full bg-primary px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-primary-foreground shadow-sm">
                {badge}
              </span>
            )}

            {isLowStock && !isSoldOut && (
              <span className="w-fit rounded-full bg-surface px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-warning shadow-sm">
                Low Stock
              </span>
            )}

            {isSoldOut && (
              <span className="w-fit rounded-full bg-text px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-primary-foreground shadow-sm">
                Sold Out
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={handleWishlistClick}
            aria-label={
              isWishlisted
                ? `Remove ${product.name} from wishlist`
                : `Add ${product.name} to wishlist`
            }
            aria-pressed={isWishlisted}
            className={`pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border backdrop-blur-md transition-all duration-200 ${
              isWishlisted
                ? "border-primary bg-primary text-primary-foreground"
                : "border-white/70 bg-white/90 text-text hover:border-primary hover:text-primary"
            }`}
          >
            <Heart
              size={17}
              strokeWidth={isWishlisted ? 2.5 : 1.9}
              fill={
                isWishlisted
                  ? "currentColor"
                  : "none"
              }
            />
          </button>
        </div>

        {showQuickAdd && !isSoldOut && (
          <div className="pointer-events-none absolute inset-x-3 bottom-3 opacity-0 transition duration-300 group-hover:pointer-events-auto group-hover:opacity-100 max-sm:hidden">
            <button
              type="button"
              onClick={handleQuickAdd}
              className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-full bg-surface/95 px-4 text-xs font-bold uppercase tracking-[0.08em] text-text shadow-lg backdrop-blur-md transition hover:bg-primary hover:text-primary-foreground"
            >
              <Plus size={15} />
              {requiresOptions ? "Choose options" : "Quick Add"}
            </button>
          </div>
        )}
      </div>

      <div className="pt-4">
        {category && (
          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-text-muted">
            {category}
          </p>
        )}

        <Link
          to={`/product/${product.slug}`}
          className="mt-1 block"
        >
          <h2 className="line-clamp-2 text-sm font-semibold leading-5 text-text transition-colors group-hover:text-primary sm:text-[15px]">
            {product.name}
          </h2>
        </Link>

        <div className="mt-2">
          <Price
            price={product.price}
            compareAtPrice={
              hasComparePrice
                ? product.compareAtPrice
                : undefined
            }
          />
        </div>

        {isLowStock && !isSoldOut && (
          <p className="mt-1.5 text-[11px] font-medium text-warning">
            Only {product.stock} left
          </p>
        )}
      </div>
    </article>
  );
}

export default ProductCard;