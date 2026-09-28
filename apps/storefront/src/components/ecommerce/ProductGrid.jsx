import ProductCard from "./ProductCard";

function ProductGrid({
  products = [],
  loading = false,
  emptyMessage = "No products found",
  onWishlistToggle,
  wishlistItems = [],
  showQuickAdd = true,
  className = "",
}) {
  if (loading) {
    return (
      <div
        className={`grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${className}`}
      >
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="min-w-0">
            <div className="aspect-[3/4] animate-pulse bg-surface-muted" />

            <div className="mt-4 h-3 w-20 animate-pulse bg-surface-muted" />

            <div className="mt-2 h-5 w-3/4 animate-pulse bg-surface-muted" />

            <div className="mt-3 h-4 w-24 animate-pulse bg-surface-muted" />
          </div>
        ))}
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="flex min-h-[320px] items-center justify-center border border-border bg-surface px-6 text-center">
        <div className="max-w-md">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Collection
          </p>

          <h2 className="mt-3 font-heading text-3xl font-medium text-text sm:text-4xl">
            {emptyMessage}
          </h2>

          <p className="mt-4 text-sm leading-7 text-text-muted">
            Try another category, collection or search term
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-5 sm:gap-y-12 lg:grid-cols-3 xl:grid-cols-4 ${className}`}
    >
      {products.map((product) => {
        const isWishlisted = wishlistItems.some(
          (item) =>
            item?.id === product.id ||
            item?.slug === product.slug
        );

        return (
          <ProductCard
            key={product.id}
            product={product}
            onWishlistToggle={onWishlistToggle}
            isWishlisted={isWishlisted}
            showQuickAdd={showQuickAdd}
          />
        );
      })}
    </div>
  );
}

export default ProductGrid;