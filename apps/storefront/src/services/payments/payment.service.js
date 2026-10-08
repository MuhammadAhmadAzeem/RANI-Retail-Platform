const PAYMENT_STATUS = {
  IDLE: "idle",
  PENDING: "pending",
  SUCCESS: "success",
  FAILED: "failed",
};

const PAYMENT_METHOD_STATUS = {
  AVAILABLE: "available",
  UNAVAILABLE: "unavailable",
};

const paymentService = {
  /**
   * Returns the payment provider configured for the storefront.
   * A real provider can be supplied later through environment config.
   */
  getProvider() {
    return (
      import.meta.env.VITE_PAYMENT_PROVIDER ||
      "unconfigured"
    );
  },

  /**
   * Returns the current payment service status.
   * Kept provider-neutral for the frontend checkout foundation.
   */
  getStatus() {
    return {
      status: PAYMENT_STATUS.IDLE,
      provider: this.getProvider(),
    };
  },

  /**
   * Payment methods contract.
   * Real payment methods will be supplied by the payment
   * provider/backend in a later implementation phase.
   */
  async getPaymentMethods() {
    return [];
  },

  /**
   * Creates a payment session abstraction.
   * Real provider implementation will be connected later.
   */
  async createPaymentSession(payload = {}) {
    return {
      status: PAYMENT_STATUS.PENDING,
      provider: this.getProvider(),
      payload,
      session: null,
    };
  },

  /**
   * Confirms a payment through the future payment provider.
   */
  async confirmPayment(payload = {}) {
    return {
      status: PAYMENT_STATUS.PENDING,
      provider: this.getProvider(),
      payload,
      transaction: null,
    };
  },

  /**
   * Checks whether a payment method can currently be used.
   */
  getPaymentMethodStatus(method) {
    if (!method) {
      return PAYMENT_METHOD_STATUS.UNAVAILABLE;
    }

    return PAYMENT_METHOD_STATUS.UNAVAILABLE;
  },
};

export {
  PAYMENT_METHOD_STATUS,
  PAYMENT_STATUS,
};

export default paymentService;