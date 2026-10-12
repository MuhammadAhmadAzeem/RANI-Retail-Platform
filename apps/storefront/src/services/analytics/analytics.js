
import useCookieStore from "../../store/cookieStore";

// No analytics provider is connected by default.
let analyticsProvider = null;

const EVENT_NAME_PATTERN = /^[a-z][a-z0-9_]{0,79}$/i;

const SENSITIVE_PROPERTY_PATTERN =
  /(email|phone|mobile|address|password|token|authorization|card|customer.?name|user.?name|customer.?id|user.?id|session.?id)/i;

export function hasAnalyticsConsent() {
  return useCookieStore.getState().consent?.analytics === true;
}

function sanitizeEventProperties(properties = {}) {
  if (
    !properties ||
    typeof properties !== "object" ||
    Array.isArray(properties)
  ) {
    return {};
  }

  return Object.entries(properties).reduce(
    (safeProperties, [key, value]) => {
      // Reject suspicious or invalid property names.
      if (
        !/^[a-zA-Z][a-zA-Z0-9_]{0,39}$/.test(key) ||
        SENSITIVE_PROPERTY_PATTERN.test(key)
      ) {
        return safeProperties;
      }

      if (
        typeof value === "string" &&
        value.trim().length > 0 &&
        value.length <= 100
      ) {
        safeProperties[key] = value.trim();
      } else if (
        typeof value === "number" &&
        Number.isFinite(value)
      ) {
        safeProperties[key] = value;
      } else if (typeof value === "boolean") {
        safeProperties[key] = value;
      }

      return safeProperties;
    },
    {}
  );
}

/**
 * Register a future provider adapter.
 *
 * A provider can only be registered after analytics consent.
 * Registration does not load a third-party script.
 *
 * The provider must expose:
 * {
 *   trackEvent(eventName, properties) {}
 * }
 *
 * Pass null to disconnect the current adapter.
 */
export function configureAnalyticsProvider(provider) {
  if (provider === null) {
    analyticsProvider = null;
    return true;
  }

  if (!hasAnalyticsConsent()) {
    return false;
  }

  if (
    !provider ||
    typeof provider.trackEvent !== "function"
  ) {
    return false;
  }

  analyticsProvider = provider;
  return true;
}

/**
 * Send a sanitized event only when consent and a provider exist.
 * Events must not contain personal or sensitive customer data.
 */
export function trackEvent(eventName, properties = {}) {
  if (!hasAnalyticsConsent() || !analyticsProvider) {
    return false;
  }

  const normalizedEventName =
    typeof eventName === "string" ? eventName.trim() : "";

  if (!EVENT_NAME_PATTERN.test(normalizedEventName)) {
    return false;
  }

  try {
    const result = analyticsProvider.trackEvent(
      normalizedEventName,
      sanitizeEventProperties(properties)
    );

    return result !== false;
  } catch {
    // Analytics errors must never break the storefront.
    return false;
  }
}

/**
 * Track a path without query parameters or URL fragments.
 * This function does not automatically run page tracking.
 */
export function trackPageView(pathname) {
  const currentPath =
    pathname ??
    (typeof window !== "undefined"
      ? window.location.pathname
      : "");

  if (typeof currentPath !== "string") {
    return false;
  }

  const path = currentPath.split(/[?#]/, 1)[0];

  if (!path.startsWith("/") || path.startsWith("//")) {
    return false;
  }

  return trackEvent("page_view", { path });
}
