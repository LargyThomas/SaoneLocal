const API_BASE_URL = import.meta.env.VITE_API_URL || "";

export async function fetchCatalog({ page = 1, category = "", producer = "", q = "" } = {}) {
  const params = new URLSearchParams();

  params.set("page", String(page));

  if (category) {
    params.set("category", category);
  }

  if (producer) {
    params.set("producer", producer);
  }

  if (q.trim()) {
    params.set("q", q.trim());
  }

  const response = await fetch(`${API_BASE_URL}/api/catalog?${params.toString()}`);

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.message || errorBody.error || "Impossible de charger le catalogue.");
  }

  return response.json();
}
