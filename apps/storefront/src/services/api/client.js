const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "/api";

async function request(
  endpoint,
  { method = "GET", body, headers = {}, ...options } = {}
) {
  const response = await fetch(
    `${API_BASE_URL}${endpoint}`,
    {
      method,
      headers: {
        Accept: "application/json",
        ...(body
          ? { "Content-Type": "application/json" }
          : {}),
        ...headers,
      },
      body:
        body === undefined
          ? undefined
          : JSON.stringify(body),
      ...options,
    }
  );

  const contentType =
    response.headers.get("content-type") || "";

  const data = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const message =
      typeof data === "object" && data?.message
        ? data.message
        : `Request failed with status ${response.status}`;

    throw new Error(message);
  }

  return data;
}

const apiClient = {
  get(endpoint, options = {}) {
    return request(endpoint, {
      ...options,
      method: "GET",
    });
  },

  post(endpoint, body, options = {}) {
    return request(endpoint, {
      ...options,
      method: "POST",
      body,
    });
  },

  put(endpoint, body, options = {}) {
    return request(endpoint, {
      ...options,
      method: "PUT",
      body,
    });
  },

  patch(endpoint, body, options = {}) {
    return request(endpoint, {
      ...options,
      method: "PATCH",
      body,
    });
  },

  delete(endpoint, options = {}) {
    return request(endpoint, {
      ...options,
      method: "DELETE",
    });
  },
};

export default apiClient;
export { API_BASE_URL, request };