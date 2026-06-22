import { useEffect, useState } from "react";
import Button from "../../ui/button.jsx";
import Container from "../../ui/container.jsx";
import ProducerCard from "../../ui/producer-card.jsx";
import Badge from "../../ui/badge.jsx";
import { fetchProducers } from "../../api/producers-api.js";

export function ProducerPage() {
  const [producers, setProducers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProducers() {
      setIsLoading(true);
      setError("");

      try {
        const result = await fetchProducers();
        setProducers(result);
      } catch (requestError) {
        setProducers([]);
        setError(requestError.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadProducers();
  }, []);

  return (
    <div className="bg-soft-linen pb-12">
      <Container className="pb-11 pt-4">
        <section className="mb-6 rounded-card bg-white p-5 shadow-sm sm:p-7">
          <Badge>Producteurs</Badge>
          <h1 className="mt-4 font-display text-3xl leading-tight text-coffee-beans sm:text-4xl">
            Des savoir-faire près de chez vous
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-coffee-beans/75">
            Des producteurs et artisans locaux mis en avant avec une présentation claire et humaine.
          </p>
        </section>

        <div className="mt-4 h-px w-full bg-gradient-to-r from-coffee-beans/10 via-muted-olive/60 to-transparent" />

        {error ? (
          <div className="mt-6 rounded-card border border-inferno bg-white px-4 py-5 text-base text-inferno">
            <p className="font-display text-xl">Impossible de charger les producteurs</p>
            <p className="mt-2 font-bold">{error}</p>
          </div>
        ) : null}

        {isLoading ? (
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div className="rounded-card bg-white p-3 shadow-sm" key={index}>
                <div className="aspect-[4/3] animate-pulse rounded-photo bg-vanilla-custard" />
                <div className="mt-4 h-5 w-28 animate-pulse rounded-card bg-golden-glow/70" />
                <div className="mt-4 h-6 w-3/4 animate-pulse rounded-card bg-coffee-beans/10" />
                <div className="mt-3 h-4 w-full animate-pulse rounded-card bg-coffee-beans/10" />
              </div>
            ))}
          </div>
        ) : null}

        {!isLoading && !error && producers.length === 0 ? (
          <div className="mt-6 rounded-card border border-coffee-beans/10 bg-white px-4 py-8 text-center text-coffee-beans">
            <p className="font-display text-2xl">Aucun producteur</p>
            <p className="mx-auto mt-3 max-w-md text-base leading-7 text-coffee-beans/75">
              Aucun producteur actif n'est disponible pour le moment.
            </p>
          </div>
        ) : null}

        {!isLoading && !error && producers.length > 0 ? (
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {producers.map((producer) => (
              <ProducerCard key={producer.producerid} producer={producer} />
            ))}
          </div>
        ) : null}
      </Container>

      <Container>
        <section className="grid gap-5 rounded-card border border-coffee-beans/10 bg-gradient-to-r from-golden-glow to-mustard p-6 text-coffee-beans shadow-[0_18px_42px_rgba(36,17,5,0.08)] sm:grid-cols-[1fr_auto] sm:items-center sm:p-8">
          <div>
            <h2 className="text-2xl font-extrabold leading-tight">Je découvre les saveurs locales</h2>
            <p className="mt-2 max-w-2xl text-base leading-7 text-coffee-beans/75">
              Explorez les produits de nos producteurs répertoriés dans notre catalogue.
            </p>
          </div>
          <Button as="a" className="w-full sm:w-auto" href="/catalogue" size="lg">
            Voir le catalogue
          </Button>
        </section>
      </Container>
    </div>
  );
}
