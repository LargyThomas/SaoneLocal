import { apiRequest, API_BASE_URL } from "./api.js";

export async function fetchCatalog({ page = 1, category = "", subcategory = "", producer = "", q = "" } = {}) {
  const params = new URLSearchParams();

  params.set("page", String(page));

  if (category) {
    params.set("category", category);
  }

  if (subcategory) {
    params.set("subcategory", subcategory);
  }

  if (producer) {
    params.set("producer", producer);
  }

  if (q.trim()) {
    params.set("q", q.trim());
  }

  const response = await fetch(`${API_BASE_URL}/api/catalog?${params.toString()}`);

  if (!response.ok) {
    throw new Error("Impossible de charger le catalogue.");
  }

  const data = await response.json();
  return data.result || data;
}

export async function fetchProduct(productId) {
  const response = await fetch(`${API_BASE_URL}/api/catalog/${productId}`);

  if (!response.ok) {
    throw new Error("Impossible de charger le produit.");
  }

  const data = await response.json();
  return data.result || data;
}

export async function createProduct(payload) {
  return apiRequest("/api/catalog", {
    auth: true,
    body: payload,
    method: "POST",
  });
}

export async function updateProduct(productId, payload) {
  return apiRequest(`/api/catalog/${productId}`, {
    auth: true,
    body: payload,
    method: "PATCH",
  });
}

export async function deleteProduct(productId) {
  return apiRequest(`/api/catalog/${productId}`, {
    auth: true,
    method: "DELETE",
  });
}
