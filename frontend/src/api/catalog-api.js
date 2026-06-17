const API_BASE_URL = import.meta.env.VITE_API_URL || "";

export async function fetchCatalog({ page = 1, category = "", subcategory = "", q = "" } = {}) {
  const params = new URLSearchParams();

  params.set("page", String(page));

  if (category) {
    params.set("category", category);
  }

  if (subcategory) {
    params.set("subcategory", subcategory);
  }

  if (q.trim()) {
    params.set("q", q.trim());
  }

  const response = await fetch(`${API_BASE_URL}/api/catalog?${params.toString()}`);

  const contentType = response.headers.get("content-type") || "";

  if (!response.ok) {
    const errorBody = contentType.includes("application/json") ? await response.json().catch(() => ({})) : {};
    throw new Error(errorBody.message || errorBody.error || "Impossible de charger le catalogue.");
  }

  if (!contentType.includes("application/json")) {
    throw new Error("Le catalogue ne répond pas en JSON. Vérifie que le backend API est lancé ou que VITE_API_URL pointe vers le backend.");
  }

  return response.json();
}
