import { useEffect, useState } from "react";
import { fetchProducer } from "../../api/producers-api.js";
import Badge from "../../ui/badge.jsx";
import Button from "../../ui/button.jsx";
import Card from "../../ui/card.jsx";
import Container from "../../ui/container.jsx";
import ProductCard from "../../ui/product-card.jsx";
import SectionTitle from "../../ui/section-title.jsx";

function getProducerName(producer) {
  return `${producer?.usersfirstname || ""} ${producer?.userslastname || ""}`.trim() || producer?.usersemail || "Producteur local";
}

function formatEventDate(value) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Date à venir";
  }

  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(date);
}

export function ProducerDetailPage({ params = {} }) {
  const producerId = params.id;
  const [producer, setProducer] = useState(null);
  const [products, setProducts] = useState([]);
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProducer() {
      if (!producerId) {
        setProducer(null);
        setProducts([]);
        setEvents([]);
        setError("Producteur introuvable.");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError("");

      try {
        const result = await fetchProducer(producerId);
        setProducer(result.resultProducer?.[0] || null);
        setProducts(result.resultProduct || []);
        setEvents(result.resultEvent || []);
      } catch (requestError) {
        setProducer(null);
        setProducts([]);
        setEvents([]);
        setError(requestError.message || "Impossible de charger ce producteur.");
      } finally {
        setIsLoading(false);
      }
    }

    loadProducer();
  }, [producerId]);

  const producerName = getProducerName(producer);

  return (
    <div className="bg-soft-linen pb-12">
      <Container className="pt-4">
        {error ? (
          <Card className="mb-4 border-inferno bg-white p-4 text-inferno">
            <p className="font-bold">{error}</p>
          </Card>
        ) : null}

        {isLoading ? (
          <Card className="bg-white p-5">
            <div className="h-64 animate-pulse rounded-photo bg-vanilla-custard" />
            <div className="mt-5 h-8 w-2/3 animate-pulse rounded-card bg-coffee-beans/10" />
            <div className="mt-4 h-20 animate-pulse rounded-card bg-coffee-beans/10" />
          </Card>
        ) : null}

        {!isLoading && !error && !producer ? (
          <Card className="bg-white p-6 text-center">
            <h1 className="font-display text-3xl text-coffee-beans">Producteur introuvable</h1>
            <p className="mt-3 text-base leading-7 text-coffee-beans/70">
              Ce producteur n'est pas disponible dans les données chargées depuis l'API.
            </p>
            <Button as="a" className="mt-5 w-full sm:w-auto" href="/producteurs">
              Retour aux producteurs
            </Button>
          </Card>
        ) : null}

        {!isLoading && producer ? (
          <section className="relative overflow-hidden rounded-card border border-coffee-beans/10 bg-[#fffdf7] p-4 shadow-[0_18px_48px_rgba(36,17,5,0.07)] sm:p-6 md:p-8">
            <div className="grid gap-5 md:grid-cols-[0.9fr_1.1fr] md:items-center">
              <div className="flex h-64 items-center justify-center overflow-hidden rounded-photo bg-vanilla-custard sm:h-80 md:h-[420px]">
                {producer.usersprofilpicture ? (
                  <img
                    alt={`Portrait de ${producerName}`}
                    className="h-full w-full object-cover"
                    decoding="async"
                    fetchPriority="high"
                    src={producer.usersprofilpicture}
                  />
                ) : (
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white text-3xl font-extrabold text-forest-green shadow-md">
                    SL
                  </div>
                )}
              </div>

              <Card className="bg-soft-linen p-5 shadow-[0_14px_34px_rgba(36,17,5,0.06)] md:p-7">
                <Badge>Producteur local</Badge>
                <h1 className="mt-4 break-words font-display text-3xl leading-tight text-coffee-beans sm:text-4xl lg:text-5xl">
                  {producerName}
                </h1>
                <p className="mt-4 text-base font-semibold leading-7 text-coffee-beans/75">
                  {producer.producerdesc || "Description producteur à compléter."}
                </p>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-card border border-coffee-beans/10 bg-white p-4">
                    <p className="text-xs font-extrabold uppercase text-coffee-beans/60">Localisation</p>
                    <p className="mt-1 font-extrabold text-coffee-beans">
                      {producer.producerlocalisation || "Localisation à venir"}
                    </p>
                  </div>
                  <div className="rounded-card border border-coffee-beans/10 bg-white p-4">
                    <p className="text-xs font-extrabold uppercase text-coffee-beans/60">Statut</p>
                    <p className="mt-1 font-extrabold text-coffee-beans">
                      {producer.producerstatus === "active" ? "Actif" : producer.producerstatus || "À confirmer"}
                    </p>
                  </div>
                  <div className="rounded-card border border-coffee-beans/10 bg-white p-4 sm:col-span-2">
                    <p className="text-xs font-extrabold uppercase text-coffee-beans/60">SIRET</p>
                    <p className="mt-1 font-extrabold text-coffee-beans">
                      {producer.producersiretnum || "Non renseigné"}
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid gap-3 sm:flex">
                  <Button as="a" className="w-full sm:w-auto" href="#produits" size="lg">
                    Voir ses produits
                  </Button>
                  <Button as="a" className="w-full sm:w-auto" href="/calendrier" size="lg" variant="secondary">
                    Ses événements
                  </Button>
                </div>
              </Card>
            </div>
          </section>
        ) : null}
      </Container>

      {!isLoading && producer ? (
        <>
          <Container className="py-10" id="produits">
            <SectionTitle
              eyebrow="Ses produits"
              title={`Les produits de ${producerName}`}
              description="Les produits ci-dessous viennent directement des données associées à ce producteur."
            />
            <div className="mt-4 h-px w-full bg-gradient-to-r from-coffee-beans/10 via-golden-glow/70 to-transparent" />

            {products.length === 0 ? (
              <Card className="mt-6 bg-white p-6 text-center">
                <h2 className="font-display text-2xl text-coffee-beans">Aucun produit publié</h2>
                <p className="mx-auto mt-3 max-w-md text-base leading-7 text-coffee-beans/70">
                  Les produits de ce producteur apparaîtront ici dès qu'ils seront ajoutés au seeder ou à l'API.
                </p>
              </Card>
            ) : (
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                  <ProductCard key={product.productid || product.productId} product={{ ...product, producername: producerName }} />
                ))}
              </div>
            )}
          </Container>

          <Container>
            <section className="grid gap-5 rounded-card border border-coffee-beans/10 bg-gradient-to-r from-golden-glow to-mustard p-6 text-coffee-beans shadow-[0_18px_42px_rgba(36,17,5,0.08)] sm:grid-cols-[1fr_auto] sm:items-center sm:p-8">
              <div>
                <h2 className="text-2xl font-extrabold leading-tight">
                  Où rencontrer {producerName} ?
                </h2>
                <p className="mt-2 max-w-2xl text-base leading-7 text-coffee-beans/75">
                  {events.length > 0
                    ? "Retrouvez ses prochains marchés, événements locaux et rendez-vous de producteurs."
                    : "Aucun événement n'est associé à ce producteur pour le moment."}
                </p>

                {events.length > 0 ? (
                  <ul className="mt-4 grid gap-2 text-sm font-semibold text-coffee-beans/75">
                    {events.slice(0, 3).map((event) => (
                      <li className="rounded-card bg-white/70 px-3 py-2" key={`${event.eventsname}-${event.eventsdate}`}>
                        {event.eventsname || "Événement"} - {formatEventDate(event.eventsdate)}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>

              <Button as="a" className="w-full sm:w-auto" href="/calendrier" size="lg">
                Voir le calendrier
              </Button>
            </section>
          </Container>
        </>
      ) : null}
    </div>
  );
}
