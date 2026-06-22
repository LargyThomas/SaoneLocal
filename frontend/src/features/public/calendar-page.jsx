import Badge from "../../ui/badge.jsx";
import Button from "../../ui/button.jsx";
import Card from "../../ui/card.jsx";
import Container from "../../ui/container.jsx";
import ProducerCard from "../../ui/producer-card.jsx";
import ProductCard from "../../ui/product-card.jsx";
import SectionTitle from "../../ui/section-title.jsx";

const advantages = [
  {
    name: "Marché des producteurs",
    description: "Un rendez-vous local pour découvrir des produits frais, échanger avec les producteurs et soutenir le circuit court.",
    localisation: "Place du Marché, 71000 Mâcon",
    date: "12 avril 2026",
  },
  {
    name: "Fête du terroir",
    description: "Une journée conviviale autour des spécialités locales, avec dégustations, animations et stands de producteurs.",
    localisation: "144 Le Château, 71960 Pierreclos",
    date: "26 avril 2026",
  },
  {
    name: "Rencontre avec les producteurs",
    description: "Un moment d’échange pour mieux comprendre les métiers agricoles, les méthodes de production et les engagements locaux.",
    localisation: "Salle communale, 71960 La Roche-Vineuse",
    date: "9 mai 2026",
  },
  {
    name: "Marché nocturne local",
    description: "Un marché en soirée avec produits artisanaux, paniers de saison, restauration locale et ambiance musicale.",
    localisation: "Quai Lamartine, 71000 Mâcon",
    date: "23 mai 2026",
  },
  {
    name: "Atelier dégustation",
    description: "Une animation découverte autour des produits du territoire, avec conseils, recettes simples et échanges avec les artisans.",
    localisation: "5 Rue Poulets, 71000 Mâcon",
    date: "6 juin 2026",
  },
  {
    name: "Journée circuits courts",
    description: "Une journée dédiée aux initiatives locales, aux producteurs de proximité et aux solutions pour consommer autrement.",
    localisation: "Maison des Associations, 71850 Charnay-lès-Mâcon",
    date: "20 juin 2026",
  },
];

const producer_event = [
  {
    name: "Ferme des Prés Verts",
    picture:
      "https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=900&q=80",
    events: ["Marché des producteurs - 12 avril 2026"],
  },
  {
    name: "Les Jardins de Cluny",
    picture:
      "https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=900&q=80",
    events: ["Panier de saison - 27 juillet 2026"],
  },
  {
    name: "Boulangerie du Bourg",
    picture:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80",
    events: ["Atelier savoir-faire - 02 mars 2026"],
  },
  {
    name: "Rucher de la Saône",
    picture:
      "https://images.unsplash.com/photo-1471943311424-646960669fbc?auto=format&fit=crop&w=900&q=80",
    events: ["Découverte des producteurs locaux - 14 février 2026"],
  },
];

