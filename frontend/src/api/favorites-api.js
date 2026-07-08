import { apiRequest } from "./api.js";

export async function fetchFavorites() {
  return apiRequest("/api/favorites/product", { auth: true });
}

export async function addFavorite(productId) {
  return apiRequest("/api/favorites/product", {
    auth: true,
    body: { "id": productId },
    method: "POST",
  });
}

export async function removeFavorite(productId) {
  return apiRequest(`/api/favorites/product/${productId}`, {
    auth: true,
    method: "DELETE",
  });
}
