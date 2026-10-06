import {
  AlertCircle,
  Check,
  CheckCircle2,
  ChevronDown,
  ClipboardList,
  RotateCcw,
  Send,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const RETURN_REASONS = [
  {
    value: "wrong-size",
    label: "Wrong size",
    description: "The selected size does not fit.",
  },
  {
    value: "damaged",
    label: "Item arrived damaged",
    description: "The item was damaged when received.",
  },
  {
    value: "incorrect-item",
    label: "Incorrect item received",
    description: "The received item does not match your order.",
  },
  {
    value: "not-as-expected",
    label: "Item not as expected",
    description: "The item is different from what you expected.",
  },
  {
    value: "other",
    label: "Other",
    description: "Another reason not listed above.",
  },
];

function Returns() {
  const [orderNumber, setOrderNumber] = useState("");
  const [reason, setReason] = useState("");
  const [reasonOpen, setReasonOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [notice, setNotice] = useState("");

  const reasonRef = useRef(null);

  const selectedReason = RETURN_REASONS.find(
    (item) => item.value === reason
  );

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (
        reasonRef.current &&
        !reasonRef.current.contains(event.target)
      ) {
        setReasonOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setReasonOpen(false);
      }
    };

    document.addEventListener(
      "pointerdown",
      handlePointerDown
    );
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener(
        "pointerdown",
        handlePointerDown
      );
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, []);

  const openReasonDropdown = () => {
    const selectedIndex = RETURN_REASONS.findIndex(
      (item) => item.value === reason
    );

    setHighlightedIndex(
      selectedIndex >= 0 ? selectedIndex : 0
    );
    setReasonOpen(true);
  };

  const selectReason = (value) => {
    setReason(value);
    setNotice("");
    setReasonOpen(false);
  };

  const handleReasonKeyDown = (event) => {
    if (!reasonOpen) {
      if (
        event.key === "Enter" ||
        event.key === " " ||
        event.key === "ArrowDown"
      ) {
        event.preventDefault();
        openReasonDropdown();
      }

      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();

      setHighlightedIndex((current) =>
        current === RETURN_REASONS.length - 1
          ? 0
          : current + 1
      );

      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();

      setHighlightedIndex((current) =>
        current === 0
          ? RETURN_REASONS.length - 1
          : current - 1
      );

      return;
    }

    if (event.key === "Home") {
      event.preventDefault();
      setHighlightedIndex(0);
      return;
    }

    if (event.key === "End") {
      event.preventDefault();
      setHighlightedIndex(RETURN_REASONS.length - 1);
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();

      const highlightedReason =
        RETURN_REASONS[highlightedIndex];

      if (highlightedReason) {
        selectReason(highlightedReason.value);
      }

      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      setReasonOpen(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedOrderNumber = orderNumber.trim();

    if (!trimmedOrderNumber || !reason) {
      setNotice(
        "Please enter your order number and select a return reason."
      );
      return;
    }

    setNotice("");
    setReasonOpen(false);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setOrderNumber("");
    setReason("");
    setReasonOpen(false);
    setHighlightedIndex(0);
    setNotice("");
  };

  return (
    <main className="min-h-[70vh] bg-background">
      <div className="mx-auto max-w-[1180px] px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        {/* Header */}
        <header className="border-b border-border pb-7 sm:pb-9">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0">
              <div className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-primary">
                <RotateCcw
                  size={13}
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
                After-sales support
              </div>

              <h1 className="mt-3 font-heading text-3xl font-medium tracking-tight text-text sm:text-4xl lg:text-5xl">
                Returns
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-text-muted sm:text-base">
                Request help with an order return from your
                customer account.
              </p>
            </div>

            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-text-muted">
              <ClipboardList
                size={13}
                aria-hidden="true"
              />
              Return request
            </div>
          </div>
        </header>

        {/* Notice */}
        {notice && !submitted && (
          <div
            className="mt-5 flex items-start justify-between gap-4 rounded-xl border border-warning/20 bg-warning/[0.05] px-4 py-3.5 text-sm text-text"
            role="alert"
          >
            <div className="flex items-start gap-2.5">
              <AlertCircle
                size={16}
                className="mt-0.5 shrink-0 text-warning"
                aria-hidden="true"
              />

              <span>{notice}</span>
            </div>

            <button
              type="button"
              onClick={() => setNotice("")}
              aria-label="Dismiss message"
              className="shrink-0 rounded-full p-1 text-text-muted transition-colors hover:bg-surface-muted hover:text-text focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <X
                size={15}
                aria-hidden="true"
              />
            </button>
          </div>
        )}

        {submitted ? (
          /* Success State */
          <section
            className="mt-7 overflow-hidden rounded-2xl border border-success/20 bg-surface shadow-sm"
            role="status"
          >
            <div className="border-b border-border bg-success/[0.035] px-5 py-8 sm:px-8 sm:py-10">
              <div className="mx-auto max-w-2xl text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-success/15 bg-success/[0.08] text-success">
                  <CheckCircle2
                    size={36}
                    strokeWidth={1.6}
                    aria-hidden="true"
                  />
                </div>

                <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.22em] text-success">
                  Request received
                </p>

                <h2 className="mt-3 font-heading text-2xl font-medium tracking-tight text-text sm:text-3xl">
                  Return request submitted
                </h2>

                <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-text-muted">
                  Your return request has been recorded for
                  review. Return processing will be connected
                  to the order system later.
                </p>
              </div>
            </div>

            <div className="grid gap-4 px-5 py-6 sm:grid-cols-2 sm:px-8">
              <div className="rounded-xl border border-border bg-background p-4 transition-colors hover:border-primary/15">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-text-muted">
                  Order number
                </p>

                <p className="mt-2 break-all text-sm font-semibold text-text">
                  {orderNumber.trim()}
                </p>
              </div>

              <div className="rounded-xl border border-border bg-background p-4 transition-colors hover:border-primary/15">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-text-muted">
                  Return reason
                </p>

                <p className="mt-2 text-sm font-semibold text-text">
                  {selectedReason?.label}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 border-t border-border px-5 py-5 sm:flex-row sm:justify-end sm:px-8">
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-border bg-surface px-5 py-3 text-sm font-semibold text-text transition-colors hover:border-primary/25 hover:bg-surface-muted hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <RotateCcw
                  size={15}
                  aria-hidden="true"
                />
                Submit Another Request
              </button>
            </div>
          </section>
        ) : (
          /* Return Form */
          <section className="mt-7">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="overflow-visible rounded-2xl border border-border bg-surface shadow-sm"
            >
              {/* Form Header */}
              <div className="border-b border-border px-5 py-6 sm:px-7 sm:py-7">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/[0.06] text-primary">
                    <RotateCcw
                      size={20}
                      strokeWidth={1.8}
                      aria-hidden="true"
                    />
                  </div>

                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
                      Return request
                    </p>

                    <h2 className="mt-1.5 font-heading text-2xl font-medium tracking-tight text-text sm:text-3xl">
                      Request a Return
                    </h2>

                    <p className="mt-2 max-w-xl text-sm leading-6 text-text-muted">
                      Provide the order reference and choose
                      the reason that best describes your
                      request.
                    </p>
                  </div>
                </div>
              </div>

              {/* Form Content */}
              <div className="px-5 py-6 sm:px-7 sm:py-7">
                <div className="grid gap-6 sm:grid-cols-2">
                  {/* Order Number */}
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="orderNumber"
                      className="text-sm font-semibold text-text"
                    >
                      Order number
                    </label>

                    <p className="mt-1 text-xs leading-5 text-text-muted">
                      Enter the order reference associated with
                      the item.
                    </p>

                    <div className="relative mt-3">
                      <ClipboardList
                        size={16}
                        aria-hidden="true"
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"
                      />

                      <input
                        id="orderNumber"
                        name="orderNumber"
                        type="text"
                        value={orderNumber}
                        onChange={(event) => {
                          setOrderNumber(event.target.value);
                          setNotice("");
                        }}
                        autoComplete="off"
                        spellCheck="false"
                        placeholder="e.g. ORD-1001"
                        className="min-h-12 w-full rounded-xl border border-border bg-background pl-11 pr-4 text-sm text-text outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 placeholder:text-text-muted"
                      />
                    </div>
                  </div>

                  {/* Modern Dropdown */}
                  <div
                    ref={reasonRef}
                    className="relative sm:col-span-2"
                  >
                    <label
                      id="reason-label"
                      className="text-sm font-semibold text-text"
                    >
                      Return reason
                    </label>

                    <p className="mt-1 text-xs leading-5 text-text-muted">
                      Select the reason that best matches your
                      request.
                    </p>

                    <button
                      type="button"
                      id="reason"
                      role="combobox"
                      aria-haspopup="listbox"
                      aria-expanded={reasonOpen}
                      aria-controls="return-reasons"
                      aria-labelledby="reason-label"
                      onClick={() => {
                        if (reasonOpen) {
                          setReasonOpen(false);
                        } else {
                          openReasonDropdown();
                        }
                      }}
                      onKeyDown={handleReasonKeyDown}
                      className={[
                        "mt-3 flex min-h-14 w-full items-center justify-between gap-4 rounded-xl border bg-background px-4 text-left outline-none transition-all",
                        reasonOpen
                          ? "border-primary ring-2 ring-primary/10"
                          : "border-border hover:border-primary/25",
                      ].join(" ")}
                    >
                      <span
                        className={
                          selectedReason
                            ? "text-sm font-medium text-text"
                            : "text-sm text-text-muted"
                        }
                      >
                        {selectedReason?.label ||
                          "Select a reason"}
                      </span>

                      <ChevronDown
                        size={17}
                        className={[
                          "shrink-0 text-text-muted transition-transform duration-200",
                          reasonOpen
                            ? "rotate-180 text-primary"
                            : "",
                        ].join(" ")}
                        aria-hidden="true"
                      />
                    </button>

                    {reasonOpen && (
                      <div
                        id="return-reasons"
                        role="listbox"
                        aria-labelledby="reason-label"
                        className="absolute left-0 right-0 z-30 mt-2 overflow-hidden rounded-2xl border border-border bg-surface p-2 shadow-lg shadow-black/[0.06]"
                      >
                        {RETURN_REASONS.map(
                          (item, index) => {
                            const isSelected =
                              reason === item.value;

                            const isHighlighted =
                              highlightedIndex ===
                              index;

                            return (
                              <button
                                key={item.value}
                                type="button"
                                role="option"
                                aria-selected={
                                  isSelected
                                }
                                onMouseEnter={() =>
                                  setHighlightedIndex(
                                    index
                                  )
                                }
                                onClick={() =>
                                  selectReason(
                                    item.value
                                  )
                                }
                                className={[
                                  "flex w-full items-start gap-3 rounded-xl px-3.5 py-3 text-left transition-colors",
                                  isHighlighted
                                    ? "bg-primary/[0.045]"
                                    : "hover:bg-surface-muted",
                                ].join(" ")}
                              >
                                <div
                                  className={[
                                    "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full",
                                    isSelected
                                      ? "bg-primary text-primary-foreground"
                                      : "bg-surface-muted text-text-muted",
                                  ].join(" ")}
                                >
                                  {isSelected ? (
                                    <Check
                                      size={14}
                                      strokeWidth={2}
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                                  )}
                                </div>

                                <div className="min-w-0 flex-1">
                                  <span
                                    className={[
                                      "block text-sm font-semibold",
                                      isSelected
                                        ? "text-primary"
                                        : "text-text",
                                    ].join(" ")}
                                  >
                                    {item.label}
                                  </span>

                                  <span className="mt-0.5 block text-xs leading-5 text-text-muted">
                                    {item.description}
                                  </span>
                                </div>
                              </button>
                            );
                          }
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Request Summary */}
                <div className="mt-7 rounded-xl border border-border bg-background p-4 sm:p-5">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-muted text-primary">
                      <Check
                        size={15}
                        aria-hidden="true"
                      />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-text">
                        Before submitting
                      </p>

                      <p className="mt-1 text-xs leading-5 text-text-muted">
                        Make sure your order number and selected
                        return reason are correct before sending
                        the request.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-3 rounded-b-2xl border-t border-border bg-surface-muted/[0.35] px-5 py-5 sm:flex-row sm:justify-end sm:px-7">
                <button
                  type="submit"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <Send
                    size={15}
                    aria-hidden="true"
                  />
                  Submit Return Request
                </button>
              </div>
            </form>
          </section>
        )}
      </div>
    </main>
  );
}

export default Returns;