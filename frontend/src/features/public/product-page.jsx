import { useEffect, useState } from "react";
import { addBasketItem } from "../../api/basket-api.js";
import { fetchCatalog, fetchProduct } from "../../api/catalog-api.js";
import { addFavorite } from "../../api/favorites-api.js";
import { getAuthToken } from "../../api/api.js";
import Badge from "../../ui/badge.jsx";
import Button from "../../ui/button.jsx";
import Card from "../../ui/card.jsx";
import Container from "../../ui/container.jsx";
import ProductCard from "../../ui/product-card.jsx";
import { formatPrice } from "../../utils/format.js";
import { addGuestCartItem } from "../../utils/guest-cart.js";

function getTaxExcludedPrice(value) {
  const price = Number(value);

  if (Number.isNaN(price)) {
    return "";
  }

  return formatPrice(price / 1.2);
}

function CartIcon() {
  return (
    <svg aria-hidden="true" className="h-7 w-7" fill="none" viewBox="0 0 24 24">
      <path
        d="M4 5h2l2 10h9l2-7H7m3 12h.01M17 20h.01M14 4v6m-3-3h6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.4"
      />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
      <path
        d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

export function ProductPage({ params = {} }) {
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [cartMessage, setCartMessage] = useState("");
  const [favoriteMessage, setFavoriteMessage] = useState("");
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isAddingFavorite, setIsAddingFavorite] = useState(false);
  const productId = params.id;

  useEffect(() => {
    async function loadProduct() {
      setIsLoading(true);
      setError("");
      setRelatedProducts([]);

      try {
        const result = await fetchProduct(productId);
        setProduct(result);

        if (!result.categoryid) {
          return;
        }

        const relatedResult = await fetchCatalog({ category: String(result.categoryid) }).catch(() => null);
        const products = relatedResult?.products || [];
        const sameCategoryProducts = products.filter((item) => String(item.productid) !== String(result.productid));

        setRelatedProducts(sameCategoryProducts.slice(0, 3));
      } catch (requestError) {
        setProduct(null);
        setError(requestError.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadProduct();
  }, [productId]);

  const addToCart = async () => {
    if (!product?.productid) {
      return;
    }

    setIsAddingToCart(true);
    setCartMessage("");

    try {
      if (getAuthToken()) {
        await addBasketItem(product.productid, 1);
        setCartMessage("Produit ajouté au panier.");
      } else {
        addGuestCartItem(product, 1);
        setCartMessage("Produit ajouté au panier invité. Il sera récupéré après connexion.");
      }
    } catch (requestError) {
      setCartMessage(requestError.message);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleAddFavorite = async () => {
    if (!product?.productid) {
      return;
    }

    setIsAddingFavorite(true);
    setFavoriteMessage("");

    try {
      await addFavorite(product.productid);
      setFavoriteMessage("Produit ajouté aux favoris.");
    } catch (requestError) {
      setFavoriteMessage(requestError.message);
    } finally {
      setIsAddingFavorite(false);
    }
  };

  const productName = product?.productname || "Produit local";
  const formattedPrice = formatPrice(product?.productprice);
  const formattedTaxExcludedPrice = getTaxExcludedPrice(product?.productprice);
  const producerLabel = product?.producername || product?.producerdesc || `Producteur ${product?.producerid || "local"}`;
  const isWineProduct = product?.categoryname?.toLowerCase().includes("vin");

  return (
    <div className="bg-soft-linen pb-12">
      <Container className="pt-4">
        <Button as="a" href="/catalogue" variant="ghost">
          ← Retour au catalogue
        </Button>

        {isLoading ? (
          <Card className="mt-4 grid gap-6 bg-[#fffdf7] p-4 sm:p-6 lg:grid-cols-[minmax(0,1fr)_420px]">
            <div className="h-72 animate-pulse rounded-photo bg-vanilla-custard sm:h-[460px]" />
            <div className="space-y-4">
              <div className="h-8 w-32 animate-pulse rounded-card bg-golden-glow/70" />
              <div className="h-12 w-4/5 animate-pulse rounded-card bg-coffee-beans/10" />
              <div className="h-7 w-28 animate-pulse rounded-card bg-green/20" />
              <div className="h-28 animate-pulse rounded-card bg-coffee-beans/10" />
            </div>
          </Card>
        ) : null}

        {!isLoading && error ? (
          <Card className="mt-4 border-inferno bg-white p-6 text-inferno">
            <p className="font-display text-2xl">Produit introuvable</p>
            <p className="mt-2 font-bold">{error}</p>
            <Button as="a" className="mt-5" href="/catalogue" variant="secondary">
              Revenir au catalogue
            </Button>
          </Card>
        ) : null}

        {!isLoading && product ? (
          <>
            <section className="mt-4 grid gap-6 rounded-card border border-coffee-beans/10 bg-[#fffdf7] p-4 shadow-[0_18px_48px_rgba(36,17,5,0.07)] sm:p-6 lg:grid-cols-[minmax(0,1fr)_420px]">
              <div className="flex min-h-72 items-center justify-center overflow-hidden rounded-photo bg-white p-5 shadow-inner sm:min-h-[460px]">
                {product.productpicture ? (
                  <img
                    alt={productName}
                    className="max-h-[460px] w-full object-contain"
                    decoding="async"
                    fetchPriority="high"
                    src={product.productpicture}
                  />
                ) : (
                  <span className="text-base font-extrabold text-brown-bark">Image à venir</span>
                )}
              </div>

              <div className="flex flex-col">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge>{product.categoryname || "Produit local"}</Badge>
                    {product.subcategoryname ? (
                      <Badge className="bg-vanilla-custard">{product.subcategoryname}</Badge>
                    ) : null}
                  </div>

                  <h1 className="mt-5 break-words font-display text-4xl leading-tight text-coffee-beans sm:text-5xl">
                    {productName}
                  </h1>

                  {product.productdesc ? (
                    <p className="mt-5 text-lg leading-8 text-coffee-beans/75">{product.productdesc}</p>
                  ) : (
                    <p className="mt-5 text-lg leading-8 text-coffee-beans/75">
                      Ce producteur n'a pas encore ajouté de description pour ce produit.
                    </p>
                  )}
                </div>

                <Card className="mt-6 bg-soft-linen p-4">
                  <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-start">
                    <div>
                      <p className="text-xs font-extrabold uppercase text-coffee-beans/60">Prix</p>
                      <div className="mt-2 flex flex-wrap items-end gap-x-5 gap-y-2">
                        {formattedPrice ? (
                          <p className="text-3xl font-extrabold text-green">{formattedPrice}</p>
                        ) : null}
                        {formattedTaxExcludedPrice ? (
                          <p className="pb-1 text-sm font-bold text-coffee-beans/60">
                            {formattedTaxExcludedPrice} HT
                          </p>
                        ) : null}
                      </div>
                      <p className="mt-2 text-sm font-semibold text-coffee-beans/65">Pour 1 article</p>
                    </div>

                    <button
                      aria-label="Ajouter aux favoris"
                      className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-card bg-golden-glow text-coffee-beans shadow-sm transition hover:bg-mustard disabled:cursor-not-allowed disabled:opacity-70"
                      disabled={isAddingFavorite}
                      onClick={handleAddFavorite}
                      type="button"
                    >
                      <HeartIcon />
                    </button>
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto]">
                    <Button className="w-full" disabled={isAddingToCart} onClick={addToCart}>
                      <CartIcon />
                      {isAddingToCart ? "Ajout..." : "Ajouter au panier"}
                    </Button>
                    <Button as="a" className="w-full sm:w-auto" href="#infos" variant="secondary">
                      Plus d'information
                    </Button>
                  </div>

                  {cartMessage ? (
                    <p className="mt-3 rounded-card bg-green px-3 py-2 text-center text-sm font-bold text-white" role="status">
                      {cartMessage}
                    </p>
                  ) : null}
                  {favoriteMessage ? (
                    <p className="mt-3 rounded-card bg-golden-glow px-3 py-2 text-center text-sm font-bold text-coffee-beans" role="status">
                      {favoriteMessage}
                    </p>
                  ) : null}
                </Card>

                <Card className="mt-6 bg-white p-4">
                  <p className="text-xs font-extrabold uppercase text-coffee-beans/60">Producteur</p>
                  <p className="mt-1 text-lg font-extrabold text-coffee-beans">{producerLabel}</p>
                  <Button as="a" className="mt-4 w-full sm:w-auto" href={product.producerid ? `/producteurs/${product.producerid}` : "/producteurs"} variant="ghost">
                    Voir la fiche producteur
                  </Button>
                </Card>

                <div className="mt-6 grid gap-3 rounded-card border border-coffee-beans/10 bg-white p-4 text-sm font-semibold text-coffee-beans/70 sm:grid-cols-3">
                  <span>Produit local</span>
                  <span>Retrait selon producteur</span>
                  <span>Paiement sécurisé</span>
                </div>

                {isWineProduct ? (
                  <div className="mt-6 rounded-card border border-inferno/30 bg-inferno px-4 py-3 text-center text-base font-black uppercase text-white shadow-sm">
                    Buvez avec modération
                  </div>
                ) : null}
              </div>
            </section>

            <section className="mt-6 space-y-6" id="infos">
              <Card className="bg-[#fffdf7] p-5 sm:p-6">
                <Badge>Description</Badge>
                <div className="mt-5 space-y-5 text-base leading-7 text-coffee-beans/75">
                  <p>
                    {product.productdesc || "La description détaillée sera complétée prochainement par le producteur."}
                  </p>
                  <p>
                    Retrouvez ici la carte produit complète : origine, usage conseillé, détails du producteur et
                    informations utiles avant l'achat.
                  </p>
                </div>
              </Card>

              <Card className="bg-[#fffdf7] p-5 sm:p-6">
                <Badge>Mariez-moi avec</Badge>
                <div className="mt-5 grid gap-4 text-base font-semibold leading-7 text-coffee-beans/75 md:grid-cols-3">
                  <p className="rounded-card bg-soft-linen p-4">Un autre produit local de la même catégorie.</p>
                  <p className="rounded-card bg-soft-linen p-4">Une préparation simple pour garder le goût du produit au centre.</p>
                  <p className="rounded-card bg-soft-linen p-4">Un retrait direct auprès du producteur quand il est disponible.</p>
                </div>
              </Card>
            </section>

            {relatedProducts.length > 0 ? (
              <section className="mt-6">
                <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <Badge>Produits de la même gamme</Badge>
                    <h2 className="mt-3 font-display text-3xl leading-tight text-coffee-beans">À découvrir aussi</h2>
                  </div>
                  <Button as="a" href="/catalogue" variant="ghost">
                    Voir le catalogue
                  </Button>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {relatedProducts.map((relatedProduct) => (
                    <ProductCard key={relatedProduct.productid} product={relatedProduct} />
                  ))}
                </div>
              </section>
            ) : null}
          </>
        ) : null}
      </Container>
    </div>
  );
}
