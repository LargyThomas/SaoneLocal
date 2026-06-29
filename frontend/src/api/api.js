export const API_BASE_URL = import.meta.env.VITE_API_URL || "";

export function getAuthToken() {
  return localStorage.getItem("saonelocal-token") || "";
}

export function getStoredUser() {
  const storedUser = localStorage.getItem("saonelocal-user");

  if (!storedUser) {
    return null;
  }

  try {
    return JSON.parse(storedUser);
  } catch {
    localStorage.removeItem("saonelocal-user");
    return null;
  }
}

export function clearAuthStorage() {
  localStorage.removeItem("saonelocal-token");
  localStorage.removeItem("saonelocal-user");
}

export function authHeaders(extraHeaders = {}) {
  const token = getAuthToken();

  return {
    ...extraHeaders,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export function requireAuthToken() {
  const token = getAuthToken();

  if (!token) {
    throw new Error("Vous devez être connecté pour accéder à cette page.");
  }

  return token;
}

async function parseResponse(response) {
  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    return response.json();
  }

  const text = await response.text();
  return text ? { message: text } : {};
}

export async function apiRequest(path, { auth = false, body, headers = {}, method = "GET" } = {}) {
  if (auth) {
    requireAuthToken();
  }

  const requestHeaders = body instanceof FormData
    ? authHeaders(headers)
    : authHeaders({ "Content-Type": "application/json", ...headers });

  const response = await fetch(`${API_BASE_URL}${path}`, {
    body: body instanceof FormData || typeof body === "string" ? body : body ? JSON.stringify(body) : undefined,
    headers: requestHeaders,
    method,
  });

  const data = await parseResponse(response);

  if (!response.ok) {
    throw new Error(data.message || data.error || "Une erreur est survenue.");
  }

  return data;
}
