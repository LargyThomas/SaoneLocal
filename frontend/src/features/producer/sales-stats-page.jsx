import { useEffect, useMemo, useState } from "react";
import { fetchOrders } from "../../api/orders-api.js";
import { fetchProducerProfile } from "../../api/producer-space-api.js";
import Badge from "../../ui/badge.jsx";
import Card from "../../ui/card.jsx";
import Container from "../../ui/container.jsx";
import SectionTitle from "../../ui/section-title.jsx";
import { formatPrice } from "../../utils/format.js";
import { groupOrders, orderStatuses } from "./producer-data.js";
import { ProducerGuard } from "./producer-guard.jsx";

function StatCard({ label, value, tone = "green" }) {
  return (
    <Card className="bg-white p-5">
      <p className="text-sm font-extrabold uppercase text-coffee-beans/60">{label}</p>
      <p className={`mt-2 break-words text-3xl font-extrabold ${tone === "danger" ? "text-inferno" : "text-green"}`}>
        {value}
      </p>
    </Card>
  );
}

export function SalesStatsPage() {
  const [profileResult, setProfileResult] = useState(null);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadStats() {
      setIsLoading(true);
      setError("");

      try {
        const [profile, orderResult] = await Promise.all([
          fetchProducerProfile(),
          fetchOrders(),
        ]);
        setProfileResult(profile);
        setOrders(orderResult.result || []);
      } catch (requestError) {
        setError(requestError.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadStats();
  }, []);

  const groupedOrders = useMemo(() => Array.from(groupOrders(orders).values()), [orders]);
  const stats = profileResult?.resultStatistique || {};
  const products = profileResult?.resultProduct || [];
  const orderCountByStatus = groupedOrders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {});
  const averageOrder = groupedOrders.length > 0
    ? groupedOrders.reduce((total, order) => total + Number(order.total || 0), 0) / groupedOrders.length
    : 0;

  return (
    <div className="bg-soft-linen pb-12">
      <Container className="pt-4">
        <ProducerGuard>
          <SectionTitle
            eyebrow="Synthèse"
            title="Mes statistiques"
            description="Une vue simple des chiffres importants, sans tableau."
          />

          {error ? (
            <Card className="mt-5 border-inferno bg-white p-4 text-inferno">
              <p className="font-bold">{error}</p>
            </Card>
          ) : null}

          {isLoading ? (
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <Card className="bg-white p-5" key={index}>
                  <div className="h-8 animate-pulse rounded-card bg-coffee-beans/10" />
                  <div className="mt-4 h-12 animate-pulse rounded-card bg-vanilla-custard" />
                </Card>
              ))}
            </div>
          ) : null}

          {!isLoading ? (
            <>
              <section className="mt-6 grid gap-4 md:grid-cols-3">
                <StatCard label="Chiffre suivi" value={formatPrice(stats.statTotalCost || 0)} />
                <StatCard label="Produits vendus" value={stats.statTotalProduct || 0} />
                <StatCard label="Produits au catalogue" value={products.length} />
                <StatCard label="Commandes totales" value={groupedOrders.length} />
                <StatCard label="Panier moyen" value={formatPrice(averageOrder)} />
                <StatCard label="Commandes annulées" tone="danger" value={orderCountByStatus.a || 0} />
              </section>

              <section className="mt-8">
                <Card className="bg-white p-5">
                  <Badge>Répartition des statuts</Badge>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {Object.entries(orderStatuses).map(([status, meta]) => (
                      <div className="rounded-card bg-soft-linen p-4" key={status}>
                        <p className="text-sm font-extrabold text-coffee-beans/60">{meta.label}</p>
                        <p className="mt-1 text-2xl font-extrabold text-coffee-beans">{orderCountByStatus[status] || 0}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </section>
            </>
          ) : null}
        </ProducerGuard>
      </Container>
    </div>
  );
}
