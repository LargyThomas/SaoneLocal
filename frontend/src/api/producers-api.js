const API_BASE_URL = import.meta.env.VITE_API_URL || "";

export async function fetchProducers() {
  const response = await fetch(`${API_BASE_URL}/api/producer`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Impossible de charger les producteurs.");
  }

  return data.result || [];
}

export async function fetchProducer(producerId) {
  const response = await fetch(`${API_BASE_URL}/api/producer/${producerId}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Impossible de charger le producteur.");
  }

  return data;
}
