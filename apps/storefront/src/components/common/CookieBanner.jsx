
import { Cookie } from "lucide-react";
import { Button } from "@rani/ui";

import useCookieStore from "../../store/cookieStore";
import CookiePreferences from "./CookiePreferences";

function CookieBanner() {
  const consent = useCookieStore((state) => state.consent);
  const isPreferencesOpen = useCookieStore(
    (state) => state.isPreferencesOpen
  );

  const acceptAll = useCookieStore((state) => state.acceptAll);
  const rejectOptional = useCookieStore(
    (state) => state.rejectOptional
  );
  const openPreferences = useCookieStore(
    (state) => state.openPreferences
  );

  return (
    <>
      {consent === null && (
        <aside
          role="region"
          aria-labelledby="cookie-banner-title"
          className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-surface shadow-xl"
        >
          <div className="mx-auto flex max-w-[1440px] flex-col gap-5 px-4 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:px-8">
            <div className="flex items-start gap-3">
              <span className="mt-1 flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Cookie size={21} aria-hidden="true" />
              </span>

              <div className="max-w-2xl">
                <h2
                  id="cookie-banner-title"
                  className="font-heading text-lg text-text"
                >
                  Your privacy, your choice
                </h2>

                <p className="mt-1 text-sm leading-6 text-text-muted">
                  Essential browser storage helps keep your
                  storefront experience working. Optional analytics
                  can be enabled with your permission. No external
                  analytics provider is connected in this development
                  build.
                </p>

                <p className="mt-2 text-xs leading-5 text-text-muted">
                  You can change your preferences at any time using
                  Cookie Preferences in the footer.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 lg:w-[28rem] lg:shrink-0">
              <Button
                type="button"
                variant="primary"
                className="w-full"
                onClick={acceptAll}
              >
                Accept all
              </Button>

              <Button
                type="button"
                variant="secondary"
                className="w-full"
                onClick={rejectOptional}
              >
                Reject optional
              </Button>

              <Button
                type="button"
                variant="ghost"
                className="w-full"
                onClick={openPreferences}
              >
                Customize
              </Button>
            </div>
          </div>
        </aside>
      )}

      {isPreferencesOpen && <CookiePreferences />}
    </>
  );
}

export default CookieBanner;
