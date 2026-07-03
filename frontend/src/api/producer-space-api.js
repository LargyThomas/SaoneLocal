import { apiRequest } from "./api.js";

export async function fetchProducerProfile() {
  return apiRequest("/api/producer/profil", { auth: true });
}

export async function updateProducerProfileField(key, value) {
  return apiRequest("/api/producer/profil", {
    auth: true,
    body: { key, value },
    method: "PATCH",
  });
}

export async function uploadProductPicture(file) {
  const formData = new FormData();
  formData.append("image", file);

  return apiRequest("/api/upload/product-picture", {
    auth: true,
    body: formData,
    method: "POST",
  });
}
