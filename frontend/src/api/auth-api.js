const API_BASE_URL = import.meta.env.VITE_API_URL || "";

export async function loginUser({ email, password, adminCheckbox = false, producerCheckbox = false }) {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    body: JSON.stringify({ email: email.trim(), password, adminCheckbox, producerCheckbox }),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || data.error || "Impossible de se connecter.");
  }

  return data;
}

export async function registerUser({ firstName, lastName, email, password, gender }) {
  const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
    body: JSON.stringify({ firstName, lastName, email, password, gender }),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || data.error || "Impossible de créer le compte.");
  }

  return data;
}
