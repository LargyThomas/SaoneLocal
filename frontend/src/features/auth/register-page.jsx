import { useState } from "react";
import { registerUser } from "../../api/auth-api.js";
import Badge from "../../ui/badge.jsx";
import Button from "../../ui/button.jsx";
import Card from "../../ui/card.jsx";
import Container from "../../ui/container.jsx";
import Input from "../../ui/input.jsx";
import { useSeo } from "../../hooks/use-seo.js";

export function RegisterPage() {
  useSeo({
    title: "Inscription",
    description: "Créez votre compte SaôneLocal pour commander des produits locaux et suivre vos producteurs favoris.",
  });

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    producerSpace: "non",
    siret: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const genderOptions = [
    { label: "Homme", value: "M" },
    { label: "Femme", value: "F" },
    { label: "Autre", value: "A" },
  ];

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

    if (form.password !== form.confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      setIsLoading(false);
      return;
    }

    if (!form.gender) {
      setError("Veuillez choisir un genre.");
      setIsLoading(false);
      return;
    }

    try {
      await registerUser(form);
      setMessage("Compte créé avec succès. Vous pouvez maintenant vous connecter.");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-soft-linen pb-12">
      <Container className="pt-4">
        <section className="grid gap-6 lg:grid-cols-[minmax(320px,460px)_minmax(0,1fr)] lg:items-center">
          <Card className="bg-golden-glow p-4 shadow-[0_18px_42px_rgba(36,17,5,0.08)] sm:p-6">
            <form className="grid gap-4" onSubmit={handleSubmit}>
              <h1 className="text-center font-display text-2xl leading-tight text-coffee-beans">M'inscrire</h1>

              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  label="Nom"
                  name="lastName"
                  onChange={(event) => updateField("lastName", event.target.value)}
                  required
                  value={form.lastName}
                />
                <Input
                  label="Prénom"
                  name="firstName"
                  onChange={(event) => updateField("firstName", event.target.value)}
                  required
                  value={form.firstName}
                />
              </div>

              <Input
                autoComplete="email"
                label="Adresse mail"
                name="email"
                onChange={(event) => updateField("email", event.target.value)}
                required
                type="email"
                value={form.email}
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  autoComplete="new-password"
                  label="Mot de passe"
                  name="password"
                  onChange={(event) => updateField("password", event.target.value)}
                  required
                  type="password"
                  value={form.password}
                />
                <Input
                  autoComplete="new-password"
                  label="Confirmer"
                  name="confirmPassword"
                  onChange={(event) => updateField("confirmPassword", event.target.value)}
                  required
                  type="password"
                  value={form.confirmPassword}
                />
              </div>

              <fieldset className="grid gap-2 text-base font-bold text-coffee-beans">
                <legend>Genre</legend>
                <div className="flex flex-wrap gap-4 text-sm">
                  {genderOptions.map((gender) => (
                    <label className="flex items-center gap-2" key={gender.value}>
                      <input
                        checked={form.gender === gender.value}
                        className="h-4 w-4 accent-green"
                        onChange={() => updateField("gender", gender.value)}
                        type="radio"
                      />
                      {gender.label}
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset className="grid gap-2 text-base font-bold text-coffee-beans">
                <legend>Espace producteur</legend>
                <div className="flex flex-wrap gap-4 text-sm">
                  {["non", "oui"].map((value) => (
                    <label className="flex items-center gap-2" key={value}>
                      <input
                        checked={form.producerSpace === value}
                        className="h-4 w-4 accent-green"
                        onChange={() => updateField("producerSpace", value)}
                        type="radio"
                      />
                      {value.toUpperCase()}
                    </label>
                  ))}
                </div>
              </fieldset>

              {form.producerSpace === "oui" ? (
                <Input
                  label="Numéro de SIRET"
                  name="siret"
                  onChange={(event) => updateField("siret", event.target.value)}
                  value={form.siret}
                />
              ) : null}

              {error ? <p className="rounded-card bg-white px-3 py-2 text-sm font-bold text-inferno">{error}</p> : null}
              {message ? <p className="rounded-card bg-green px-3 py-2 text-sm font-bold text-white">{message}</p> : null}

              <Button className="w-full" disabled={isLoading} type="submit">
                {isLoading ? "Création..." : "Créer mon compte"}
              </Button>
            </form>
          </Card>

          <div className="rounded-card border border-coffee-beans/10 bg-[#fffdf7] p-5 shadow-[0_18px_48px_rgba(36,17,5,0.07)] sm:p-7">
            <Badge>Nouveau compte</Badge>
            <h2 className="mt-5 break-words font-display text-3xl leading-tight text-coffee-beans sm:text-5xl">
              Rejoindre SaôneLocal
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-8 text-coffee-beans/75">
              Créez votre compte pour commander plus facilement, retrouver vos informations et suivre vos achats auprès
              des producteurs locaux.
            </p>
            <Button as="a" className="mt-6 w-full sm:w-auto" href="/connexion" variant="secondary">
              J'ai déjà un compte
            </Button>
          </div>
        </section>
      </Container>
    </div>
  );
}
