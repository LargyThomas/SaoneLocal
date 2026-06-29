import { apiRequest } from "./api.js";

export async function fetchFavorites() {
  return apiRequest("/api/favorites", { auth: true });
}

export async function addFavorite(productId) {
  return apiRequest("/api/favorites", {
    auth: true,
    body: { productId },
    method: "POST",
  });
}

export async function removeFavorite(productId) {
  return apiRequest(`/api/favorites/${productId}`, {
    auth: true,
    method: "DELETE",
  });
}
