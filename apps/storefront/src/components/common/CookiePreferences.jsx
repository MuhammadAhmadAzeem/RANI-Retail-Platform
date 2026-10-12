
import { useEffect, useRef, useState } from "react";
import { ShieldCheck, X } from "lucide-react";
import { Button } from "@rani/ui";

import useCookieStore from "../../store/cookieStore";

function CookiePreferences() {
  const dialogRef = useRef(null);

  const consent = useCookieStore((state) => state.consent);
  const closePreferences = useCookieStore(
    (state) => state.closePreferences
  );
  const savePreferences = useCookieStore(
    (state) => state.savePreferences
  );
  const acceptAll = useCookieStore((state) => state.acceptAll);
  const rejectOptional = useCookieStore(
    (state) => state.rejectOptional
  );

  const [analyticsEnabled, setAnalyticsEnabled] = useState(
    consent?.analytics === true
  );

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) {
      return undefined;
    }

    if (!dialog.open) {
      dialog.showModal();
    }

    return () => {
      if (dialog.open) {
        dialog.close();
      }
    };
  }, []);

  function handleCancel(event) {
    // Closing the dialog must not silently save a new choice.
    event.preventDefault();
    closePreferences();
  }

  function handleSavePreferences() {
    savePreferences({
      analytics: analyticsEnabled,
    });
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="cookie-preferences-title"
      aria-describedby="cookie-preferences-description"
      aria-modal="true"
      onCancel={handleCancel}
      className="m-auto max-h-[88vh] w-[min(92vw,36rem)] overflow-y-auto rounded-2xl border border-border bg-surface p-0 text-text shadow-2xl backdrop:bg-black/50"
    >
      <div className="p-5 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Privacy settings
            </p>

            <h2
              id="cookie-preferences-title"
              className="mt-2 font-heading text-2xl"
            >
              Cookie preferences
            </h2>
          </div>

          <button
            type="button"
            autoFocus
            aria-label="Close cookie preferences"
            onClick={closePreferences}
            className="rounded-full p-2 text-text-muted transition hover:bg-surface-muted hover:text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        <p
          id="cookie-preferences-description"
          className="mt-4 text-sm leading-6 text-text-muted"
        >
          Choose whether optional analytics may be used. Your choice
          is saved on this browser and can be changed later.
        </p>

        <div className="mt-6 space-y-4">
          <section className="rounded-xl border border-border p-4">
            <div className="flex items-start gap-3">
              <ShieldCheck
                size={21}
                className="mt-0.5 shrink-0 text-success"
                aria-hidden="true"
              />

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-semibold text-text">
                    Essential storage
                  </h3>

                  <span className="text-xs font-medium text-success">
                    Always active
                  </span>
                </div>

                <p className="mt-2 text-sm leading-6 text-text-muted">
                  Supports essential storefront preferences and
                  browser-side functionality, including remembering
                  this consent choice.
                </p>

                <label className="mt-3 flex items-center gap-2 text-sm text-text-muted">
                  <input
                    type="checkbox"
                    checked
                    disabled
                    readOnly
                    className="size-4 accent-primary"
                  />
                  Required for the configured functionality
                </label>
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-border p-4">
            <div className="flex items-start gap-3">
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-text">
                  Analytics
                </h3>

                <p className="mt-2 text-sm leading-6 text-text-muted">
                  Allows approved analytics events to be sent through
                  a provider explicitly configured by the application.
                  No external provider is connected currently.
                </p>
              </div>

              <label className="flex shrink-0 items-center gap-2">
                <span className="text-sm text-text-muted">
                  {analyticsEnabled ? "On" : "Off"}
                </span>

                <input
                  type="checkbox"
                  checked={analyticsEnabled}
                  onChange={(event) =>
                    setAnalyticsEnabled(event.target.checked)
                  }
                  aria-label="Enable optional analytics"
                  className="size-4 accent-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                />
              </label>
            </div>
          </section>
        </div>

        <div className="mt-7 flex flex-col-reverse gap-2 sm:flex-row sm:flex-wrap sm:justify-end">
          <Button
            type="button"
            variant="secondary"
            onClick={rejectOptional}
            className="w-full sm:w-auto"
          >
            Reject optional
          </Button>

          <Button
            type="button"
            variant="secondary"
            onClick={handleSavePreferences}
            className="w-full sm:w-auto"
          >
            Save preferences
          </Button>

          <Button
            type="button"
            variant="primary"
            onClick={acceptAll}
            className="w-full sm:w-auto"
          >
            Accept all
          </Button>
        </div>
      </div>
    </dialog>
  );
}

export default CookiePreferences;
