import { useEffect, useState } from "react";
import { fetchClientProfile, updateClientProfileField, uploadProfilePicture } from "../../api/users-api.js";
import Badge from "../../ui/badge.jsx";
import Button from "../../ui/button.jsx";
import Card from "../../ui/card.jsx";
import Container from "../../ui/container.jsx";
import Input from "../../ui/input.jsx";
import { formatPrice } from "../../utils/format.js";

function getUserName(user) {
  return user?.usersfirstname || "client";
}

function getFullName(user) {
  return `${user?.usersfirstname || ""} ${user?.userslastname || ""}`.trim() || "Client SaôneLocal";
}

function getBasketTotal(items) {
  return items.reduce((total, item) => total + Number(item.basketitemstotalcost || 0), 0);
}

function ProductRow({ item }) {
  return (
    <div className="grid grid-cols-[72px_1fr_auto] items-center gap-3 rounded-card bg-white p-3 shadow-sm">
      <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-card bg-vanilla-custard">
        {item.productpicture ? (
          <img alt={item.productname || "Produit"} className="h-full w-full object-cover" decoding="async" loading="lazy" src={item.productpicture} />
        ) : (
          <span className="text-xs font-extrabold text-coffee-beans/60">Produit</span>
        )}
      </div>
      <div className="min-w-0">
        <p className="truncate text-sm font-extrabold text-coffee-beans">{item.productname || "Produit local"}</p>
        <p className="mt-1 text-xs font-bold text-coffee-beans/60">
          Quantité : {item.basketitemsquantity || 1}
        </p>
      </div>
      <p className="rounded-button bg-golden-glow px-2 py-1 text-sm font-extrabold text-coffee-beans">
        {formatPrice(item.basketitemstotalcost || item.productprice)}
      </p>
    </div>
  );
}

function FavoriteRow({ item }) {
  return (
    <div className="grid grid-cols-[82px_1fr_auto] items-center gap-3 rounded-card bg-green p-3 text-white shadow-sm">
      <div className="h-16 w-20 overflow-hidden rounded-card bg-vanilla-custard">
        {item.productpicture ? (
          <img alt={item.productname || "Favori"} className="h-full w-full object-cover" decoding="async" loading="lazy" src={item.productpicture} />
        ) : null}
      </div>
      <div className="min-w-0">
        <p className="truncate text-sm font-extrabold">{item.productname || "Produit favori"}</p>
        <a className="mt-2 inline-block text-xs font-bold underline-offset-4 hover:underline" href={`/produits/${item.productid}`}>
          Ajouter au panier
        </a>
      </div>
      <span aria-hidden="true" className="text-2xl leading-none">♡</span>
    </div>
  );
}

