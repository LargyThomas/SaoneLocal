import { useEffect, useState } from "react";
import { fetchFavorites, removeFavorite } from "../../api/favorites-api.js";
import Badge from "../../ui/badge.jsx";
import Button from "../../ui/button.jsx";
import Card from "../../ui/card.jsx";
import Container from "../../ui/container.jsx";
import ProductCard from "../../ui/product-card.jsx";

export function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [removingId, setRemovingId] = useState(null);

  const loadFavorites = async () => {
    setIsLoading(true);
    setError("");

    try {
      const result = await fetchFavorites();
      setFavorites(result.favorites || []);
    } catch (requestError) {
      setFavorites([]);
      setError(requestError.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  const handleRemove = async (productId) => {
    setRemovingId(productId);
    setError("");

    try {
      await removeFavorite(productId);
      setFavorites((current) => current.filter((item) => String(item.productid) !== String(productId)));
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setRemovingId(null);
    }
  };

  return (
    <div className="bg-soft-linen pb-12">
      <Container className="pt-4">
        <section className="mb-6 rounded-card bg-white p-5 shadow-sm sm:p-7">
          <Badge>Favoris</Badge>
          <h1 className="mt-4 font-display text-3xl leading-tight text-coffee-beans sm:text-4xl">Mes produits favoris</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-coffee-beans/75">
            Gardez sous la main les produits locaux que vous souhaitez retrouver rapidement.
          </p>
        </section>

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
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <Card className="bg-white p-3" key={index}>
                <div className="aspect-[4/3] animate-pulse rounded-photo bg-vanilla-custard" />
                <div className="mt-4 h-5 w-32 animate-pulse rounded-card bg-coffee-beans/10" />
                <div className="mt-4 h-10 animate-pulse rounded-button bg-muted-olive/30" />
              </Card>
            ))}
          </div>
        ) : null}

        {!isLoading && !error && favorites.length === 0 ? (
          <Card className="bg-white p-6 text-center">
            <h2 className="font-display text-2xl text-coffee-beans">Aucun favori</h2>
            <p className="mx-auto mt-3 max-w-md text-base leading-7 text-coffee-beans/70">
              Ajoutez des produits en favoris depuis leur fiche pour les retrouver ici.
            </p>
            <Button as="a" className="mt-5 w-full sm:w-auto" href="/catalogue">
              Découvrir les produits
            </Button>
          </Card>
        ) : null}

        {!isLoading && favorites.length > 0 ? (
          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-label="Produits favoris">
            {favorites.map((product) => (
              <div className="grid gap-3" key={product.productid}>
                <ProductCard product={product} />
                <Button
                  disabled={removingId === product.productid}
                  onClick={() => handleRemove(product.productid)}
                  variant="danger"
                >
                  {removingId === product.productid ? "Retrait..." : "Retirer des favoris"}
                </Button>
              </div>
            ))}
          </section>
        ) : null}
      </Container>
    </div>
  );
}
