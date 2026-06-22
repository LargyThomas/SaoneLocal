import { useEffect, useState } from "react";
import { fetchProducer } from "../../api/producers-api.js";
import Badge from "../../ui/badge.jsx";
import Button from "../../ui/button.jsx";
import Card from "../../ui/card.jsx";
import Container from "../../ui/container.jsx";
import ProductCard from "../../ui/product-card.jsx";
import SectionTitle from "../../ui/section-title.jsx";

const demoProducer = {
  producerId: 1,
  producerName: "Karim Benchouia",
  producerAge: "34 ans",
  producerLocalisation: "Saint-Marcel (71), Saône-et-Loire",
  producerJob: "Boulanger",
  producerPicture:
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80",
};

const producerProducts = [
  {
    productId: 1,
    productName: "Baguettes artisanales",
    productPrice: 1.3,
    productDesc: "Baguettes préparées chaque matin dans le fournil de Karim.",
    productPicture:
      "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=900&q=80",
    producerNameMock: demoProducer.producerName,
  },
  {
    productId: 2,
    productName: "Pain de campagne",
    productPrice: 4.8,
    productDesc: "Pain rustique au levain, pensé pour les repas simples et généreux.",
    productPicture:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80",
    producerNameMock: demoProducer.producerName,
  },
];

const bakeryPictures = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&w=900&q=80",
    alt: "Pain sortant du four",
    title: "Le fournil",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1604908812861-1e41bf6ecfc6?auto=format&fit=crop&w=900&q=80",
    alt: "Boulanger en train de préparer du pain",
    title: "La préparation",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80",
    alt: "Rayons de pains artisanaux",
    title: "Les pains du jour",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1568254183919-78a4f43a2877?auto=format&fit=crop&w=900&q=80",
    alt: "Viennoiseries dorées en vitrine",
    title: "Les viennoiseries",
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=900&q=80",
    alt: "Pains et brioches sur un comptoir",
    title: "Le comptoir",
  },
  {
    id: 6,
    image:
      "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&w=900&q=80",
    alt: "Pains artisanaux alignés",
    title: "La fournée",
  },
  {
    id: 7,
    image:
      "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=900&q=80",
    alt: "Pâte à pain travaillée à la main",
    title: "Le façonnage",
  },
  {
    id: 8,
    image:
      "https://images.unsplash.com/photo-1506459225024-1428097a7e18?auto=format&fit=crop&w=900&q=80",
    alt: "Croissants dorés sur une table",
    title: "Les croissants",
  },
  {
    id: 9,
    image:
      "https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&w=900&q=80",
    alt: "Pain frais posé sur une planche",
    title: "La sélection",
  },
];

const producerDetails = [
  { label: "Nom", value: demoProducer.producerName },
  { label: "Âge", value: demoProducer.producerAge },
  { label: "Localisation", value: demoProducer.producerLocalisation },
  { label: "Métier", value: demoProducer.producerJob },
];

