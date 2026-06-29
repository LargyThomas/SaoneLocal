import { apiRequest } from "./api.js";

export async function fetchBasket() {
  return apiRequest("/api/basket", { auth: true });
}

export async function addBasketItem(productId, quantity = 1) {
  return apiRequest("/api/basket", {
    auth: true,
    body: { productId, quantity },
    method: "POST",
  });
}

export async function removeBasketItem(basketItemsId) {
  return apiRequest(`/api/basket/${basketItemsId}`, {
    auth: true,
    method: "DELETE",
  });
}
