import { useEffect, useState } from "react";
import { fetchCatalog } from "../../api/catalog-api.js";
import { fetchProducers } from "../../api/producers-api.js";
import Badge from "../../ui/badge.jsx";
import Button from "../../ui/button.jsx";
import Card from "../../ui/card.jsx";
import Container from "../../ui/container.jsx";
import ProducerCard from "../../ui/producer-card.jsx";
import ProductCard from "../../ui/product-card.jsx";
import SectionTitle from "../../ui/section-title.jsx";
import { useSeo } from "../../hooks/use-seo.js";

const advantages = [
  {
    title: "Produits locaux",
    text: "Des produits frais, de saison, proposés par des producteurs proches.",
    icon: "Circuit court",
  },
  {
    title: "Événements",
    text: "Marchés, rencontres et rendez-vous locaux pour suivre la vie du territoire.",
    icon: "Agenda local",
  },
  {
    title: "Nos valeurs",
    text: "Circuits courts, relation directe et meilleure visibilité pour les producteurs.",
    icon: "Lien direct",
  },
];

function AdvantageCard({ title, text, icon, index }) {
  return (
    <Card className="group h-full bg-[#fffdf7] p-5 shadow-[0_10px_26px_rgba(36,17,5,0.05)] transition duration-200 hover:-translate-y-1 hover:border-green/20 hover:shadow-[0_16px_34px_rgba(36,17,5,0.08)]">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-card bg-golden-glow text-sm font-extrabold text-coffee-beans shadow-sm transition duration-200 group-hover:bg-mustard">
          0{index + 1}
        </div>
        <span className="rounded-card border border-coffee-beans/10 bg-soft-linen px-3 py-1 text-xs font-extrabold uppercase text-coffee-beans/70">
          {icon}
        </span>
      </div>
      <h3 className="mt-4 text-lg font-extrabold text-coffee-beans">{title}</h3>
      <p className="mt-2 text-base leading-7 text-coffee-beans/70">{text}</p>
    </Card>
  );
}

function LoadingCards({ type }) {
  return (
    <div className="mt-6 grid gap-4 md:grid-cols-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <Card className="bg-white p-4" key={`${type}-${index}`}>
          <div className="h-44 animate-pulse rounded-photo bg-vanilla-custard" />
          <div className="mt-4 h-5 w-28 animate-pulse rounded-card bg-golden-glow/60" />
          <div className="mt-4 h-7 w-3/4 animate-pulse rounded-card bg-coffee-beans/10" />
          <div className="mt-4 h-16 animate-pulse rounded-card bg-coffee-beans/10" />
        </Card>
      ))}
    </div>
  );
}

function ApiMessage({ children, variant = "empty" }) {
  const className = variant === "error"
    ? "mt-6 border-inferno bg-white p-5 text-inferno"
    : "mt-6 bg-white p-6 text-center";

  return <Card className={className}>{children}</Card>;
}

