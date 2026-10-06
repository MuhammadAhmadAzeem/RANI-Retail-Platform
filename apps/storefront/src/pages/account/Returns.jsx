import { CheckCircle2, RotateCcw } from "lucide-react";
import { useState } from "react";

function Returns() {
  const [orderNumber, setOrderNumber] = useState("");
  const [reason, setReason] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!orderNumber.trim() || !reason) {
      return;
    }

    setSubmitted(true);
  };

  return (
    <main className="min-h-[70vh] bg-background">
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-primary">
            Account
          </p>

          <h1 className="mt-3 font-heading text-3xl font-medium text-text sm:text-4xl">
            Returns
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-text-muted">
            Request help with an order return from your customer
            account.
          </p>
        </div>

        {submitted ? (
          <div
            className="mt-8 rounded-2xl border border-success/20 bg-surface p-7 text-center shadow-sm sm:p-10"
            role="status"
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/10 text-success">
              <CheckCircle2 size={30} strokeWidth={1.8} aria-hidden="true" />
            </div>

            <h2 className="mt-6 font-heading text-2xl font-medium text-text">
              Return request submitted
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-text-muted">
              Your return request has been recorded for review.
              Return processing will be connected to the order
              system later.
            </p>

            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setOrderNumber("");
                setReason("");
              }}
              className="mt-7 inline-flex min-h-11 items-center justify-center rounded-full border border-border px-6 py-3 text-sm font-semibold text-text transition-colors hover:border-primary/30 hover:bg-surface-muted hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              Submit Another Request
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-8 rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-7"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-surface-muted text-primary">
                <RotateCcw size={19} aria-hidden="true" />
              </div>

              <div>
                <h2 className="font-heading text-2xl font-medium text-text">
                  Request a Return
                </h2>

                <p className="mt-1 text-sm text-text-muted">
                  Provide the order reference and reason for your
                  request.
                </p>
              </div>
            </div>

            <div className="mt-7">
              <label
                htmlFor="orderNumber"
                className="text-sm font-medium text-text"
              >
                Order number
              </label>

              <input
                id="orderNumber"
                type="text"
                value={orderNumber}
                onChange={(event) =>
                  setOrderNumber(event.target.value)
                }
                placeholder="e.g. ORD-1001"
                required
                className="mt-2 min-h-12 w-full rounded-xl border border-border bg-background px-4 text-sm text-text outline-none transition placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/10"
              />
            </div>

            <div className="mt-5">
              <label
                htmlFor="reason"
                className="text-sm font-medium text-text"
              >
                Return reason
              </label>

              <select
                id="reason"
                value={reason}
                onChange={(event) => setReason(event.target.value)}
                required
                className="mt-2 min-h-12 w-full rounded-xl border border-border bg-background px-4 text-sm text-text outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
              >
                <option value="">Select a reason</option>
                <option value="wrong-size">Wrong size</option>
                <option value="damaged">Item arrived damaged</option>
                <option value="incorrect-item">
                  Incorrect item received
                </option>
                <option value="not-as-expected">
                  Item not as expected
                </option>
                <option value="other">Other</option>
              </select>
            </div>

            <button
              type="submit"
              className="mt-7 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              Submit Return Request
            </button>
          </form>
        )}
      </section>
    </main>
  );
}

export default Returns;