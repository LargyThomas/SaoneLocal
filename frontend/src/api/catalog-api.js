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

  if (!response.ok) {
    throw new Error("Impossible de charger le catalogue.");
  }

  return response.json();
}

export async function fetchProduct(productId) {
  const response = await fetch(`${API_BASE_URL}/api/catalog/${productId}`);

  if (!response.ok) {
    throw new Error("Impossible de charger le produit.");
  }

  return response.json();
}
