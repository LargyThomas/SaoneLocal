import { apiRequest } from "./api.js";

export async function fetchOrders() {
  return apiRequest("/api/orders", { auth: true });
}

export async function createOrder() {
  return apiRequest("/api/orders", {
    auth: true,
    method: "POST",
  });
}