export function ProducerProfilePage({ params = {} }) {
  const [activePictureIndex, setActivePictureIndex] = useState(0);
  const [producerData, setProducerData] = useState(null);
  const [products, setProducts] = useState([]);
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const activePicture = bakeryPictures[activePictureIndex];
  const producerId = params.id || "1";

  useEffect(() => {
    async function loadProducer() {
      setIsLoading(true);
      setError("");

      try {
        const result = await fetchProducer(producerId);
        setProducerData(result.resultProducer?.[0] || null);
        setProducts(result.resultProduct || []);
        setEvents(result.resultEvent || []);
      } catch (requestError) {
        setProducerData(null);
        setProducts([]);
        setEvents([]);
        setError(requestError.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadProducer();
  }, [producerId]);

  const goToPreviousPicture = () => {
    setActivePictureIndex((current) => (current === 0 ? bakeryPictures.length - 1 : current - 1));
  };

  const goToNextPicture = () => {
    setActivePictureIndex((current) => (current === bakeryPictures.length - 1 ? 0 : current + 1));
  };

  const scrollThumbnailRail = (direction) => {
    const rail = document.getElementById("bakery-thumbnails");

    if (rail) {
      rail.scrollLeft += direction * 260;
    }
  };

  const producerName = producerData
    ? `${producerData.usersfirstname || ""} ${producerData.userslastname || ""}`.trim() || "Producteur local"
    : demoProducer.producerName;
  const producerDescription = producerData?.producerdesc || "Producteur local engagé dans le circuit court et la proximité avec les clients.";
  const producerLocation = producerData?.producerlocalisation || demoProducer.producerLocalisation;
  const producerPicture = producerData?.usersprofilpicture || demoProducer.producerPicture;
  const visibleProducts = products.length > 0 ? products : producerProducts;
  const visibleDetails = producerData
    ? [
        { label: "Nom", value: producerName },
        { label: "Localisation", value: producerLocation },
        { label: "Statut", value: "Actif" },
        { label: "SIRET", value: producerData.producersiretnum || "À venir" },
      ]
    : producerDetails;

  return (
    <div className="bg-soft-linen pb-12">
      <Container className="pt-4">
        {error ? (
          <div className="mb-4 rounded-card border border-inferno bg-white px-4 py-3 text-sm font-bold text-inferno">
            {error}
          </div>
        ) : null}

        <section className="relative overflow-hidden rounded-card border border-coffee-beans/10 bg-[#fffdf7] p-3 shadow-[0_18px_48px_rgba(36,17,5,0.07)] sm:p-5 md:p-8">
          <div className="relative grid gap-4 md:grid-cols-[0.9fr_1.1fr] md:items-center lg:gap-6">
            <div className="overflow-hidden rounded-photo bg-vanilla-custard p-2 shadow-inner sm:p-3">
              <img
                src={producerPicture}
                alt={`Portrait de ${producerName}`}
                className="h-56 w-full rounded-photo object-cover sm:h-80 md:h-[420px]"
              />
            </div>

            <Card className="bg-[#eeefe7] p-4 shadow-[0_14px_34px_rgba(36,17,5,0.06)] sm:p-5 md:p-7">
              <Badge className="px-3.5 py-1.5">
                Producteur local
              </Badge>

              <h1 className="mt-4 break-words font-display text-3xl leading-tight text-coffee-beans sm:text-4xl lg:text-5xl">
                {isLoading ? "Chargement..." : producerName}
              </h1>

              <p className="mt-3 max-w-xl text-base font-semibold leading-7 text-coffee-beans/70 sm:mt-4">
                {producerDescription}
              </p>

              <div className="mt-4 h-px w-full bg-gradient-to-r from-golden-glow via-coffee-beans/10 to-transparent sm:mt-5" />

              <div className="mt-4 grid gap-2 sm:mt-6 sm:grid-cols-2 sm:gap-3">
                {visibleDetails.map((detail) => (
                  <div className="rounded-card border border-coffee-beans/10 bg-[#fffdf7]/75 p-3 sm:p-4" key={detail.label}>
                    <p className="text-xs font-extrabold uppercase text-coffee-beans/60">{detail.label}</p>
                    <p className="mt-1 text-base font-extrabold text-coffee-beans">{detail.value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 grid gap-3 sm:mt-6 sm:flex">
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
      </Container>

      <Container className="py-8 sm:py-10" id="produits">
        <SectionTitle
          eyebrow="Ses créations"
          title="Mes produits"
          description={`Découvrez les produits proposés par ${producerName}.`}
        />

        <div className="mt-4 h-px w-full bg-gradient-to-r from-coffee-beans/10 via-golden-glow/70 to-transparent" />

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {visibleProducts.map((product) => (
            <ProductCard key={product.productid || product.productId} product={product} />
          ))}
        </div>
      </Container>

      <Container className="pb-9 sm:pb-11">
        <SectionTitle
          eyebrow="Son atelier"
          title="Ma boulangerie"
          description="Un aperçu de l'univers de Karim : fournil, pains artisanaux et ambiance de boulangerie locale."
        />

        <div className="mt-4 h-px w-full bg-gradient-to-r from-coffee-beans/10 via-golden-glow/70 to-transparent" />

        <section className="mt-6">
          <Card className="overflow-hidden bg-[#fffdf7] p-3 shadow-[0_10px_26px_rgba(36,17,5,0.05)] sm:p-5">
            <div className="grid gap-3 sm:gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
              <div className="overflow-hidden rounded-photo bg-vanilla-custard">
                <img
                  src={activePicture.image}
                  alt={activePicture.alt}
                  className="h-48 w-full object-cover transition duration-500 sm:h-72 lg:h-[420px]"
                />
              </div>

              <aside className="flex flex-col justify-between rounded-card border border-coffee-beans/10 bg-soft-linen p-3 sm:p-4">
                <div>
                  <Badge className="px-3.5 py-1.5">
                    Saint-Marcel 71
                  </Badge>
                  <p className="mt-3 text-xs font-extrabold uppercase text-coffee-beans/60 sm:mt-4">
                    Photo {activePictureIndex + 1} / {bakeryPictures.length}
                  </p>
                  <h2 className="mt-2 break-words font-display text-2xl leading-tight text-coffee-beans sm:text-3xl">
                    {activePicture.title}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-coffee-beans/70 sm:mt-3 sm:text-base sm:leading-7">
                    Un atelier de proximité pensé pour produire régulièrement des pains frais et garder une relation
                    directe avec les clients.
                  </p>
                </div>

                <div className="mt-4 grid grid-cols-[auto_1fr_auto] items-center gap-2 sm:mt-5 sm:gap-3">
                  <button
                    aria-label="Photo précédente"
                    className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-golden-glow text-xl font-black leading-none text-coffee-beans shadow-sm transition hover:bg-mustard sm:h-11 sm:w-11 sm:text-2xl"
                    onClick={goToPreviousPicture}
                    type="button"
                  >
                    ←
                  </button>
                  <div className="flex justify-center gap-2">
                    {bakeryPictures.map((picture, index) => (
                      <button
                        aria-label={`Afficher ${picture.title}`}
                        aria-pressed={activePictureIndex === index}
                        className={`h-3 w-3 cursor-pointer rounded-full transition ${
                          activePictureIndex === index
                            ? "bg-coffee-beans"
                            : "bg-coffee-beans/25 hover:bg-coffee-beans/50"
                        }`}
                        key={picture.id}
                        onClick={() => setActivePictureIndex(index)}
                        type="button"
                      />
                    ))}
                  </div>
                  <button
                    aria-label="Photo suivante"
                    className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-golden-glow text-xl font-black leading-none text-coffee-beans shadow-sm transition hover:bg-mustard sm:h-11 sm:w-11 sm:text-2xl"
                    onClick={goToNextPicture}
                    type="button"
                  >
                    →
                  </button>
                </div>
              </aside>
            </div>

            <div className="mt-3 grid grid-cols-[minmax(0,1fr)] items-center gap-2 rounded-card border border-coffee-beans/10 bg-soft-linen p-2 sm:mt-4 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:gap-3">
              <button
                aria-label="Faire défiler les miniatures vers la gauche"
                className="hidden h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#fffdf7] text-xl font-black text-coffee-beans shadow-sm transition hover:bg-golden-glow sm:flex"
                onClick={() => scrollThumbnailRail(-1)}
                type="button"
              >
                ←
              </button>

              <div
                id="bakery-thumbnails"
                className="scrollbar-none flex gap-3 overflow-x-auto scroll-smooth py-1"
              >
                {bakeryPictures.map((picture, index) => (
                  <button
                    aria-label={`Voir ${picture.title}`}
                    aria-pressed={activePictureIndex === index}
                    className={`group w-24 shrink-0 cursor-pointer overflow-hidden rounded-card border p-1 text-left transition sm:w-36 ${
                      activePictureIndex === index
                        ? "border-green bg-vanilla-custard shadow-[0_0_0_2px_rgba(15,113,10,0.12)]"
                        : "border-coffee-beans/10 bg-[#fffdf7] hover:border-green/40"
                    }`}
                    key={picture.id}
                    onClick={() => setActivePictureIndex(index)}
                    type="button"
                  >
                    <img
                      alt=""
                      className="h-12 w-full rounded-card object-cover transition duration-300 group-hover:scale-[1.03] sm:h-18"
                      src={picture.image}
                    />
                    <span className="mt-2 block truncate px-1 pb-1 text-xs font-extrabold text-coffee-beans">
                      {picture.title}
                    </span>
                  </button>
                ))}
              </div>

              <button
                aria-label="Faire défiler les miniatures vers la droite"
                className="hidden h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#fffdf7] text-xl font-black text-coffee-beans shadow-sm transition hover:bg-golden-glow sm:flex"
                onClick={() => scrollThumbnailRail(1)}
                type="button"
              >
                →
              </button>
            </div>
          </Card>
        </section>
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
                : "Les prochains événements de ce producteur seront affichés ici dès qu'ils seront disponibles."}
            </p>
          </div>

          <Button as="a" className="w-full sm:w-auto" href="/calendrier" size="lg">
            Voir le calendrier
          </Button>
        </section>
      </Container>
    </div>
  );
}
