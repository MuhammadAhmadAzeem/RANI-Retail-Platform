import ProductCard from "./ProductCard";

function ProductGrid({
  products = [],
  loading = false,
  emptyMessage = "No products found",
  onWishlistToggle,
  wishlistItems = [],
  showQuickAdd = false,
  className = "",
}) {
  if (loading) {
    return (
      <div
        className={`grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 lg:grid-cols-3 xl:grid-cols-4 ${className}`}
      >
        {Array.from({ length: 8 }).map((_, index) => (
          <ProductSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (!products.length) {
    return (
      <div
        className={`flex min-h-80 items-center justify-center rounded-2xl border border-dashed border-border bg-surface px-6 py-16 text-center ${className}`}
      >
        <div className="max-w-md">
          <p className="font-serif text-2xl font-medium text-text">
            {emptyMessage}
          </p>

          <p className="mt-2 text-sm leading-6 text-text-muted">
            Try changing your search or removing some
            filters to see more products
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 sm:gap-y-10 lg:grid-cols-3 xl:grid-cols-4 ${className}`}
    >
      {products.map((product) => {
        const isWishlisted = wishlistItems.includes(
          product.id
        );

        return (
          <ProductCard
            key={product.id}
            product={product}
            isWishlisted={isWishlisted}
            onWishlistToggle={onWishlistToggle}
            showQuickAdd={showQuickAdd}
          />
        );
      })}
    </div>
  );
}

function ProductSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-[3/4] overflow-hidden rounded-2xl bg-surface-muted" />

      <div className="space-y-3 pt-4">
        <div className="h-3 w-20 rounded-full bg-surface-muted" />

        <div className="h-4 w-4/5 rounded-full bg-surface-muted" />

        <div className="h-4 w-24 rounded-full bg-surface-muted" />
      </div>
    </div>
  );
}

export default ProductGrid;