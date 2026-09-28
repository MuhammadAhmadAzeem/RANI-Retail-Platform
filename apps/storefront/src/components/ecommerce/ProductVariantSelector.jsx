import { useState } from "react";
import { cn } from "../../lib/cn";

function ProductVariantSelector({
  sizes = [],
  colors = [],
  selectedSize: controlledSize,
  selectedColor: controlledColor,
  onSizeChange,
  onColorChange,
  showLabels = true,
  className,
}) {
  const [internalSize, setInternalSize] = useState(sizes[0] ?? null);
  const [internalColor, setInternalColor] = useState(colors[0] ?? null);

  const firstSize = sizes[0] ?? null;
  const firstColor = colors[0] ?? null;

  const internalSizeIsValid =
    internalSize && sizes.includes(internalSize);

  const internalColorIsValid =
    internalColor &&
    colors.some((color) => color?.name === internalColor?.name);

  const selectedSize =
    controlledSize !== undefined
      ? controlledSize
      : internalSizeIsValid
        ? internalSize
        : firstSize;

  const selectedColor =
    controlledColor !== undefined
      ? controlledColor
      : internalColorIsValid
        ? internalColor
        : firstColor;

  const handleSizeChange = (size) => {
    if (controlledSize === undefined) {
      setInternalSize(size);
    }

    onSizeChange?.(size);
  };

  const handleColorChange = (color) => {
    if (controlledColor === undefined) {
      setInternalColor(color);
    }

    onColorChange?.(color);
  };

  return (
    <div className={cn("space-y-7", className)}>
      {/* Size */}
      {sizes.length > 0 && (
        <div>
          {showLabels && (
            <div>
              <p className="text-sm font-semibold text-text">
                Size
              </p>

              <p className="mt-1 text-xs text-text-muted">
                {selectedSize
                  ? `Selected: ${selectedSize}`
                  : "Select a size"}
              </p>
            </div>
          )}

          <div
            className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-5"
            role="radiogroup"
            aria-label="Product sizes"
          >
            {sizes.map((size) => {
              const isSelected = selectedSize === size;

              return (
                <button
                  key={size}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => handleSizeChange(size)}
                  className={cn(
                    "flex h-11 items-center justify-center rounded-full border text-sm font-medium transition-all duration-200",
                    isSelected
                      ? "border-primary bg-primary text-primary-foreground shadow-sm"
                      : "border-border bg-surface text-text hover:border-primary hover:text-primary"
                  )}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Color */}
      {colors.length > 0 && (
        <div>
          <div>
            <p className="text-sm font-semibold text-text">
              Color
            </p>

            <p className="mt-1 text-xs text-text-muted">
              {selectedColor?.name
                ? `Selected: ${selectedColor.name}`
                : "Select a color"}
            </p>
          </div>

          <div
            className="mt-4 flex flex-wrap gap-3"
            role="radiogroup"
            aria-label="Product colors"
          >
            {colors.map((color) => {
              const isSelected =
                selectedColor?.name === color?.name;

              return (
                <button
                  key={color.name}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  aria-label={`Select ${color.name}`}
                  onClick={() => handleColorChange(color)}
                  className={cn(
                    "group flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-medium transition-all duration-200",
                    isSelected
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-border bg-surface text-text-muted hover:border-primary/40 hover:text-primary"
                  )}
                >
                  <span
                    aria-hidden="true"
                    className="h-5 w-5 rounded-full border border-black/10 shadow-sm"
                    style={{
                      backgroundColor: color.value,
                    }}
                  />

                  <span>{color.name}</span>
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