const PAYMENT_STATUS = {
  IDLE: "idle",
  LOADING: "loading",
  READY: "ready",
  PENDING: "pending",
  SUCCESS: "success",
  FAILED: "failed",
};

const PAYMENT_METHOD_STATUS = {
  AVAILABLE: "available",
  PLACEHOLDER: "placeholder",
  UNAVAILABLE: "unavailable",
};

const PAYMENT_METHODS = [
  {
    value: "cod",
    label: "Cash on Delivery",
    description: "Pay when your order arrives.",
    status: PAYMENT_METHOD_STATUS.AVAILABLE,
    placeholderText: "No online payment is required.",
  },
  {
    value: "card",
    label: "Credit / Debit Card",
    description: "Pay securely with your bank card.",
    status: PAYMENT_METHOD_STATUS.PLACEHOLDER,
    placeholderText:
      "Visa and Mastercard will be handled by the connected payment gateway.",
    supportedBrands: ["Visa", "Mastercard"],
  },
  {
    value: "easypaisa",
    label: "Easypaisa",
    description: "Pay with your Easypaisa account.",
    status: PAYMENT_METHOD_STATUS.PLACEHOLDER,
    placeholderText:
      "Easypaisa payment will be enabled after the merchant gateway is connected.",
  },
  {
    value: "jazzcash",
    label: "JazzCash",
    description: "Pay with your JazzCash wallet.",
    status: PAYMENT_METHOD_STATUS.PLACEHOLDER,
    placeholderText:
      "JazzCash payment will be enabled after the merchant gateway is connected.",
  },
  {
    value: "bank",
    label: "Bank Transfer",
    description: "Transfer payment directly from your bank.",
    status: PAYMENT_METHOD_STATUS.PLACEHOLDER,
    placeholderText:
      "Bank transfer instructions will be shown after a real payment workflow is connected.",
  },
];

const paymentService = {
  getProvider() {
    return import.meta.env.VITE_PAYMENT_PROVIDER || "unconfigured";
  },

  getStatus() {
    return {
      status: PAYMENT_STATUS.IDLE,
      provider: this.getProvider(),
    };
  },

  async getPaymentMethods() {
    return PAYMENT_METHODS.map((method) => ({
      ...method,
      supportedBrands: method.supportedBrands
        ? [...method.supportedBrands]
        : undefined,
    }));
  },

  getPaymentMethodStatus(method) {
    const selectedMethod = PAYMENT_METHODS.find(
      (item) => item.value === method
    );

    if (!selectedMethod) {
      return PAYMENT_METHOD_STATUS.UNAVAILABLE;
    }

    return selectedMethod.status;
  },

  validatePaymentSelection(method) {
    const selectedMethod = PAYMENT_METHODS.find(
      (item) => item.value === method
    );

    if (!selectedMethod) {
      return {
        valid: false,
        message: "Please select a payment method.",
      };
    }

    return {
      valid: true,
      method: selectedMethod,
    };
  },

  async preparePaymentReview({
    method,
    total = 0,
  } = {}) {
    const validation =
      this.validatePaymentSelection(method);

    if (!validation.valid) {
      throw new Error(validation.message);
    }

    return {
      status: PAYMENT_STATUS.READY,
      provider: this.getProvider(),
      method: validation.method.value,
      total,
      processing: false,
    };
  },

  async createPaymentSession(payload = {}) {
    return {
      status: PAYMENT_STATUS.PENDING,
      provider: this.getProvider(),
      payload,
      session: null,
    };
  },

  async confirmPayment(payload = {}) {
    return {
      status: PAYMENT_STATUS.PENDING,
      provider: this.getProvider(),
      payload,
      transaction: null,
    };
  },
};

export {
  PAYMENT_METHODS,
  PAYMENT_METHOD_STATUS,
  PAYMENT_STATUS,
};

export default paymentService;