import { useState } from "react";
import { loginUser } from "../../api/auth-api.js";
import { addBasketItem } from "../../api/basket-api.js";
import Badge from "../../ui/badge.jsx";
import Button from "../../ui/button.jsx";
import Card from "../../ui/card.jsx";
import Container from "../../ui/container.jsx";
import Input from "../../ui/input.jsx";
import { clearGuestCart, getGuestCartItems } from "../../utils/guest-cart.js";

function getRedirectPath(user) {
  if (user?.role === 1) {
    return "/profil";
  }

  if (user?.role === 2) {
    return "/producteur";
  }

  return "/";
}

export function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "", producerCheckbox: false });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const updateField = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    setMessage("");

    try {
      const result = await loginUser(form);
      localStorage.setItem("saonelocal-token", result.token);
      localStorage.setItem("saonelocal-user", JSON.stringify(result.user));

      const guestItems = getGuestCartItems();
      let successMessage = "Connexion réussie.";

      if (guestItems.length > 0 && result.user?.role === 1) {
        try {
          for (const item of guestItems) {
            await addBasketItem(item.productid, item.quantity || 1);
          }

          clearGuestCart();
          successMessage = "Connexion réussie. Votre panier invité a été récupéré.";
        } catch {
          successMessage = "Connexion réussie. Votre panier invité n'a pas pu être synchronisé automatiquement.";
        }
      }

      sessionStorage.setItem("saonelocal-login-message", successMessage);
      window.location.assign(getRedirectPath(result.user));
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-soft-linen pb-12">
      <Container className="pt-4">
        <section className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(320px,420px)] lg:items-center">
          <div className="rounded-card border border-coffee-beans/10 bg-[#fffdf7] p-5 shadow-[0_18px_48px_rgba(36,17,5,0.07)] sm:p-7">
            <Badge>Espace connecté</Badge>
            <h1 className="mt-5 break-words font-display text-3xl leading-tight text-coffee-beans sm:text-5xl">
              Me connecter
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-8 text-coffee-beans/75">
              Connectez-vous pour retrouver votre panier, vos commandes ou votre espace producteur.
            </p>
          </div>

          <Card className="bg-golden-glow p-4 shadow-[0_18px_42px_rgba(36,17,5,0.08)] sm:p-6">
            <form className="grid gap-4" onSubmit={handleSubmit}>
              <h2 className="text-center font-display text-2xl leading-tight text-coffee-beans">Me connecter</h2>

              <Input
                autoComplete="email"
                label="Identifiant"
                name="email"
                onChange={(event) => updateField("email", event.target.value)}
                required
                type="email"
                value={form.email}
              />

              <Input
                autoComplete="current-password"
                label="Mot de passe"
                name="password"
                onChange={(event) => updateField("password", event.target.value)}
                required
                type="password"
                value={form.password}
              />

              <div className="grid gap-3 text-sm font-bold text-coffee-beans sm:grid-cols-[1fr_auto] sm:items-center">
                <a className="hover:text-green" href="/mot-de-passe-oublie">
                  Mot de passe oublié ?
                </a>
                <label className="flex items-center gap-2">
                  <input
                    checked={form.producerCheckbox}
                    className="h-4 w-4 accent-green"
                    onChange={(event) => updateField("producerCheckbox", event.target.checked)}
                    type="checkbox"
                  />
                  Espace producteur : Oui
                </label>
              </div>

              {error ? <p className="rounded-card bg-white px-3 py-2 text-sm font-bold text-inferno">{error}</p> : null}
              {message ? <p className="rounded-card bg-green px-3 py-2 text-sm font-bold text-white">{message}</p> : null}

              <Button className="w-full" disabled={isLoading} type="submit">
                {isLoading ? "Connexion..." : "Me connecter"}
              </Button>
            </form>
          </Card>
        </section>

        <section className="mt-6 rounded-card border border-coffee-beans/10 bg-white p-6 text-center shadow-sm">
          <h2 className="font-display text-2xl leading-tight text-coffee-beans">Pas de compte ?</h2>
          <Button as="a" className="mt-5 w-full sm:w-auto" href="/inscription" variant="secondary">
            M'inscrire
          </Button>
        </section>
      </Container>
    </div>
  );
}
