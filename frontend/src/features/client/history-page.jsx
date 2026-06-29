import { useEffect, useMemo, useState } from "react";
import { fetchOrders } from "../../api/orders-api.js";
import Badge from "../../ui/badge.jsx";
import Button from "../../ui/button.jsx";
import Card from "../../ui/card.jsx";
import Container from "../../ui/container.jsx";
import { formatPrice } from "../../utils/format.js";

const statusLabels = {
  a: { label: "Annulée", variant: "danger" },
  c: { label: "Confirmée", variant: "success" },
  n: { label: "Nouvelle", variant: "warning" },
  p: { label: "Préparée", variant: "muted" },
  r: { label: "Retirée", variant: "success" },
};

function groupOrders(rows) {
  return rows.reduce((orders, row) => {
    const orderId = row.ordersid;
    const existingOrder = orders.get(orderId) || {
      date: row.ordersdate,
      id: orderId,
      items: [],
      status: row.ordersstatus,
      total: row.orderstotalcost,
    };

    existingOrder.items.push(row);
    orders.set(orderId, existingOrder);
    return orders;
  }, new Map());
}

function formatDate(value) {
  if (!value) {
    return "Date à venir";
  }

  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export function HistoryPage() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadOrders() {
      setIsLoading(true);
      setError("");

      try {
        const result = await fetchOrders();
        setOrders(result.result || []);
      } catch (requestError) {
        setOrders([]);
        setError(requestError.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadOrders();
  }, []);

  const groupedOrders = useMemo(() => Array.from(groupOrders(orders).values()), [orders]);

  return (
    <div className="bg-soft-linen pb-12">
      <Container className="pt-4">
        <section className="mb-6 rounded-card bg-white p-5 shadow-sm sm:p-7">
          <Badge>Historique</Badge>
          <h1 className="mt-4 font-display text-3xl leading-tight text-coffee-beans sm:text-4xl">Mes commandes</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-coffee-beans/75">
            Suivez vos commandes passées et leur statut.
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
          <div className="grid gap-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <Card className="bg-white p-5" key={index}>
                <div className="h-6 w-40 animate-pulse rounded-card bg-coffee-beans/10" />
                <div className="mt-4 h-16 animate-pulse rounded-card bg-vanilla-custard" />
              </Card>
            ))}
          </div>
        ) : null}

        {!isLoading && !error && groupedOrders.length === 0 ? (
          <Card className="bg-white p-6 text-center">
            <h2 className="font-display text-2xl text-coffee-beans">Aucune commande</h2>
            <p className="mx-auto mt-3 max-w-md text-base leading-7 text-coffee-beans/70">
              Vos prochaines commandes apparaîtront ici après validation du panier.
            </p>
            <Button as="a" className="mt-5 w-full sm:w-auto" href="/catalogue">
              Faire mes achats
            </Button>
          </Card>
        ) : null}

        {!isLoading && groupedOrders.length > 0 ? (
          <section className="grid gap-4" aria-label="Historique des commandes">
            {groupedOrders.map((order) => {
              const status = statusLabels[order.status] || { label: order.status || "Statut inconnu", variant: "muted" };

              return (
                <Card className="bg-white p-5" key={order.id}>
                  <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-start">
                    <div>
                      <Badge variant={status.variant}>Commande {status.label}</Badge>
                      <h2 className="mt-3 text-xl font-extrabold text-coffee-beans">Commande n°{order.id}</h2>
                      <p className="mt-1 text-sm font-semibold text-coffee-beans/65">{formatDate(order.date)}</p>
                    </div>
                    <p className="text-2xl font-extrabold text-green">{formatPrice(order.total)}</p>
                  </div>

                  <div className="mt-5 grid gap-3">
                    {order.items.map((item, index) => (
                      <div className="rounded-card bg-soft-linen p-3" key={`${order.id}-${item.productname}-${index}`}>
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="font-extrabold text-coffee-beans">{item.productname}</p>
                            <p className="text-sm font-semibold text-coffee-beans/65">
                              Quantité : {item.ordersitemsquantity}
                            </p>
                          </div>
                          <p className="shrink-0 font-extrabold text-coffee-beans">
                            {formatPrice(item.ordersitemstotalcost)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              );
            })}
          </section>
        ) : null}
      </Container>
    </div>
  );
}
