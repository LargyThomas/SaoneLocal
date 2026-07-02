const API_BASE_URL = import.meta.env.VITE_API_URL || "";

function normalizeUser(user = {}) {
  const rawRole = user.role ?? user.usersrole ?? user.usersRole;
  const role = Number(rawRole);

  return {
    ...user,
    email: user.email ?? user.usersemail ?? user.usersEmail,
    role: Number.isNaN(role) ? rawRole : role,
  };
}

export async function loginUser({ email, password, adminCheckbox = false, producerCheckbox = false }) {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    body: JSON.stringify({ email: email.trim(), password, adminCheckbox, producerCheckbox }),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  console.log("[login] status", response.status);
  console.log("[login] response.ok", response.ok);

  const data = await response.json();
  console.log("[login] JSON reçu", data);

  if (!response.ok) {
    throw new Error(data.message || data.error || "Impossible de se connecter.");
  }

  const token = data.token;
  const user = normalizeUser(data.user);

  console.log("[login] token récupéré", Boolean(token));
  console.log("[login] user récupéré", user);

  if (!token || !user?.email) {
    throw new Error("Réponse de connexion incomplète.");
  }

  return {
    ...data,
    token,
    user,
  };
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