function EventCard({ name, description, date, localisation, index, image }) {
  return (
    <Card className="group flex h-full flex-col overflow-hidden border border-coffee-beans/10 bg-[#fffdf7] p-0 shadow-[0_10px_26px_rgba(36,17,5,0.06)] transition duration-300 hover:-translate-y-1 hover:border-mustard/50 hover:shadow-[0_18px_38px_rgba(36,17,5,0.1)] md:min-h-[620px]">
      <div className="relative h-44 shrink-0 overflow-hidden sm:h-56 md:h-64">
        {image ? (
          <img
            src={image}
            alt=""
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-golden-glow via-golden-glow/75 to-soft-linen">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/85 text-2xl shadow-md">
              🌻
            </div>
          </div>
        )}

        <span className="absolute left-4 top-4 rounded-card bg-mustard px-3 py-2 text-xs font-extrabold uppercase tracking-wide text-coffee-beans shadow-sm">
          Év. {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="min-h-[92px]">
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-2 rounded-card border border-coffee-beans/10 bg-soft-linen px-3 py-1.5 text-xs font-extrabold uppercase text-coffee-beans/70">
              <span aria-hidden="true">📅</span>
              {date}
            </span>

            <span className="inline-flex max-w-full items-start gap-2 rounded-card border border-coffee-beans/10 bg-soft-linen px-3 py-1.5 text-xs font-extrabold uppercase text-coffee-beans/70">
              <span aria-hidden="true">📍</span>
              <span className="line-clamp-2">{localisation}</span>
            </span>
          </div>
        </div>

        <h3 className="min-h-[78px] break-words font-display text-2xl font-black leading-tight text-coffee-beans">
          {name}
        </h3>

        <p className="mt-3 line-clamp-4 min-h-[112px] text-base leading-7 text-coffee-beans/70">
          {description}
        </p>

        <div className="mt-auto border-t border-coffee-beans/10 pt-5">
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm font-extrabold text-coffee-beans">
              Voir les détails
            </span>

            <span className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full bg-golden-glow text-2xl font-black leading-none text-coffee-beans shadow-sm transition duration-200 group-hover:translate-x-1 group-hover:bg-mustard group-hover:shadow-md">
              →
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}

// Rajouter une fonction pour afficher en gros l'évènement après que le span -> soit cliqué.

function ProducerEventCard({ name, picture, events }) {
  return (
    <Card className="group overflow-hidden bg-[#fffdf7] p-4 shadow-[0_10px_26px_rgba(36,17,5,0.05)] transition duration-200 hover:-translate-y-1 hover:border-green/20 hover:shadow-[0_16px_34px_rgba(36,17,5,0.08)] sm:p-5">
      <div className="grid gap-4 sm:grid-cols-[112px_1fr_auto] sm:items-center">
        <div className="h-24 w-24 shrink-0 overflow-hidden rounded-photo bg-vanilla-custard sm:h-28 sm:w-28">
          <img
            src={picture}
            alt={`Photo de ${name}`}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </div>

        <div className="min-w-0">
          <Badge variant="success">
            Présent
          </Badge>
          <h3 className="text-lg font-extrabold text-coffee-beans">
            {name}
          </h3>

          <ul className="mt-3 grid gap-2 text-sm font-semibold text-coffee-beans/75">
            {events.map((event) => (
              <li className="rounded-card border border-coffee-beans/10 bg-soft-linen px-3 py-2" key={event}>
                {event}
              </li>
            ))}
          </ul>
        </div>

        <Button as="a" className="w-full sm:w-auto" href="/producteurs" size="sm" variant="secondary">
          Fiche producteur
        </Button>
      </div>
    </Card>
  );
}

export function CalendarPage() {
    return (
        <div className="bg-soft-linen pb-12">
            <Container className="pb-11 pt-4">
                <section className="mb-6 rounded-card bg-white p-5 shadow-sm sm:p-7">
                    <Badge>Événement</Badge>
                    <h1 className="mt-4 break-words font-display text-3xl leading-tight text-coffee-beans sm:text-4xl">Nos prochains événements</h1>
                    <p className="mt-4 max-w-2xl text-lg leading-8 text-coffee-beans/75">
                        Ici vous retrouverez tous les événements organisés, ainsi que ceux dans lesquels le producteur sera présent.
                    </p>
                </section>
                <div className="mt-4 h-px w-full bg-gradient-to-r from-coffee-beans/10 via-muted-olive/60 to-transparent" />
            </Container>
            
            <Container className="py-10">
                <div className="grid gap-4 md:grid-cols-3">
                    {advantages.map((advantage, index) => (
                        <EventCard key={advantage.name} index={index} {...advantage} />
                    ))}
                </div>
            </Container>

            <Container className="pb-11">
                <section className="mb-6 rounded-card bg-white p-5 shadow-sm sm:p-7">
                    <Badge>Producteurs</Badge>
                    <h1 className="mt-4 break-words font-display text-3xl leading-tight text-coffee-beans sm:text-4xl">Venez nous rencontrer !</h1>
                    <p className="mt-4 max-w-2xl text-lg leading-8 text-coffee-beans/75">
                        Découvrez les différents producteurs présents durant les événements près de chez vous.
                    </p>
                </section>
                <div className="mt-4 h-px w-full bg-gradient-to-r from-coffee-beans/10 via-muted-olive/60 to-transparent" />
            </Container>

            <Container className="pb-11">
                <div className="grid gap-4 md:grid-cols-1">
                    {producer_event.map((producer_event, index) => (
                        <ProducerEventCard key={producer_event.name} index={index} {...producer_event} />
                    ))}
                </div>
            </Container>
        </div>
    );
}
