import Badge from "../../ui/badge.jsx";
import Card from "../../ui/card.jsx";
import Container from "../../ui/container.jsx";
import { useSeo } from "../../hooks/use-seo.js";

const sections = [
  {
    title: "Mentions légales",
    content: [
      "SaôneLocal est une plateforme de mise en relation entre clients, producteurs locaux et événements du territoire.",
      "Le projet est réalisé dans un cadre étudiant. Les informations affichées peuvent être adaptées avant une mise en production définitive.",
      "Responsable de publication : équipe SaôneLocal.",
      "Contact : contact@saonelocal.fr",
    ],
  },
  {
    title: "RGPD",
    content: [
      "Les données personnelles sont utilisées uniquement pour faire fonctionner le compte, les commandes, le panier, les favoris et les échanges liés au service.",
      "Chaque utilisateur peut demander l'accès, la correction ou la suppression de ses données personnelles.",
      "Les mots de passe ne sont pas stockés en clair et l'accès aux espaces connectés utilise un jeton d'authentification.",
    ],
  },
  {
    title: "CGU",
    content: [
      "L'utilisateur s'engage à fournir des informations exactes lors de son inscription et à utiliser la plateforme de manière normale.",
      "Les producteurs sont responsables des informations publiées sur leurs produits et de la disponibilité de leur catalogue.",
      "SaôneLocal peut suspendre un compte en cas d'usage abusif ou de contenu incorrect.",
    ],
  },
  {
    title: "CGV",
    content: [
      "Les prix affichés sont indiqués en euros. Les conditions de retrait, livraison ou disponibilité dépendent des producteurs.",
      "Une commande validée engage l'utilisateur selon les informations affichées au moment de l'achat.",
      "Les modalités exactes de paiement, retrait et remboursement devront être précisées avant une mise en production réelle.",
    ],
  },
];

export function LegalPage() {
  useSeo({
    title: "Mentions légales, RGPD, CGU et CGV",
    description: "Consultez les mentions légales, informations RGPD, CGU et CGV de SaôneLocal.",
  });

  return (
    <div className="bg-soft-linen pb-12">
      <Container className="pt-4">
        <section className="rounded-card bg-white p-5 shadow-sm sm:p-7">
          <Badge>Informations</Badge>
          <h1 className="mt-4 font-display text-3xl leading-tight text-coffee-beans sm:text-4xl">
            Mentions légales, RGPD, CGU et CGV
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-coffee-beans/75 sm:text-lg">
            Cette page regroupe les informations principales liées à l'utilisation de SaôneLocal.
          </p>
        </section>

        <div className="mt-6 grid gap-4">
          {sections.map((section) => (
            <Card className="bg-white p-5 sm:p-6" key={section.title}>
              <h2 className="font-display text-2xl leading-tight text-coffee-beans">{section.title}</h2>
              <div className="mt-4 grid gap-3 text-base leading-7 text-coffee-beans/75">
                {section.content.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  );
}
