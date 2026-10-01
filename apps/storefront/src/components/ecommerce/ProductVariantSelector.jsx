import { Check } from "lucide-react";

function ProductVariantSelector({
  sizes = [],
  colors = [],
  selectedSize = "",
  selectedColor = "",
  onSizeChange,
  onColorChange,
  onSizeGuide,
}) {
  return (
    <div className="space-y-7">
      {/* Color */}
      {colors.length > 0 && (
        <div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-text">
                Color
              </p>

              <p className="mt-1 text-xs text-text-muted">
                Choose your preferred shade
              </p>
            </div>

            <span className="rounded-full bg-surface-muted px-3 py-1.5 text-xs font-medium text-text">
              {selectedColor || "Select a color"}
            </span>
          </div>

          <div className="mt-4 flex flex-wrap gap-2.5">
            {colors.map((color) => {
              const isSelected =
                selectedColor === color.name;

              return (
                <button
                  key={color.name}
                  type="button"
                  onClick={() => onColorChange?.(color.name)}
                  aria-label={`Select ${color.name}`}
                  aria-pressed={isSelected}
                  className={`flex h-11 items-center gap-2.5 rounded-full border px-4 text-xs font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/30 ${
                    isSelected
                      ? "border-primary bg-primary/5 text-primary shadow-sm"
                      : "border-border bg-background text-text hover:border-primary/40 hover:bg-surface-muted"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className="h-5 w-5 rounded-full border border-black/10 shadow-inner"
                    style={{
                      backgroundColor: color.value,
                    }}
                  />

                  <span>{color.name}</span>

                  {isSelected && (
                    <Check
                      size={13}
                      aria-hidden="true"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Size */}
      {sizes.length > 0 && (
        <div>
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-text">
                Select size
              </p>

              <p className="mt-1 text-xs text-text-muted">
                Select the size that fits you best
              </p>
            </div>

            {onSizeGuide && (
              <button
                type="button"
                onClick={onSizeGuide}
                className="rounded-full px-2 py-1 text-xs font-semibold text-primary transition hover:bg-primary/5 hover:text-primary-hover focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                Size guide
              </button>
            )}
          </div>

          <div className="mt-4 grid grid-cols-4 gap-2.5 sm:grid-cols-5">
            {sizes.map((size) => {
              const isSelected = selectedSize === size;

              return (
                <button
                  key={size}
                  type="button"
                  onClick={() => onSizeChange?.(size)}
                  aria-label={`Select size ${size}`}
                  aria-pressed={isSelected}
                  className={`h-12 rounded-xl border text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/30 ${
                    isSelected
                      ? "border-primary bg-primary text-primary-foreground shadow-sm"
                      : "border-border bg-background text-text hover:border-primary hover:bg-primary/5 hover:text-primary"
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductVariantSelector;