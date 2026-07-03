import { HomePage } from "./features/public/home-page.jsx";
import { CatalogPage } from "./features/public/catalog-page.jsx";
import { NotFoundPage } from "./features/public/not-found-page.jsx";
import { PlaceholderPage } from "./features/public/placeholder-page.jsx";
import { LegalPage } from "./features/public/legal-page.jsx";
import { PrivacyPage } from "./features/public/privacy-page.jsx";
import { ProducerPage } from "./features/public/producer-page.jsx";
import { ProducerDetailPage } from "./features/public/producer-detail-page.jsx";
import { CalendarPage } from "./features/public/calendar-page.jsx";
import { AboutPage } from "./features/public/about-page.jsx";
import { ProductPage } from "./features/public/product-page.jsx";
import { LoginPage } from "./features/auth/login-page.jsx";
import { RegisterPage } from "./features/auth/register-page.jsx";
import { ForgotPasswordPage } from "./features/auth/forgot-password-page.jsx";
import { CartPage } from "./features/client/cart-page.jsx";
import { CheckoutPage } from "./features/client/checkout-page.jsx";
import { ClientProfilePage } from "./features/client/client-profile-page.jsx";
import { FavoritesPage } from "./features/client/favorites-page.jsx";
import { HistoryPage } from "./features/client/history-page.jsx";
import { DashboardPage } from "./features/producer/dashboard-page.jsx";
import { CatalogManagerPage } from "./features/producer/catalog-manager-page.jsx";
import { OrdersManagerPage } from "./features/producer/orders-manager-page.jsx";
import { SalesStatsPage } from "./features/producer/sales-stats-page.jsx";

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
    component: ProducerDetailPage,
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
    component: CartPage,
    showInNav: true,
  },
  {
    path: "/commande",
    label: "Commande",
    component: CheckoutPage,
  },
  {
    path: "/favoris",
    label: "Favoris",
    component: FavoritesPage,
  },
  {
    path: "/historique",
    label: "Historique",
    component: HistoryPage,
  },
  {
    path: "/profil",
    label: "Profil",
    component: ClientProfilePage,
  },
  {
    path: "/producteur",
    label: "Espace producteur",
    component: DashboardPage,
  },
  {
    path: "/producteur/catalogue",
    label: "Catalogue producteur",
    component: CatalogManagerPage,
  },
  {
    path: "/producteur/commandes",
    label: "Commandes producteur",
    component: OrdersManagerPage,
  },
  {
    path: "/producteur/statistiques",
    label: "Statistiques producteur",
    component: SalesStatsPage,
  },
  {
    path: "/mot-de-passe-oublie",
    label: "Mot de passe oublié",
    component: ForgotPasswordPage,
  },
  {
    path: "/mentions-legales",
    label: "Mentions légales",
    component: LegalPage,
  },
  {
    path: "/confidentialite",
    label: "Confidentialité",
    component: PrivacyPage,
  },
  {
    path: "/admin",
    label: "Espace admin",
    component: () => <PlaceholderPage title="Espace admin" />,
  },
  {
    path: "*",
    label: "Page introuvable",
    component: NotFoundPage,
  },
];
