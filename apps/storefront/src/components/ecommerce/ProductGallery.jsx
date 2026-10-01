import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

function ProductGallery({
  images = [],
  productName = "Product",
  badge,
}) {
  const [activeImage, setActiveImage] = useState(0);

  const hasImages = images.length > 0;
  const hasMultipleImages = images.length > 1;

  const currentImage = images[activeImage];

  const showPreviousImage = () => {
    if (!hasMultipleImages) {
      return;
    }

    setActiveImage((current) =>
      current === 0 ? images.length - 1 : current - 1
    );
  };

  const showNextImage = () => {
    if (!hasMultipleImages) {
      return;
    }

    setActiveImage((current) =>
      current === images.length - 1 ? 0 : current + 1
    );
  };

  const handleKeyDown = (event) => {
    if (!hasMultipleImages) {
      return;
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showPreviousImage();
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      showNextImage();
    }
  };

  if (!hasImages) {
    return (
      <div className="overflow-hidden rounded-[1.75rem] border border-border bg-surface shadow-sm">
        <div className="flex aspect-[4/5] items-center justify-center bg-surface-muted px-6 text-center">
          <p className="text-sm text-text-muted">
            Product image unavailable
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-w-0"
      tabIndex={hasMultipleImages ? 0 : undefined}
      onKeyDown={handleKeyDown}
      aria-label={`${productName} image gallery`}
    >
      {/* Main Image */}
      <div className="overflow-hidden rounded-[1.75rem] border border-border bg-surface shadow-sm">
        <div className="relative aspect-[4/5] overflow-hidden bg-surface-muted">
          <img
            src={currentImage}
            alt={`${productName} - view ${activeImage + 1}`}
            width="1000"
            height="1250"
            fetchPriority="high"
            className="h-full w-full object-contain transition-transform duration-500 hover:scale-[1.015]"
          />

          {/* Product Badge */}
          {badge && (
            <span className="absolute left-5 top-5 rounded-full border border-white/20 bg-primary px-4 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-primary-foreground shadow-sm">
              {badge}
            </span>
          )}

          {/* Image Counter */}
          {hasMultipleImages && (
            <div className="absolute bottom-5 right-5 rounded-full border border-white/60 bg-white/85 px-3 py-1.5 text-[10px] font-bold tracking-[0.08em] text-text backdrop-blur-md">
              {activeImage + 1} / {images.length}
            </div>
          )}

          {/* Previous Button */}
          {hasMultipleImages && (
            <button
              type="button"
              onClick={showPreviousImage}
              aria-label="Previous product image"
              className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/90 text-text shadow-sm backdrop-blur-md transition hover:border-primary hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              <ChevronLeft
                size={18}
                aria-hidden="true"
              />
            </button>
          )}

          {/* Next Button */}
          {hasMultipleImages && (
            <button
              type="button"
              onClick={showNextImage}
              aria-label="Next product image"
              className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/90 text-text shadow-sm backdrop-blur-md transition hover:border-primary hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              <ChevronRight
                size={18}
                aria-hidden="true"
              />
            </button>
          )}
        </div>
      </div>

      {/* Thumbnail Gallery */}
      {hasMultipleImages && (
        <div
          className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-5"
          role="list"
          aria-label="Product image thumbnails"
        >
          {images.map((image, index) => {
            const isActive = activeImage === index;

            return (
              <button
                key={`${image}-${index}`}
                type="button"
                onClick={() => setActiveImage(index)}
                aria-label={`View ${productName} image ${index + 1}`}
                aria-current={isActive ? "true" : undefined}
                className={`group overflow-hidden rounded-2xl border bg-surface transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/30 ${
                  isActive
                    ? "border-primary ring-2 ring-primary/10"
                    : "border-border hover:border-primary/40"
                }`}
              >
                <div className="aspect-square overflow-hidden bg-surface-muted">
                  <img
                    src={image}
                    alt={`${productName} thumbnail ${index + 1}`}
                    width="300"
                    height="300"
                    loading="lazy"
                    className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Keyboard Hint */}
      {hasMultipleImages && (
        <p className="mt-3 text-center text-[11px] text-text-muted">
          Use ← and → keys to browse images
        </p>
      )}
    </div>
  );
}

export default ProductGallery;