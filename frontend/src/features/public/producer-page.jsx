import Button from "../../ui/button.jsx";
import Container from "../../ui/container.jsx";
import ProducerCard from "../../ui/producer-card.jsx";
import Badge from "../../ui/badge.jsx";

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

export function ProducerPage() {
    return (
      <div className="bg-soft-linen pb-12">
        <Container className="pb-11">
          <section className="mb-6 rounded-card bg-white p-5 shadow-sm sm:p-7">
            <Badge>Producteurs</Badge>
            <h1 className="mt-4 font-display text-3xl leading-tight text-coffee-beans sm:text-4xl">Des savoir-faire près de chez vous</h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-coffee-beans/75">
             Des producteurs et artisans locaux mis en avant avec une présentation claire et humaine.
            </p>
          </section>
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
    )
}
