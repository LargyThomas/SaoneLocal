import Container from "../../ui/container.jsx";
import SectionTitle from "../../ui/section-title.jsx";
import Badge from "../../ui/badge.jsx";
import Button from "../../ui/button.jsx";
import { useSeo } from "../../hooks/use-seo.js";

const values = [
  {
    title: "Proximité",
    text: "Un lien direct avec les producteurs locaux du bassin chalonnais.",
    icon: "🌱",
  },
  {
    title: "Qualité",
    text: "Des produits du terroir sélectionnés avec soin et transparence.",
    icon: "🏅",
  },
  {
    title: "Juste rémunération",
    text: "Une rémunération équitable pour soutenir les producteurs locaux.",
    icon: "⚖️",
  },
  {
    title: "Local et engagé",
    text: "Une consommation responsable, accessible et ancrée dans le territoire.",
    icon: "📍",
  },
];

function ValueCard({ title, text, icon }) {
  return (
    <article className="group rounded-card border border-coffee-beans/10 bg-[#fffdf7] p-6 text-center shadow-[0_14px_36px_rgba(36,17,5,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(36,17,5,0.10)]">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-golden-glow/20 text-3xl transition duration-300 group-hover:scale-110">
        <span aria-hidden="true">{icon}</span>
      </div>

      <h3 className="mt-5 font-display text-2xl text-coffee-beans">
        {title}
      </h3>

      <div className="mx-auto mt-4 h-1 w-10 rounded-full bg-golden-glow" />

      <p className="mt-4 text-sm font-semibold leading-7 text-coffee-beans/70">
        {text}
      </p>
    </article>
  );
}

export function AboutPage() {
  useSeo({
    title: "À propos de SaôneLocal",
    description: "Découvrez l'histoire, les valeurs et l'engagement local de SaôneLocal auprès des producteurs du bassin chalonnais.",
  });

  return (
    <div className="bg-soft-linen pb-12">
      <Container className="pt-4">
        <section className="relative overflow-hidden rounded-card border border-coffee-beans/10 bg-[#fffdf7] p-5 shadow-[0_18px_48px_rgba(36,17,5,0.07)] md:p-8 lg:p-10">
          <div className="relative grid gap-8 md:grid-cols-[1.05fr_0.95fr] md:items-center">
            <div>
              <Badge>Notre histoire</Badge>

              <h1 className="mt-5 max-w-xl break-words font-display text-4xl leading-tight text-coffee-beans sm:text-5xl lg:text-6xl">
                L'histoire de SaôneLocal
              </h1>

              <div className="mt-5 h-1 w-16 rounded-full bg-golden-glow" />

              <p className="mt-6 max-w-xl text-lg leading-8 text-coffee-beans/75">
                SaôneLocal est une association qui rassemble une cinquantaine de
                producteurs locaux du bassin chalonnais : vignerons, maraîchers,
                apiculteurs, fromagers…
              </p>

              <p className="mt-5 max-w-xl text-lg font-bold leading-8 text-coffee-beans">
                Leur objectif est simple : rendre les produits locaux plus
                accessibles, plus visibles, et remettre le lien humain au cœur de
                l'achat.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <article className="rounded-card bg-gradient-to-br from-golden-glow via-golden-glow/75 to-soft-linen p-4">
                  <p className="font-display text-xl text-coffee-beans">100% Mobile</p>
                  <p className="mt-1 text-sm font-semibold text-coffee-beans/65">Simple d'utilisation</p>
                </article>
                <article className="rounded-card bg-gradient-to-br from-golden-glow via-golden-glow/75 to-soft-linen p-4">
                  <p className="font-display text-xl text-coffee-beans">50</p>
                  <p className="mt-1 text-sm font-semibold text-coffee-beans/65">Producteurs de tout le département</p>
                </article>
                <article className="rounded-card bg-gradient-to-br from-golden-glow via-golden-glow/75 to-soft-linen p-4">
                  <p className="font-display text-xl text-coffee-beans">71</p>
                  <p className="mt-1 text-sm font-semibold text-coffee-beans/65">Département de la Saône-et-Loire</p>
                </article>
              </div>
            </div>

            <div className="space-y-4">
              <div className="group aspect-[4/3] overflow-hidden rounded-photo bg-vanilla-custard shadow-[0_16px_36px_rgba(36,17,5,0.12)]">
                <img
                  src="https://plus.unsplash.com/premium_photo-1663040313671-b697d88b239d?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Producteurs locaux de SaôneLocal"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  decoding="async"
                  loading="lazy"
                />
              </div>

              <figure className="rounded-card border border-coffee-beans/10 bg-vanilla-custard/50 p-5">
                <blockquote>
                  <p className="text-lg font-semibold leading-8 text-coffee-beans">
                    "On veut que quelqu'un qui vient sur SaôneLocal sente qu'il
                    achète à un voisin, pas à une enseigne."
                  </p>
                </blockquote>

                <figcaption className="mt-4 border-t border-coffee-beans/10 pt-4">
                  <cite className="not-italic">
                    <span className="block font-display text-lg text-coffee-beans">
                      Michel
                    </span>
                    <span className="text-sm font-medium text-coffee-beans/65">
                      Maraîcher à Crissey, membre fondateur de l'association
                    </span>
                  </cite>
                </figcaption>
              </figure>
            </div>
          </div>
        </section>
      </Container>
      <section className="mt-12">
        <Container>
          <SectionTitle
            eyebrow="Nos valeurs"
            title="Une autre façon de consommer"
            description="SaôneLocal défend une consommation bonne, accessible, locale et juste."
          />
          <div className="mt-4 h-px w-full bg-gradient-to-r from-coffee-beans/10 via-golden-glow/70 to-transparent" />
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {values.map((value) => (
              <ValueCard key={value.title} {...value} />
            ))}
          </div>
        </Container>
      </section>
      <Container className="mt-10">
        <section className="grid gap-5 rounded-card border border-coffee-beans/10 bg-gradient-to-r from-golden-glow to-mustard p-6 text-coffee-beans shadow-[0_18px_42px_rgba(36,17,5,0.08)] sm:grid-cols-[1fr_auto] sm:items-center sm:p-8">
          <div>
            <h2 className="text-2xl font-extrabold leading-tight">Nos prochains événements</h2>
            <p className="mt-2 max-w-2xl text-base leading-7 text-coffee-beans/75">
              Explorez tous les événements organisés dans le département.
            </p>
          </div>
          <Button as="a" className="w-full sm:w-auto" href="/calendrier" size="lg">
            Voir les événements
          </Button>
        </section>
      </Container>
    </div>
  );
}
