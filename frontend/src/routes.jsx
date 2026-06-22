import { HomePage } from "./features/public/home-page.jsx";
import { CatalogPage } from "./features/public/catalog-page.jsx";
import { NotFoundPage } from "./features/public/not-found-page.jsx";
import { PlaceholderPage } from "./features/public/placeholder-page.jsx";
import { ProducerPage } from "./features/public/producer-page.jsx";
import { ProducerProfilePage } from "./features/client/profile-page.jsx";
import { CalendarPage } from "./features/public/calendar-page.jsx";
import { AboutPage } from "./features/public/about-page.jsx";
import { ProductPage } from "./features/public/product-page.jsx";
import { LoginPage } from "./features/auth/login-page.jsx";
import { RegisterPage } from "./features/auth/register-page.jsx";

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
    path: "/produits/:id",
    label: "Fiche produit",
    component: ProductPage,
  },
  {
    path: "/producteurs",
    label: "Producteurs",
    component: ProducerPage,
    showInNav: true,
  },
  {
    path: "/producteurs/:id",
    label: "Fiche producteur",
    component: ProducerProfilePage,
  },
  {
    path: "/calendrier",
    label: "Calendrier",
    component: CalendarPage,
    showInNav: true,
  },
  {
    path: "/a-propos",
    label: "À propos",
    component: AboutPage,
    showInNav: true,
  },
  {
    path: "/connexion",
    label: "Connexion",
    component: LoginPage,
    showInNav: true,
  },
  {
    path: "/inscription",
    label: "Inscription",
    component: RegisterPage,
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
