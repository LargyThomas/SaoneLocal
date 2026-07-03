import { useEffect, useMemo, useState } from "react";
import { fetchOrders, updateOrderStatus } from "../../api/orders-api.js";
import Badge from "../../ui/badge.jsx";
import Button from "../../ui/button.jsx";
import Card from "../../ui/card.jsx";
import Container from "../../ui/container.jsx";
import SectionTitle from "../../ui/section-title.jsx";
import { formatPrice } from "../../utils/format.js";
import { formatDate, groupOrders, orderStatuses, statusActions } from "./producer-data.js";
import { ProducerGuard } from "./producer-guard.jsx";

export function OrdersManagerPage() {
  const [orders, setOrders] = useState([]);
  const [openOrderId, setOpenOrderId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const loadOrders = async () => {
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
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const groupedOrders = useMemo(() => Array.from(groupOrders(orders).values()), [orders]);

  const handleStatusChange = async (orderId, status) => {
    setIsUpdating(true);
    setError("");
    setMessage("");

    try {
      await updateOrderStatus(orderId, status);
      setMessage("Statut de commande modifié.");
      await loadOrders();
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="bg-soft-linen pb-12">
      <Container className="pt-4">
        <ProducerGuard>
          <SectionTitle
            eyebrow="Commandes producteur"
            title="Mes commandes"
            description="Faites avancer le statut d'une commande directement depuis votre mobile."
          />

          {error ? (
            <Card className="mt-5 border-inferno bg-white p-4 text-inferno">
              <p className="font-bold">{error}</p>
            </Card>
          ) : null}
          {message ? (
            <Card className="mt-5 border-green bg-white p-4 text-green">
              <p className="font-bold">{message}</p>
            </Card>
          ) : null}

          <section className="mt-6 grid gap-4">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, index) => (
                <Card className="bg-white p-5" key={index}>
                  <div className="h-7 animate-pulse rounded-card bg-coffee-beans/10" />
                  <div className="mt-4 h-16 animate-pulse rounded-card bg-vanilla-custard" />
                </Card>
              ))
            ) : null}

            {!isLoading && groupedOrders.map((order) => {
              const status = orderStatuses[order.status] || { label: order.status || "Statut inconnu", variant: "muted" };
              const isOpen = openOrderId === order.id;

              return (
                <Card className="overflow-hidden bg-white p-3 sm:p-4" key={order.id}>
                  <button
                    className="grid w-full cursor-pointer gap-2 rounded-card bg-green p-3 text-left text-white sm:grid-cols-[1fr_auto_auto] sm:items-center"
                    onClick={() => setOpenOrderId((current) => (current === order.id ? null : order.id))}
                    type="button"
                  >
                    <div>
                      <p className="font-extrabold">N°{order.id} - {order.clientName}</p>
                      <p className="text-sm font-semibold text-white/80">{formatDate(order.date)}</p>
                    </div>
                    <p className="font-extrabold">{formatPrice(order.total)}</p>
                    <span className="rounded-button bg-white px-3 py-1 text-center text-sm font-extrabold text-coffee-beans">
                      {isOpen ? "-" : "+"}
                    </span>
                  </button>

                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <Badge variant={status.variant}>{status.label}</Badge>
                    <span className="text-sm font-bold text-coffee-beans/60">{order.items.length} article(s)</span>
                  </div>

                  {isOpen ? (
                    <div className="mt-4 grid gap-4">
                      <div className="grid gap-2">
                        {order.items.map((item, index) => (
                          <div className="rounded-card bg-soft-linen p-3" key={`${order.id}-${item.productname}-${index}`}>
                            <p className="font-extrabold text-coffee-beans">{item.productname}</p>
                            <p className="text-sm font-semibold text-coffee-beans/70">
                              Quantité : {item.ordersitemsquantity} - {formatPrice(item.ordersitemstotalcost)}
                            </p>
                          </div>
                        ))}
                      </div>

                      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                        {statusActions.map((action) => (
                          <Button
                            disabled={isUpdating}
                            key={action.value}
                            onClick={() => handleStatusChange(order.id, action.value)}
                            size="sm"
                            variant={action.value === "a" ? "danger" : "secondary"}
                          >
                            {action.label}
                          </Button>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </Card>
              );
            })}

            {!isLoading && groupedOrders.length === 0 ? (
              <Card className="bg-white p-6 text-center">
                <h2 className="font-display text-2xl text-coffee-beans">Aucune commande</h2>
                <p className="mx-auto mt-3 max-w-md text-base leading-7 text-coffee-beans/70">
                  Les commandes client apparaîtront ici dès qu'elles contiennent vos produits.
                </p>
              </Card>
            ) : null}
          </section>
        </ProducerGuard>
      </Container>
    </div>
  );
}
