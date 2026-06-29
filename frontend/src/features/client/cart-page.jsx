import { useEffect, useState } from "react";
import { getAuthToken } from "../../api/api.js";
import { addBasketItem, fetchBasket, removeBasketItem } from "../../api/basket-api.js";
import Badge from "../../ui/badge.jsx";
import Button from "../../ui/button.jsx";
import Card from "../../ui/card.jsx";
import Container from "../../ui/container.jsx";
import { formatPrice } from "../../utils/format.js";
import { addGuestCartItem, decrementGuestCartItem, getGuestCart, removeGuestCartItem } from "../../utils/guest-cart.js";

function getItemId(item) {
  return item.basketitemsid || item.basketItemsId || item.productid;
}

function getItemQuantity(item) {
  return item.basketitemsquantity || item.basketItemsQuantity || item.quantity || 1;
}

function getItemTotal(item) {
  return item.itemtotalprice || item.basketitemstotalcost || item.basketItemsTotalCost || 0;
}

function BasketItem({ item, isUpdating, onDecrease, onIncrease, onRemove }) {
  const itemId = getItemId(item);
  const quantity = getItemQuantity(item);
  const total = getItemTotal(item);
  const productId = item.productid || item.productId;

  return (
    <Card className="grid gap-4 bg-[#fffdf7] p-4 sm:grid-cols-[96px_1fr_auto] sm:items-center">
      <div className="flex h-24 w-full items-center justify-center rounded-photo bg-vanilla-custard text-sm font-extrabold text-brown-bark sm:w-24">
        {item.productpicture ? (
          <img alt={item.productname || "Produit"} className="h-full w-full rounded-photo object-cover" decoding="async" loading="lazy" src={item.productpicture} />
        ) : (
          <span>Produit</span>
        )}
      </div>

      <div>
        <h2 className="text-lg font-extrabold text-coffee-beans">{item.productname || "Produit local"}</h2>
        <p className="mt-1 text-sm font-semibold text-coffee-beans/65">Quantité : {quantity}</p>
        <p className="mt-1 text-sm font-semibold text-coffee-beans/65">
          Prix unitaire : {formatPrice(item.productprice)}
        </p>
      </div>

      <div className="grid gap-3 sm:justify-items-end">
        <p className="text-xl font-extrabold text-green">{formatPrice(total)}</p>
        <div className="flex items-center gap-2">
          <div className="inline-flex min-h-10 items-center overflow-hidden rounded-button bg-green text-sm font-extrabold text-white shadow-[0_10px_18px_rgba(15,113,10,0.16)]">
            <span className="min-w-10 px-3 text-center">{quantity}</span>
            <button
              aria-label="Ajouter une unité"
              className="h-10 cursor-pointer border-l border-white/25 px-3 transition hover:bg-brand-green disabled:cursor-not-allowed disabled:opacity-70"
              disabled={isUpdating}
              onClick={() => onIncrease(productId)}
              type="button"
            >
              +
            </button>
            <button
              aria-label="Retirer une unité"
              className="h-10 cursor-pointer border-l border-white/25 px-3 transition hover:bg-brand-green disabled:cursor-not-allowed disabled:opacity-70"
              disabled={isUpdating}
              onClick={() => onDecrease(item)}
              type="button"
            >
              -
            </button>
          </div>
          <button
            aria-label="Retirer cet article du panier"
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-button bg-inferno text-white shadow-sm transition hover:bg-[#7d0800] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-mustard focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
            disabled={isUpdating}
            onClick={() => onRemove(itemId)}
            type="button"
          >
            <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
              <path
                d="M6 7h12m-9 0V5h6v2m-7 3v8m4-8v8m4-11-.7 13H8.7L8 7"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
          </button>
        </div>
      </div>
    </Card>
  );
}

export function CartPage() {
  const [basket, setBasket] = useState({ items: [], total: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);
  const [isGuestCart, setIsGuestCart] = useState(false);

  const loadBasket = async () => {
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
      setBasket({ items: [], total: 0 });
      setError(requestError.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadBasket();
  }, []);

  const handleRemove = async (basketItemsId) => {
    if (!basketItemsId) {
      return;
    }

    setUpdatingId(basketItemsId);
    setError("");

    if (isGuestCart) {
      setBasket(removeGuestCartItem(basketItemsId));
      setUpdatingId(null);
      return;
    }

    try {
      const result = await removeBasketItem(basketItemsId);
      setBasket({ items: result.items || [], total: result.total || 0 });
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleIncrease = async (productId) => {
    if (!productId) {
      return;
    }

    setUpdatingId(productId);
    setError("");

    if (isGuestCart) {
      setBasket(addGuestCartItem({ productid: productId }, 1));
      setUpdatingId(null);
      return;
    }

    try {
      const result = await addBasketItem(productId, 1);
      setBasket({ items: result.items || [], total: result.total || 0 });
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDecrease = async (item) => {
    const basketItemsId = getItemId(item);
    const quantity = getItemQuantity(item);
    const productId = item.productid || item.productId;

    if (!basketItemsId) {
      return;
    }

    setUpdatingId(basketItemsId);
    setError("");

    if (isGuestCart) {
      setBasket(decrementGuestCartItem(productId));
      setUpdatingId(null);
      return;
    }

    try {
      if (quantity <= 1) {
        const result = await removeBasketItem(basketItemsId);
        setBasket({ items: result.items || [], total: result.total || 0 });
        return;
      }

      await removeBasketItem(basketItemsId);
      const result = await addBasketItem(productId, quantity - 1);
      setBasket({ items: result.items || [], total: result.total || 0 });
    } catch (requestError) {
      setError(requestError.message);
      loadBasket();
    } finally {
      setUpdatingId(null);
    }
  };

  const items = basket.items || [];

  return (
    <div className="bg-soft-linen pb-12">
      <Container className="pt-4">
        <section className="mb-6 rounded-card bg-white p-5 shadow-sm sm:p-7">
          <Badge>Panier</Badge>
          <h1 className="mt-4 font-display text-3xl leading-tight text-coffee-beans sm:text-4xl">Mon panier</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-coffee-beans/75">
            Retrouvez vos produits sélectionnés avant de valider votre commande.
          </p>
        </section>

        {isGuestCart && items.length > 0 ? (
          <Card className="mb-5 border-golden-glow bg-white p-4 text-coffee-beans">
            <p className="font-bold">Vous utilisez un panier invité.</p>
            <p className="mt-2 text-sm font-semibold text-coffee-beans/70">
              Connectez-vous pour récupérer ce panier dans votre compte avant de commander.
            </p>
            <Button as="a" className="mt-4 w-full sm:w-auto" href="/connexion" variant="secondary">
              Me connecter
            </Button>
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
          <div className="grid gap-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <Card className="grid gap-4 bg-white p-4 sm:grid-cols-[96px_1fr_auto]" key={index}>
                <div className="h-24 animate-pulse rounded-photo bg-vanilla-custard" />
                <div className="space-y-3">
                  <div className="h-5 w-48 animate-pulse rounded-card bg-coffee-beans/10" />
                  <div className="h-4 w-28 animate-pulse rounded-card bg-coffee-beans/10" />
                </div>
                <div className="h-10 w-28 animate-pulse rounded-button bg-muted-olive/30" />
              </Card>
            ))}
          </div>
        ) : null}

        {!isLoading && !error && items.length === 0 ? (
          <Card className="bg-white p-6 text-center">
            <h2 className="font-display text-2xl text-coffee-beans">Votre panier est vide</h2>
            <p className="mx-auto mt-3 max-w-md text-base leading-7 text-coffee-beans/70">
              Ajoutez quelques produits locaux depuis le catalogue pour préparer votre commande.
            </p>
            <Button as="a" className="mt-5 w-full sm:w-auto" href="/catalogue">
              Découvrir le catalogue
            </Button>
          </Card>
        ) : null}

        {!isLoading && items.length > 0 ? (
          <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
            <section className="grid gap-4" aria-label="Articles du panier">
              {items.map((item) => (
                <BasketItem
                  isUpdating={updatingId === getItemId(item) || updatingId === (item.productid || item.productId)}
                  item={item}
                  key={getItemId(item)}
                  onDecrease={handleDecrease}
                  onIncrease={handleIncrease}
                  onRemove={handleRemove}
                />
              ))}
            </section>

            <Card className="h-fit bg-white p-5">
              <Badge>Résumé</Badge>
              <div className="mt-5 space-y-3 border-b border-coffee-beans/10 pb-4 text-base font-semibold text-coffee-beans/70">
                <p>{items.length} article{items.length > 1 ? "s" : ""}</p>
                <p>Retrait selon les producteurs</p>
              </div>
              <div className="mt-4 flex items-end justify-between gap-3">
                <span className="font-extrabold text-coffee-beans">Total</span>
                <span className="text-2xl font-extrabold text-green">{formatPrice(basket.total)}</span>
              </div>
              <Button as="a" className="mt-5 w-full" href={isGuestCart ? "/connexion" : "/commande"} size="lg">
                {isGuestCart ? "Me connecter pour commander" : "Valider mon panier"}
              </Button>
            </Card>
          </div>
        ) : null}
      </Container>
    </div>
  );
}