export function ClientProfilePage() {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [form, setForm] = useState({ usersFirstname: "", usersGender: "", usersLastname: "" });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loginMessage = sessionStorage.getItem("saonelocal-login-message");

    if (loginMessage) {
      setMessage(loginMessage);
      sessionStorage.removeItem("saonelocal-login-message");
    }

    async function loadProfile() {
      setIsLoading(true);
      setError("");

      try {
        const result = await fetchClientProfile();
        const user = result.resultUser?.[0] || {};
        setProfile(result);
        setForm({
          usersFirstname: user.usersfirstname || "",
          usersGender: user.usersgender || "",
          usersLastname: user.userslastname || "",
        });
      } catch (requestError) {
        setProfile(null);
        setError(requestError.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadProfile();
  }, []);

  const user = profile?.resultUser?.[0];
  const basket = profile?.resultBasket || [];
  const orders = profile?.resultOrder || [];
  const favorites = profile?.resultFavoriteProduct || [];
  const basketTotal = getBasketTotal(basket);
  const suggestions = favorites.length > 0 ? favorites.slice(0, 2) : basket.slice(0, 2);

  const handleProfileSubmit = async (event) => {
    event.preventDefault();
    setIsSaving(true);
    setError("");
    setMessage("");

    try {
      await updateClientProfileField("usersFirstname", form.usersFirstname);
      await updateClientProfileField("usersLastname", form.usersLastname);

      if (form.usersGender) {
        await updateClientProfileField("usersGender", form.usersGender);
      }

      const result = await fetchClientProfile();
      setProfile(result);
      setMessage("Profil mis à jour.");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleProfilePictureUpload = async (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setIsUploading(true);
    setError("");
    setMessage("");

    try {
      const result = await uploadProfilePicture(file);
      setProfile((current) => {
        const nextUser = {
          ...(current?.resultUser?.[0] || {}),
          usersprofilpicture: result.imageUrl || result.url || result.profilePictureUrl || result.usersProfilPicture || result.usersprofilpicture,
        };

        return {
          ...current,
          resultUser: [nextUser],
        };
      });
      setMessage("Photo de profil mise à jour.");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-soft-linen pb-12">
      <Container className="pt-4">
        <main className="grid gap-5">
          <section className="grid gap-4 rounded-card bg-white p-4 shadow-sm sm:grid-cols-[1fr_auto] sm:items-start">
            <div>
              <Badge>Espace client</Badge>
              <h1 className="mt-4 max-w-xl font-display text-3xl leading-tight text-coffee-beans sm:text-4xl">
                Bienvenue {getUserName(user)}
              </h1>
              <p className="mt-3 text-base font-semibold text-coffee-beans/70">
                Retrouvez votre panier, vos favoris et le suivi de vos commandes SaôneLocal.
              </p>
            </div>
            {user?.usersprofilpicture ? (
              <img alt={getFullName(user)} className="h-20 w-20 rounded-photo object-cover" decoding="async" src={user.usersprofilpicture} />
            ) : (
              <div className="flex h-20 w-20 items-center justify-center rounded-photo bg-vanilla-custard text-2xl font-extrabold text-forest-green">
                SL
              </div>
            )}
          </section>

          {message ? (
            <Card className="border-green bg-white p-4 text-green">
              <p className="font-bold">{message}</p>
            </Card>
          ) : null}

          {error ? (
            <Card className="border-inferno bg-white p-4 text-inferno">
              <p className="font-bold">{error}</p>
              <Button as="a" className="mt-4 w-full sm:w-auto" href="/connexion">
                Me connecter
              </Button>
            </Card>
          ) : null}

          {isLoading ? (
            <Card className="bg-white p-5">
              <div className="h-8 w-56 animate-pulse rounded-card bg-coffee-beans/10" />
              <div className="mt-5 h-48 animate-pulse rounded-card bg-vanilla-custard" />
            </Card>
          ) : null}

          {!isLoading && !error ? (
            <>
              <section className="grid gap-4 md:grid-cols-3">
                <Card className="bg-white p-5 text-center">
                  <p className="font-display text-2xl text-coffee-beans">{basket.length}</p>
                  <p className="mt-1 text-sm font-extrabold text-coffee-beans/65">article panier</p>
                </Card>
                <Card className="bg-white p-5 text-center">
                  <p className="font-display text-2xl text-coffee-beans">{favorites.length}</p>
                  <p className="mt-1 text-sm font-extrabold text-coffee-beans/65">favori</p>
                </Card>
                <Card className="bg-white p-5 text-center">
                  <p className="font-display text-2xl text-coffee-beans">{orders.length}</p>
                  <p className="mt-1 text-sm font-extrabold text-coffee-beans/65">commande en cours</p>
                </Card>
              </section>

              <section className="rounded-card bg-white p-4 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="font-display text-2xl text-coffee-beans">Mes informations</h2>
                    <p className="mt-2 text-sm font-semibold text-coffee-beans/65">
                      Modifiez vos informations client et votre photo de profil.
                    </p>
                  </div>
                </div>

                <form className="mt-5 grid gap-4" onSubmit={handleProfileSubmit}>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Input
                      label="Prénom"
                      name="usersFirstname"
                      onChange={(event) => setForm((current) => ({ ...current, usersFirstname: event.target.value }))}
                      value={form.usersFirstname}
                    />
                    <Input
                      label="Nom"
                      name="usersLastname"
                      onChange={(event) => setForm((current) => ({ ...current, usersLastname: event.target.value }))}
                      value={form.usersLastname}
                    />
                  </div>

                  <fieldset className="grid gap-2 text-base font-bold text-coffee-beans">
                    <legend>Genre</legend>
                    <div className="flex flex-wrap gap-4 text-sm">
                      {[
                        { label: "Homme", value: "M" },
                        { label: "Femme", value: "F" },
                        { label: "Autre", value: "A" },
                      ].map((gender) => (
                        <label className="flex items-center gap-2" key={gender.value}>
                          <input
                            checked={form.usersGender === gender.value}
                            className="h-4 w-4 accent-green"
                            onChange={() => setForm((current) => ({ ...current, usersGender: gender.value }))}
                            type="radio"
                          />
                          {gender.label}
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <label className="grid gap-2 text-sm font-bold text-coffee-beans">
                    Photo de profil
                    <input
                      accept="image/png,image/jpeg,image/webp"
                      className="block w-full rounded-card border border-coffee-beans/20 bg-soft-linen px-3 py-2 text-sm"
                      disabled={isUploading}
                      onChange={handleProfilePictureUpload}
                      type="file"
                    />
                  </label>

                  <Button className="w-full sm:w-auto" disabled={isSaving || isUploading} type="submit">
                    {isSaving ? "Enregistrement..." : "Enregistrer"}
                  </Button>
                </form>
              </section>

              <section className="rounded-card bg-white p-4 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 className="font-display text-2xl text-coffee-beans">Mon panier</h2>
                  <Button as="a" href="/panier" size="sm">
                    Voir mon panier
                  </Button>
                </div>

                {basket.length > 0 ? (
                  <div className="mt-4 grid gap-3">
                    {basket.slice(0, 4).map((item) => (
                      <ProductRow item={item} key={item.productid} />
                    ))}
                    <div className="flex items-center justify-between rounded-card bg-golden-glow px-4 py-3 font-extrabold text-coffee-beans">
                      <span>Total</span>
                      <span>{formatPrice(basketTotal)}</span>
                    </div>
                  </div>
                ) : (
                  <div className="mt-4 rounded-card bg-soft-linen p-8 text-center">
                    <p className="font-extrabold text-coffee-beans">Mon panier est vide</p>
                    <p className="mt-2 text-sm font-semibold text-coffee-beans/65">Ajoutez vos favoris au panier ou découvrez le catalogue.</p>
                  </div>
                )}
              </section>

              <section className="rounded-card bg-white p-4 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 className="font-display text-2xl text-coffee-beans">Mes favoris</h2>
                  <Button as="a" href="/favoris" size="sm" variant="secondary">
                    Tous mes favoris
                  </Button>
                </div>

                {favorites.length > 0 ? (
                  <div className="mt-4 grid gap-3">
                    {favorites.slice(0, 3).map((item) => (
                      <FavoriteRow item={item} key={item.productid} />
                    ))}
                  </div>
                ) : (
                  <Card className="mt-4 bg-soft-linen p-5 text-center">
                    <p className="font-extrabold text-coffee-beans">Aucun favori pour le moment.</p>
                  </Card>
                )}
              </section>

              <section className="rounded-card bg-white p-4 shadow-sm">
                <h2 className="font-display text-2xl text-coffee-beans">Voir mes commandes</h2>
                <div className="mt-4 rounded-card bg-soft-linen p-4 text-center">
                  <p className="font-bold text-coffee-beans">
                    {orders.length > 0 ? "Commande en cours de préparation." : "Aucune commande en cours."}
                  </p>
                </div>
                <Button as="a" className="mt-4 w-full sm:w-auto" href="/historique" variant="secondary">
                  Consulter l'historique
                </Button>
              </section>

              <section className="rounded-card bg-coffee-beans p-4 text-white shadow-sm">
                <h2 className="font-display text-2xl text-white">Ils vous ont plu</h2>
                {suggestions.length > 0 ? (
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    {suggestions.map((item) => (
                      <a className="block rounded-card bg-white/10 p-3 transition hover:bg-white/15" href={`/produits/${item.productid}`} key={item.productid}>
                        <div className="aspect-square overflow-hidden rounded-card bg-vanilla-custard">
                          {item.productpicture ? (
                            <img alt={item.productname || "Produit"} className="h-full w-full object-cover" decoding="async" loading="lazy" src={item.productpicture} />
                          ) : null}
                        </div>
                        <p className="mt-2 text-sm font-extrabold">{item.productname || "Produit local"}</p>
                      </a>
                    ))}
                  </div>
                ) : (
                  <p className="mt-3 text-sm font-semibold text-white/75">Vos suggestions apparaîtront après vos premiers favoris.</p>
                )}
              </section>
            </>
          ) : null}
        </main>
      </Container>
    </div>
  );
}
