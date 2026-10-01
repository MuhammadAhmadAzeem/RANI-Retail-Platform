import { Ruler, X } from "lucide-react";

function SizeGuide({
  isOpen = false,
  onClose,
  sizes = [],
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-charcoal/60 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      role="presentation"
      onMouseDown={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="size-guide-title"
        className="flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-[1.5rem] border border-border bg-surface shadow-2xl sm:max-h-[88vh] sm:rounded-[1.5rem]"
        onMouseDown={(event) => event.stopPropagation()}
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-border bg-surface px-5 py-4 sm:px-6 sm:py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Ruler size={18} aria-hidden="true" />
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                Fit support
              </p>

              <h2
                id="size-guide-title"
                className="mt-0.5 font-serif text-2xl font-medium tracking-tight text-text sm:text-3xl"
              >
                Size guide
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close size guide"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-background text-text-muted transition hover:border-primary hover:bg-primary/5 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="min-h-0 overflow-y-auto">
          <div className="px-5 py-6 sm:px-6 sm:py-7">
            {/* Intro */}
            <div className="rounded-2xl border border-border bg-surface-muted p-4 sm:p-5">
              <p className="text-sm leading-6 text-text">
                Find your best fit using the measurements below.
              </p>

              <p className="mt-1.5 text-xs leading-5 text-text-muted">
                For the most accurate result, compare these measurements with
                a similar garment you already own.
              </p>
            </div>

            {sizes.length > 0 ? (
              <div className="mt-6">
                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-text">
                      Available sizes
                    </p>

                    <p className="mt-1 text-xs text-text-muted">
                      Measurements are provided in inches.
                    </p>
                  </div>

                  <span className="hidden rounded-full bg-primary/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-primary sm:inline-flex">
                    {sizes.length} sizes
                  </span>
                </div>

                {/* Responsive Table */}
                <div className="overflow-x-auto rounded-2xl border border-border">
                  <table className="w-full min-w-[420px] border-collapse text-left">
                    <thead>
                      <tr className="bg-surface-muted">
                        <th className="px-4 py-3.5 text-[10px] font-bold uppercase tracking-[0.14em] text-text sm:px-5">
                          Size
                        </th>

                        <th className="px-4 py-3.5 text-[10px] font-bold uppercase tracking-[0.14em] text-text sm:px-5">
                          Chest
                        </th>

                        <th className="px-4 py-3.5 text-[10px] font-bold uppercase tracking-[0.14em] text-text sm:px-5">
                          Length
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {sizes.map((size, index) => (
                        <tr
                          key={size}
                          className={`border-t border-border transition ${
                            index % 2 === 0
                              ? "bg-surface"
                              : "bg-background/70"
                          }`}
                        >
                          <td className="px-4 py-3.5 text-sm font-semibold text-text sm:px-5">
                            {size}
                          </td>

                          <td className="px-4 py-3.5 text-sm text-text-muted sm:px-5">
                            {getMeasurement(size, "chest")}
                          </td>

                          <td className="px-4 py-3.5 text-sm text-text-muted sm:px-5">
                            {getMeasurement(size, "length")}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <p className="mt-3 text-[11px] leading-5 text-text-muted">
                  Swipe horizontally on smaller screens to view the complete
                  table.
                </p>
              </div>
            ) : (
              <div className="mt-6 rounded-2xl border border-border bg-surface-muted p-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Ruler size={16} aria-hidden="true" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-text">
                      One size
                    </p>

                    <p className="mt-1 text-xs leading-5 text-text-muted">
                      This product is available in a single standard size.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Fit Note */}
            <div className="mt-6 rounded-2xl border border-primary/10 bg-primary/[0.035] p-5">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Ruler size={15} aria-hidden="true" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-text">
                    Finding the right fit
                  </p>

                  <p className="mt-1.5 text-xs leading-6 text-text-muted">
                    Measurements can vary slightly depending on the design,
                    fabric, and cut. Review the product description and fit
                    information before choosing your size.
                  </p>
                </div>
              </div>
            </div>

            {/* Footer Action */}
            <div className="mt-6">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-12 w-full items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary-hover hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getMeasurement(size, type) {
  const measurements = {
    XS: {
      chest: "34–36 in",
      length: "27 in",
    },
    S: {
      chest: "36–38 in",
      length: "28 in",
    },
    M: {
      chest: "38–40 in",
      length: "29 in",
    },
    L: {
      chest: "40–42 in",
      length: "30 in",
    },
    XL: {
      chest: "42–44 in",
      length: "31 in",
    },
    XXL: {
      chest: "44–46 in",
      length: "32 in",
    },
  };

  return (
    measurements[size]?.[type] ||
    "See product description"
  );
}

export default SizeGuide;