
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const COOKIE_CONSENT_STORAGE_KEY = "rani-storefront-cookie-consent";

const useCookieStore = create(
  persist(
    (set, get) => ({
      // Null means the visitor has not made a consent decision yet.
      consent: null,
      consentUpdatedAt: null,

      // Temporary UI state; this is not persisted.
      isPreferencesOpen: false,

      setConsent: (preferences = {}) => {
        set({
          consent: {
            // Essential storage is always enabled.
            necessary: true,
            analytics: Boolean(preferences?.analytics),
          },
          consentUpdatedAt: new Date().toISOString(),
          isPreferencesOpen: false,
        });
      },

      acceptAll: () => {
        get().setConsent({ analytics: true });
      },

      rejectOptional: () => {
        get().setConsent({ analytics: false });
      },

      savePreferences: (preferences = {}) => {
        get().setConsent(preferences);
      },

      openPreferences: () => {
        set({ isPreferencesOpen: true });
      },

      closePreferences: () => {
        set({ isPreferencesOpen: false });
      },

      // Revoke the saved decision and show the banner again.
      resetConsent: () => {
        set({
          consent: null,
          consentUpdatedAt: null,
          isPreferencesOpen: false,
        });
      },
    }),
    {
      name: COOKIE_CONSENT_STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      version: 1,

      // Never persist transient dialog state.
      partialize: (state) => ({
        consent: state.consent,
        consentUpdatedAt: state.consentUpdatedAt,
      }),
    }
  )
);

export default useCookieStore;
