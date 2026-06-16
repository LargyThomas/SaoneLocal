import { HomePage } from "./features/public/home-page.jsx";
import { CatalogPage } from "./features/public/catalog-page.jsx";
import { NotFoundPage } from "./features/public/not-found-page.jsx";
import { PlaceholderPage } from "./features/public/placeholder-page.jsx";

export const routes = [
  {
    path: "/",
    label: "Accueil",
    component: HomePage,
    showInNav: true,
  },
  {
    path: "/catalogue",
    label: "Catalogue",
    component: CatalogPage,
    showInNav: true,
  },
  {
    path: "/produits/demo",
    label: "Fiche produit",
    component: () => <PlaceholderPage title="Fiche produit" />,
  },
  {
    path: "/producteurs",
    label: "Producteurs",
    component: () => <PlaceholderPage title="Producteurs" />,
    showInNav: true,
  },
  {
    path: "/producteurs/demo",
    label: "Fiche producteur",
    component: () => <PlaceholderPage title="Fiche producteur" />,
  },
  {
    path: "/calendrier",
    label: "Calendrier",
    component: () => <PlaceholderPage title="Calendrier" />,
    showInNav: true,
  },
  {
    path: "/a-propos",
    label: "A propos",
    component: () => <PlaceholderPage title="A propos" />,
    showInNav: true,
  },
  {
    path: "/connexion",
    label: "Connexion",
    component: () => <PlaceholderPage title="Connexion" />,
    showInNav: true,
  },
  {
    path: "/inscription",
    label: "Inscription",
    component: () => <PlaceholderPage title="Inscription" />,
  },
  {
    path: "/panier",
    label: "Panier",
    component: () => <PlaceholderPage title="Panier" />,
    showInNav: true,
  },
  {
    path: "*",
    label: "Page introuvable",
    component: NotFoundPage,
  },
];
