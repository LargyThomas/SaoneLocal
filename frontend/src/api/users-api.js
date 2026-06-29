import { apiRequest } from "./api.js";

export async function fetchClientProfile() {
  return apiRequest("/api/client/profil", { auth: true });
}

export async function updateClientProfileField(key, value) {
  return apiRequest("/api/client/profil", {
    auth: true,
    body: { key, value },
    method: "PATCH",
  });
}

export async function uploadProfilePicture(file) {
  const formData = new FormData();
  formData.append("image", file);

  return apiRequest("/api/upload/profile-picture", {
    auth: true,
    body: formData,
    method: "POST",
  });
}
