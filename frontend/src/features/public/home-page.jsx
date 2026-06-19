import Badge from "../../ui/badge.jsx";
import Button from "../../ui/button.jsx";
import Card from "../../ui/card.jsx";
import Container from "../../ui/container.jsx";
import ProducerCard from "../../ui/producer-card.jsx";
import ProductCard from "../../ui/product-card.jsx";
import SectionTitle from "../../ui/section-title.jsx";

const productsOfMoment = [
  {
    productId: 1,
    productName: "Panier maraîcher",
    productPrice: 18.9,
    productDesc: "Légumes frais de saison, préparés par une ferme locale.",
    productPicture: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80",
    productStatus: "active",
    producerId: 1,
    producerNameMock: "Ferme des coteaux",
    categoryId: 3,
  },
  {
    productId: 2,
    productName: "Pain au levain",
    productPrice: 4.5,
    productDesc: "Pain artisanal, farine régionale et cuisson douce.",
    productPicture: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80",
    productStatus: "active",
    producerId: 2,
    producerNameMock: "Atelier du fournil",
    categoryId: 2,
  },
  {
    productId: 3,
    productName: "Confiture de saison",
    productPrice: 6.2,
    productDesc: "Fruits récoltés localement, cuisson en petites quantités.",
    productPicture: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=900&q=80",
    productStatus: "active",
    producerId: 3,
    producerNameMock: "Vergers de Saône",
    categoryId: 1,
  },
];

const producers = [
  {
    producerId: 1,
    producerDesc: "Maraichage de saison",
    producerLocalisation: "Val de Saône",
    producerStatus: "active",
    producerNameMock: "Ferme des coteaux",
  },
  {
    producerId: 2,
    producerDesc: "Boulangerie artisanale",
    producerLocalisation: "Centre village",
    producerStatus: "active",
    producerNameMock: "Atelier du fournil",
    producerPictureMock: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&w=900&q=80",
  },
  {
    producerId: 3,
    producerDesc: "Fruits et confitures",
    producerLocalisation: "Rives de Saône",
    producerStatus: "active",
    producerNameMock: "Vergers de Saône",
    producerPictureMock: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=900&q=80",
  },
];

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
    <Card className="group bg-[#fffdf7] p-5 shadow-[0_10px_26px_rgba(36,17,5,0.05)] transition duration-200 hover:-translate-y-1 hover:border-green/20 hover:shadow-[0_16px_34px_rgba(36,17,5,0.08)]">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-card bg-golden-glow text-sm font-extrabold text-coffee-beans shadow-sm transition duration-200 group-hover:bg-mustard">
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

export function HomePage() {
  return (
    <div className="bg-soft-linen pb-12">
      <Container className="pt-4">
        <section className="relative grid gap-6 overflow-hidden rounded-card border border-coffee-beans/10 bg-[#fffdf7] p-5 shadow-[0_18px_48px_rgba(36,17,5,0.07)] md:grid-cols-[1.05fr_0.95fr] md:items-center md:p-8">
          <div className="pointer-events-none absolute bottom-8 left-8 hidden h-px w-24 bg-gradient-to-r from-golden-glow to-transparent md:block" />
          <div>
            <Badge className="px-3.5 py-1.5">
              <span className="h-2 w-2 rounded-full bg-green" />
              Marché local en ligne
            </Badge>
            <h1 className="mt-5 text-4xl font-display leading-tight text-coffee-beans sm:text-5xl">
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
              src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?ahttps://plus.unsplash.com/premium_photo-1663040313671-b697d88b239d?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Duto=format&fit=crop&w=1200&q=80"
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
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {productsOfMoment.map((product) => (
            <ProductCard key={product.productId} product={product} />
          ))}
        </div>
      </Container>

      <Container className="pb-11">
        <SectionTitle
          eyebrow="Nos producteurs"
          title="Des savoir-faire près de chez vous"
          description="Des producteurs et artisans locaux mis en avant avec une présentation claire et humaine."
        />
        <div className="mt-4 h-px w-full bg-gradient-to-r from-coffee-beans/10 via-muted-olive/60 to-transparent" />
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {producers.map((producer) => (
            <ProducerCard key={producer.producerId} producer={producer} />
          ))}
        </div>
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