export function HomePage() {
  useSeo({
    title: "SaôneLocal - Marché local en ligne",
    description: "Découvrez les produits frais, producteurs locaux et événements de Saône-et-Loire avec SaôneLocal.",
  });

  const [productsOfMoment, setProductsOfMoment] = useState([]);
  const [producers, setProducers] = useState([]);
  const [productsError, setProductsError] = useState("");
  const [producersError, setProducersError] = useState("");
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [isLoadingProducers, setIsLoadingProducers] = useState(true);

  useEffect(() => {
    async function loadHomeData() {
      setIsLoadingProducts(true);
      setIsLoadingProducers(true);
      setProductsError("");
      setProducersError("");

      try {
        const catalogResult = await fetchCatalog({ page: 1 });
        setProductsOfMoment((catalogResult.products || []).slice(0, 3));
      } catch (requestError) {
        setProductsOfMoment([]);
        setProductsError(requestError.message || "Impossible de charger les produits.");
      } finally {
        setIsLoadingProducts(false);
      }

      try {
        const producerResult = await fetchProducers();
        setProducers((producerResult || []).slice(0, 3));
      } catch (requestError) {
        setProducers([]);
        setProducersError(requestError.message || "Impossible de charger les producteurs.");
      } finally {
        setIsLoadingProducers(false);
      }
    }

    loadHomeData();
  }, []);

  return (
    <div className="bg-soft-linen pb-12">
      <Container className="pt-4">
        <section className="relative grid gap-6 overflow-hidden rounded-card border border-coffee-beans/10 bg-[#fffdf7] p-5 shadow-[0_18px_48px_rgba(36,17,5,0.07)] md:grid-cols-[1.05fr_0.95fr] md:items-center md:p-8">
          <div className="pointer-events-none absolute bottom-8 left-8 hidden h-px w-24 bg-gradient-to-r from-golden-glow to-transparent md:block" />
          <div>
            <Badge className="px-3.5 py-1.5">Marché local en ligne</Badge>
            <h1 className="mt-5 break-words font-display text-4xl leading-tight text-coffee-beans sm:text-5xl">
              Le goût du local, direct depuis la Saône-et-Loire.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-coffee-beans/70">
              SaôneLocal réunit produits frais, producteurs du territoire et rendez-vous de proximité dans une
              marketplace claire, humaine et facile à parcourir.
            </p>
            <div className="mt-6 grid gap-3 sm:flex">
              <Button as="a" className="w-full sm:w-auto" href="/catalogue" size="lg">
                Découvrir le catalogue
              </Button>
              <Button as="a" className="w-full sm:w-auto" href="/producteurs" size="lg" variant="secondary">
                Nos producteurs
              </Button>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-photo bg-vanilla-custard p-3 shadow-inner">
            <img
              alt="Étal de marché avec produits frais"
              className="h-72 w-full rounded-photo object-cover sm:h-96"
              decoding="async"
              fetchPriority="high"
              src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=1200&q=80"
            />
            <div className="absolute bottom-6 left-6 right-6 rounded-card border border-white/60 bg-[#fffdf7]/95 px-4 py-3 shadow-[0_10px_24px_rgba(36,17,5,0.12)] sm:right-auto">
              <p className="text-xs font-extrabold uppercase text-coffee-beans/60">Saison</p>
              <p className="mt-1 text-sm font-extrabold text-coffee-beans">Frais, proche, prêt à commander</p>
            </div>
          </div>
        </section>
      </Container>

      <Container className="py-10">
        <div className="grid gap-4 md:grid-cols-3">
          {advantages.map((advantage, index) => (
            <AdvantageCard key={advantage.title} index={index} {...advantage} />
          ))}
        </div>
      </Container>

      <Container className="pb-11">
        <SectionTitle
          eyebrow="Produits du moment"
          title="Des produits frais à découvrir"
          description="Découvrez une sélection de produits frais proposés par les producteurs du territoire."
        />
        <div className="mt-4 h-px w-full bg-gradient-to-r from-coffee-beans/10 via-golden-glow/70 to-transparent" />

        {productsError ? (
          <ApiMessage variant="error">
            <p className="font-bold">{productsError}</p>
          </ApiMessage>
        ) : null}

        {isLoadingProducts ? <LoadingCards type="products" /> : null}

        {!isLoadingProducts && !productsError && productsOfMoment.length === 0 ? (
          <ApiMessage>
            <p className="font-display text-2xl text-coffee-beans">Aucun produit disponible</p>
            <p className="mt-2 text-sm font-semibold text-coffee-beans/70">
              Les produits issus du seeder apparaîtront ici dès qu'ils seront disponibles dans l'API.
            </p>
          </ApiMessage>
        ) : null}

        {!isLoadingProducts && productsOfMoment.length > 0 ? (
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {productsOfMoment.map((product) => (
              <ProductCard key={product.productid || product.productId} product={product} />
            ))}
          </div>
        ) : null}
      </Container>

      <Container className="pb-11">
        <SectionTitle
          eyebrow="Nos producteurs"
          title="Des savoir-faire près de chez vous"
          description="Des producteurs et artisans locaux mis en avant avec une présentation claire et humaine."
        />
        <div className="mt-4 h-px w-full bg-gradient-to-r from-coffee-beans/10 via-muted-olive/60 to-transparent" />

        {producersError ? (
          <ApiMessage variant="error">
            <p className="font-bold">{producersError}</p>
          </ApiMessage>
        ) : null}

        {isLoadingProducers ? <LoadingCards type="producers" /> : null}

        {!isLoadingProducers && !producersError && producers.length === 0 ? (
          <ApiMessage>
            <p className="font-display text-2xl text-coffee-beans">Aucun producteur disponible</p>
            <p className="mt-2 text-sm font-semibold text-coffee-beans/70">
              Les producteurs issus du seeder apparaîtront ici dès qu'ils seront disponibles dans l'API.
            </p>
          </ApiMessage>
        ) : null}

        {!isLoadingProducers && producers.length > 0 ? (
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {producers.map((producer) => (
              <ProducerCard key={producer.producerid || producer.producerId} producer={producer} />
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
          <div className="grid gap-3 sm:flex">
            <Button as="a" className="w-full sm:w-auto" href="/catalogue" size="lg">
              Voir le catalogue
            </Button>
            <Button as="a" className="w-full sm:w-auto" href="/calendrier" size="lg" variant="secondary">
              Voir les événements
            </Button>
          </div>
        </section>
      </Container>
    </div>
  );
}
