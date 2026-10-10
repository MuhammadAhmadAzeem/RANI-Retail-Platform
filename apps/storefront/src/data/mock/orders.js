
const ORDERS_STORAGE_KEY = "rani-orders";

export const ORDER_STATUSES = {
  PENDING: "Pending",
  CONFIRMED: "Confirmed",
  PROCESSING: "Processing",
  SHIPPED: "Shipped",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
  RETURNED: "Returned",
};

export const PAYMENT_STATUSES = {
  PENDING: "Pending",
  PAID: "Paid",
  FAILED: "Failed",
  REFUNDED: "Refunded",
};

export const ORDER_STATUS_STEPS = [
  ORDER_STATUSES.PENDING,
  ORDER_STATUSES.CONFIRMED,
  ORDER_STATUSES.PROCESSING,
  ORDER_STATUSES.SHIPPED,
  ORDER_STATUSES.DELIVERED,
];

const getTimestamp = () => new Date().toISOString();

const readStoredOrders = () => {
  if (typeof window === "undefined") return [];

  try {
    const stored = localStorage.getItem(ORDERS_STORAGE_KEY);
    const orders = stored ? JSON.parse(stored) : [];

    return Array.isArray(orders) ? orders : [];
  } catch {
    return [];
  }
};

const writeStoredOrders = (orders) => {
  if (typeof window === "undefined") {
    throw new Error("Order storage is unavailable.");
  }

  localStorage.setItem(
    ORDERS_STORAGE_KEY,
    JSON.stringify(orders)
  );
};

export const getOrders = () =>
  readStoredOrders().sort(
    (a, b) =>
      new Date(b.createdAt).getTime() -
      new Date(a.createdAt).getTime()
  );

export const getOrderById = (orderId) =>
  readStoredOrders().find(
    (order) =>
      order.id === orderId ||
      order.orderNumber === orderId
  ) || null;

export const createOrder = ({
  items = [],
  shippingDetails = {},
  paymentMethod = "cod",
  subtotal = 0,
  customer = null,
}) => {
  if (!items.length) {
    throw new Error("Your order must contain at least one item.");
  }

  const now = getTimestamp();
  const id = `order-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 8)}`;

  const orderItems = items.map((item) => ({
    productId: item.productId,
    name: item.name,
    image: item.image || "",
    price: Number(item.price) || 0,
    quantity: Math.max(1, Number(item.quantity) || 1),
    size: item.size || "",
    color: item.color || "",
  }));

  const safeSubtotal = Math.max(0, Number(subtotal) || 0);

  const order = {
    id,
    orderNumber: `RANI-${Date.now().toString().slice(-8)}`,
    createdAt: now,
    updatedAt: now,
    status: ORDER_STATUSES.PENDING,
    paymentMethod,
    paymentStatus: PAYMENT_STATUSES.PENDING,
    subtotal: safeSubtotal,
    shippingFee: 0,
    total: safeSubtotal,
    currency: "PKR",
    items: orderItems,
    itemCount: orderItems.reduce(
      (sum, item) => sum + item.quantity,
      0
    ),
    customer: {
      name:
        shippingDetails.fullName ||
        shippingDetails.name ||
        customer?.name ||
        "",
      email: shippingDetails.email || customer?.email || "",
      phone: shippingDetails.phone || "",
    },
    shippingAddress: {
      address:
        shippingDetails.address ||
        shippingDetails.streetAddress ||
        "",
      city: shippingDetails.city || "",
      state:
        shippingDetails.state ||
        shippingDetails.province ||
        "",
      postalCode:
        shippingDetails.postalCode ||
        shippingDetails.zipCode ||
        "",
      country: shippingDetails.country || "Pakistan",
      shippingMethod:
        shippingDetails.shippingMethod || "standard",
    },
    timeline: [
      {
        status: ORDER_STATUSES.PENDING,
        title: "Order placed",
        description:
          "Your order has been recorded and is awaiting confirmation.",
        timestamp: now,
      },
    ],
  };

  writeStoredOrders([order, ...readStoredOrders()]);

  return order;
};

export const updateOrderStatus = (
  orderId,
  nextStatus,
  description = ""
) => {
  if (!Object.values(ORDER_STATUSES).includes(nextStatus)) {
    throw new Error("Invalid order status.");
  }

  const orders = readStoredOrders();
  const index = orders.findIndex(
    (order) => order.id === orderId
  );

  if (index === -1) return null;

  const now = getTimestamp();
  const order = orders[index];

  const updatedOrder = {
    ...order,
    status: nextStatus,
    updatedAt: now,
    timeline: [
      ...(order.timeline || []),
      {
        status: nextStatus,
        title: `Order ${nextStatus.toLowerCase()}`,
        description:
          description ||
          `Your order status is now ${nextStatus.toLowerCase()}.`,
        timestamp: now,
      },
    ],
  };

  orders[index] = updatedOrder;
  writeStoredOrders(orders);

  return updatedOrder;
};
