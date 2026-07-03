import Badge from "../../ui/badge.jsx";
import Card from "../../ui/card.jsx";
import Container from "../../ui/container.jsx";
import { useSeo } from "../../hooks/use-seo.js";

const privacyItems = [
  {
    title: "Données collectées",
    text: "SaôneLocal peut utiliser l'email, le nom, le prénom, le rôle du compte, l'historique de commandes, le panier, les favoris et la photo de profil si elle est ajoutée.",
  },
  {
    title: "Utilisation",
    text: "Ces données servent à connecter l'utilisateur, afficher son espace personnel, gérer les commandes et faciliter les échanges avec les producteurs.",
  },
  {
    title: "Conservation",
    text: "Les données sont conservées uniquement le temps nécessaire au fonctionnement du service ou aux obligations liées aux commandes.",
  },
  {
    title: "Droits utilisateur",
    text: "Chaque utilisateur peut demander l'accès, la modification ou la suppression de ses données personnelles en contactant l'équipe SaôneLocal.",
  },
  {
    title: "Sécurité",
    text: "Les accès connectés reposent sur un jeton d'authentification. Les mots de passe sont protégés côté serveur.",
  },
];

export function PrivacyPage() {
  useSeo({
    title: "Politique de confidentialité",
    description: "Découvrez comment SaôneLocal utilise et protège les données personnelles de ses utilisateurs.",
  });

  return (
    <div className="bg-soft-linen pb-12">
      <Container className="pt-4">
        <section className="rounded-card bg-white p-5 shadow-sm sm:p-7">
          <Badge>Confidentialité</Badge>
          <h1 className="mt-4 font-display text-3xl leading-tight text-coffee-beans sm:text-4xl">
            Politique de confidentialité
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-coffee-beans/75 sm:text-lg">
            Cette page explique simplement quelles données sont utilisées et pourquoi.
          </p>
        </section>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {privacyItems.map((item) => (
            <Card className="bg-white p-5" key={item.title}>
              <h2 className="text-xl font-extrabold text-coffee-beans">{item.title}</h2>
              <p className="mt-3 text-base leading-7 text-coffee-beans/75">{item.text}</p>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  );
}
