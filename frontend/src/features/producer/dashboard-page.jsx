import { useEffect, useMemo, useState } from "react";
import { fetchProducerProfile } from "../../api/producer-space-api.js";
import Badge from "../../ui/badge.jsx";
import Button from "../../ui/button.jsx";
import Card from "../../ui/card.jsx";
import Container from "../../ui/container.jsx";
import SectionTitle from "../../ui/section-title.jsx";
import { formatPrice } from "../../utils/format.js";
import { formatDate, getProducerName, groupOrders, orderStatuses } from "./producer-data.js";
import { ProducerGuard } from "./producer-guard.jsx";

export function DashboardPage() {
  const [profile, setProfile] = useState(null);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDashboard() {
      setIsLoading(true);
      setError("");

      try {
        const result = await fetchProducerProfile();
        setProfile(result.resultUser?.[0] || null);
        setProducts(result.resultProduct || []);
        setOrders(result.resultOrder || []);
        setStats(result.resultStatistique || {});
      } catch (requestError) {
        setError(requestError.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadDashboard();
  }, []);

  const groupedOrders = useMemo(() => Array.from(groupOrders(orders).values()), [orders]);
  const producerName = getProducerName(profile);
  const pendingOrders = groupedOrders.filter((order) => order.status === "n" || order.status === "e");

  return (
    <div className="bg-soft-linen pb-12">
      <Container className="pt-4">
        <ProducerGuard>
          <section className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-start">
            <Card className="bg-white p-5">
              <Badge>Version producteur</Badge>
              <h1 className="mt-4 font-display text-3xl leading-tight text-coffee-beans">
                Bienvenue {producerName}
              </h1>
              <p className="mt-3 text-base leading-7 text-coffee-beans/70">
                Pilotez votre catalogue, vos commandes et votre synthèse depuis un espace pensé mobile-first.
              </p>
            </Card>
            <Button as="a" className="w-full sm:w-auto" href="/producteur/catalogue" size="lg">
              Ajouter un produit
            </Button>
          </section>

          {error ? (
            <Card className="mt-5 border-inferno bg-white p-4 text-inferno">
              <p className="font-bold">{error}</p>
            </Card>
          ) : null}

          {!isLoading && profile ? (
            <Card className="mt-5 bg-white p-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm font-extrabold uppercase text-coffee-beans/60">Date d'inscription</p>
                  <p className="mt-1 text-lg font-bold text-coffee-beans">{formatDate(profile.producercreationdate)}</p>
                </div>
                <div>
                  <p className="text-sm font-extrabold uppercase text-coffee-beans/60">Dernière connexion</p>
                  <p className="mt-1 text-lg font-bold text-coffee-beans">{formatDate(profile.producerlastconnexion)}</p>
                </div>
              </div>
            </Card>
          ) : null}

          {isLoading ? (
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <Card className="bg-white p-5" key={index}>
                  <div className="h-7 animate-pulse rounded-card bg-coffee-beans/10" />
                  <div className="mt-4 h-28 animate-pulse rounded-card bg-vanilla-custard" />
                </Card>
              ))}
            </div>
          ) : null}

          {!isLoading ? (
            <>
              <section className="mt-6 grid gap-4 md:grid-cols-3">
                <Card className="bg-white p-5">
                  <p className="text-sm font-extrabold uppercase text-coffee-beans/60">Produits actifs</p>
                  <p className="mt-2 text-3xl font-extrabold text-green">{products.length}</p>
                </Card>
                <Card className="bg-white p-5">
                  <p className="text-sm font-extrabold uppercase text-coffee-beans/60">Commandes en attente</p>
                  <p className="mt-2 text-3xl font-extrabold text-green">{pendingOrders.length}</p>
                </Card>
                <Card className="bg-white p-5">
                  <p className="text-sm font-extrabold uppercase text-coffee-beans/60">Chiffre suivi</p>
                  <p className="mt-2 text-3xl font-extrabold text-green">{formatPrice(stats.statTotalCost || 0)}</p>
                </Card>
              </section>

              <section className="mt-8">
                <SectionTitle eyebrow="Mon catalogue" title="Produits à gérer" />
                <div className="mt-4 grid gap-3">
                  {products.slice(0, 3).map((product) => (
                    <Card className="grid gap-3 bg-white p-3 sm:grid-cols-[72px_1fr_auto] sm:items-center" key={product.productid}>
                      <div className="flex h-20 items-center justify-center rounded-photo bg-vanilla-custard text-xs font-bold text-brown-bark">
                        {product.productpicture ? (
                          <img alt="" className="h-full w-full rounded-photo object-cover" src={product.productpicture} />
                        ) : "Produit"}
                      </div>
                      <div>
                        <h2 className="font-extrabold text-coffee-beans">{product.productname}</h2>
                        <p className="text-sm font-semibold text-coffee-beans/65">{formatPrice(product.productprice)}</p>
                      </div>
                      <Button as="a" href="/producteur/catalogue" size="sm" variant="secondary">
                        Gérer
                      </Button>
                    </Card>
                  ))}
                  {products.length === 0 ? (
                    <Card className="bg-white p-5 text-center font-bold text-coffee-beans">Aucun produit pour le moment.</Card>
                  ) : null}
                </div>
              </section>

              <section className="mt-8">
                <SectionTitle eyebrow="Mes commandes" title="Dernières demandes" />
                <div className="mt-4 grid gap-3">
                  {groupedOrders.slice(0, 3).map((order) => {
                    const status = orderStatuses[order.status] || { label: "Statut inconnu", variant: "muted" };

                    return (
                      <Card className="grid gap-3 bg-green p-3 text-white sm:grid-cols-[1fr_auto_auto] sm:items-center" key={order.id}>
                        <div>
                          <p className="font-extrabold">N°{order.id} - {order.clientName}</p>
                          <p className="text-sm font-semibold text-white/80">{formatDate(order.date)}</p>
                        </div>
                        <Badge variant={status.variant}>{status.label}</Badge>
                        <Button as="a" href="/producteur/commandes" size="sm" variant="secondary">
                          Voir
                        </Button>
                      </Card>
                    );
                  })}
                  {groupedOrders.length === 0 ? (
                    <Card className="bg-white p-5 text-center font-bold text-coffee-beans">Aucune commande pour le moment.</Card>
                  ) : null}
                </div>
              </section>

              <section className="mt-8 grid gap-3 sm:grid-cols-3">
                <Button as="a" href="/producteur/catalogue" variant="secondary">Catalogue</Button>
                <Button as="a" href="/producteur/commandes" variant="secondary">Commandes</Button>
                <Button as="a" href="/producteur/statistiques" variant="secondary">Synthèse</Button>
              </section>
            </>
          ) : null}
        </ProducerGuard>
      </Container>
    </div>
  );
}
