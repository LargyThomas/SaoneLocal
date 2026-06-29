import { useEffect, useState } from "react";
import { getAuthToken } from "../../api/api.js";
import { fetchBasket } from "../../api/basket-api.js";
import { createOrder } from "../../api/orders-api.js";
import Badge from "../../ui/badge.jsx";
import Button from "../../ui/button.jsx";
import Card from "../../ui/card.jsx";
import Container from "../../ui/container.jsx";
import { formatPrice } from "../../utils/format.js";
import { getGuestCart } from "../../utils/guest-cart.js";

export function CheckoutPage() {
  const [basket, setBasket] = useState({ items: [], total: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [isGuestCart, setIsGuestCart] = useState(false);

  useEffect(() => {
    async function loadBasket() {
      setIsLoading(true);
      setError("");

      if (!getAuthToken()) {
        setBasket(getGuestCart());
        setIsGuestCart(true);
        setIsLoading(false);
        return;
      }

      try {
        const result = await fetchBasket();
        setBasket({ items: result.items || [], total: result.total || 0 });
        setIsGuestCart(false);
      } catch (requestError) {
        setError(requestError.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadBasket();
  }, []);

  const handleCreateOrder = async () => {
    setIsSubmitting(true);
    setError("");
    setConfirmation("");

    try {
      const result = await createOrder();
      setBasket({ items: [], total: 0 });
      setConfirmation(result.message || "Commande confirmée.");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const items = basket.items || [];

  return (
    <div className="bg-soft-linen pb-12">
      <Container className="pt-4">
        <section className="mb-6 rounded-card bg-white p-5 shadow-sm sm:p-7">
          <Badge>Commande</Badge>
          <h1 className="mt-4 font-display text-3xl leading-tight text-coffee-beans sm:text-4xl">Validation de commande</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-coffee-beans/75">
            Vérifiez votre panier avant d'envoyer la commande aux producteurs.
          </p>
        </section>

        {isGuestCart && !confirmation ? (
          <Card className="mb-5 border-golden-glow bg-white p-4 text-coffee-beans">
            <p className="font-bold">Connexion nécessaire pour finaliser la commande.</p>
            <p className="mt-2 text-sm font-semibold text-coffee-beans/70">
              Votre panier invité sera récupéré automatiquement après connexion.
            </p>
            <Button as="a" className="mt-4 w-full sm:w-auto" href="/connexion" variant="secondary">
              Me connecter
            </Button>
          </Card>
        ) : null}

        {confirmation ? (
          <Card className="bg-white p-6 text-center">
            <Badge variant="success">Commande confirmée</Badge>
            <h2 className="mt-4 font-display text-2xl text-coffee-beans">Merci pour votre commande</h2>
            <p className="mx-auto mt-3 max-w-md text-base leading-7 text-coffee-beans/70">{confirmation}</p>
            <div className="mt-5 grid gap-3 sm:flex sm:justify-center">
              <Button as="a" href="/historique">
                Voir mon historique
              </Button>
              <Button as="a" href="/catalogue" variant="secondary">
                Continuer mes achats
              </Button>
            </div>
          </Card>
        ) : null}

        {error ? (
          <Card className="mb-5 border-inferno bg-white p-4 text-inferno">
            <p className="font-bold">{error}</p>
            {error.toLowerCase().includes("connecté") ? (
              <Button as="a" className="mt-4 w-full sm:w-auto" href="/connexion">
                Me connecter
              </Button>
            ) : null}
          </Card>
        ) : null}

        {isLoading ? (
          <Card className="bg-white p-5">
            <div className="h-6 w-48 animate-pulse rounded-card bg-coffee-beans/10" />
            <div className="mt-5 grid gap-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <div className="h-14 animate-pulse rounded-card bg-vanilla-custard" key={index} />
              ))}
            </div>
          </Card>
        ) : null}

        {!isLoading && !confirmation && !error && items.length === 0 ? (
          <Card className="bg-white p-6 text-center">
            <h2 className="font-display text-2xl text-coffee-beans">Aucun article à commander</h2>
            <p className="mx-auto mt-3 max-w-md text-base leading-7 text-coffee-beans/70">
              Votre panier est vide. Ajoutez des produits avant de valider une commande.
            </p>
            <Button as="a" className="mt-5 w-full sm:w-auto" href="/catalogue">
              Retour au catalogue
            </Button>
          </Card>
        ) : null}

        {!isLoading && !confirmation && items.length > 0 ? (
          <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
            <Card className="bg-white p-5">
              <h2 className="font-display text-2xl text-coffee-beans">Résumé du panier</h2>
              <div className="mt-5 grid gap-3">
                {items.map((item) => (
                  <div className="rounded-card bg-soft-linen p-4" key={item.basketitemsid || item.productid}>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-extrabold text-coffee-beans">{item.productname}</p>
                        <p className="mt-1 text-sm font-semibold text-coffee-beans/65">
                          Quantité : {item.basketitemsquantity || item.quantity || 1}
                        </p>
                      </div>
                      <p className="shrink-0 font-extrabold text-green">{formatPrice(item.itemtotalprice)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="h-fit bg-white p-5">
              <Badge>Paiement</Badge>
              <p className="mt-4 text-base leading-7 text-coffee-beans/70">
                Le paiement final et le retrait seront confirmés selon les modalités des producteurs.
              </p>
              <div className="mt-5 flex items-end justify-between gap-3 border-t border-coffee-beans/10 pt-4">
                <span className="font-extrabold text-coffee-beans">Total</span>
                <span className="text-2xl font-extrabold text-green">{formatPrice(basket.total)}</span>
              </div>
              {isGuestCart ? (
                <Button as="a" className="mt-5 w-full" href="/connexion" size="lg">
                  Me connecter pour commander
                </Button>
              ) : (
                <Button className="mt-5 w-full" disabled={isSubmitting} onClick={handleCreateOrder} size="lg">
                  {isSubmitting ? "Validation..." : "Confirmer la commande"}
                </Button>
              )}
            </Card>
          </div>
        ) : null}
      </Container>
    </div>
  );
}
