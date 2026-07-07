import { useState } from "react";
import { clearAuthStorage, getAuthToken, getStoredUser } from "../api/api.js";
import Button from "./button.jsx";

const publicLinks = [
  { label: "Catalogue", href: "/catalogue" },
  { label: "Producteurs", href: "/producteurs" },
  { label: "Calendrier", href: "/calendrier" },
  { label: "À propos", href: "/a-propos" },
];

const mobileClientLinks = [
  { label: "Mon panier", href: "/panier" },
  { label: "Mes favoris", href: "/favoris" },
  { label: "Mes commandes", href: "/historique" },
  { label: "Catalogue produits", href: "/catalogue" },
  { label: "Fiches producteurs", href: "/producteurs" },
  { label: "Calendrier", href: "/calendrier" },
  { label: "À propos", href: "/a-propos" },
];

const mobileProducerLinks = [
  { label: "Mon dashboard", href: "/producteur" },
  { label: "Mon catalogue", href: "/producteur/catalogue" },
  { label: "Mes commandes", href: "/producteur/commandes" },
  { label: "Synthèse", href: "/producteur/statistiques" },
  { label: "Catalogue produits", href: "/catalogue" },
  { label: "Calendrier", href: "/calendrier" },
  { label: "À propos", href: "/a-propos" },
];

const mobileAdminLinks = [
  { label: "Espace admin", href: "/admin" },
  { label: "Catalogue produits", href: "/catalogue" },
  { label: "Fiches producteurs", href: "/producteurs" },
  { label: "Calendrier", href: "/calendrier" },
  { label: "À propos", href: "/a-propos" },
];

function Icon({ type, className = "h-5 w-5" }) {
  const paths = {
    bell: "M15 17h5l-1.4-1.4A2 2 0 0 1 18 14.2V11a6 6 0 0 0-12 0v3.2c0 .5-.2 1-.6 1.4L4 17h5m6 0a3 3 0 0 1-6 0",
    cart: "M4 5h2l2 10h9l2-7H7m3 12h.01M17 20h.01",
    search: "m20 20-4.5-4.5m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z",
    user: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm7 8a7 7 0 0 0-14 0",
  };

  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24">
      <path d={paths[type]} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

function NavLink({ href, children, onClick }) {
  const isActive = window.location.pathname === href;

  return (
    <a
      className={`rounded-button px-3 py-2 text-sm font-bold transition hover:bg-vanilla-custard focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-golden-glow focus-visible:outline-offset-2 ${
        isActive ? "bg-golden-glow text-coffee-beans" : "text-coffee-beans"
      }`}
      href={href}
      onClick={onClick}
    >
      {children}
    </a>
  );
}

function MobileLink({ item, onClick }) {
  return (
    <a
      className="flex min-h-10 w-full items-center rounded-button px-3 py-2 text-left text-base font-extrabold text-coffee-beans transition hover:bg-vanilla-custard focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-golden-glow"
      href={item.href}
      onClick={onClick}
    >
      {item.label}
    </a>
  );
}

function MenuToggleIcon({ isOpen }) {
  return (
    <span aria-hidden="true" className="relative flex h-5 w-5 items-center justify-center">
      <span className={`absolute h-0.5 w-5 rounded-full bg-coffee-beans transition duration-200 ${isOpen ? "rotate-45" : "-translate-y-1.5"}`} />
      <span className={`absolute h-0.5 w-5 rounded-full bg-coffee-beans transition duration-200 ${isOpen ? "opacity-0" : "opacity-100"}`} />
      <span className={`absolute h-0.5 w-5 rounded-full bg-coffee-beans transition duration-200 ${isOpen ? "-rotate-45" : "translate-y-1.5"}`} />
    </span>
  );
}

export default function NavbarPublic() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isAuthenticated = Boolean(getAuthToken());
  const user = getStoredUser();
  const isProducer = user?.role === 2;
  const isAdmin = user?.role === 3;
  const accountPath = isAdmin ? "/admin" : isProducer ? "/producteur" : "/profil";
  const mobileAccountLinks = isAdmin ? mobileAdminLinks : isProducer ? mobileProducerLinks : mobileClientLinks;
  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = () => {
    clearAuthStorage();
    window.location.assign("/");
  };

  return (
    <header className="sticky top-0 z-40 bg-soft-linen/95 px-3 py-3 backdrop-blur">
      <div className="mx-auto flex min-h-16 max-w-6xl items-center justify-between gap-3 rounded-card border border-coffee-beans/10 bg-white px-4 shadow-sm">
        <a className="flex min-w-0 items-center gap-3" href="/" onClick={closeMenu}>
          <img
            src="../../assets/icons/logo-saônelocal.png"
            alt="Logo SaôneLocal"
            className="h-10 w-10 shrink-0 object-contain"
          />

          <span className="truncate text-xl font-extrabold text-coffee-beans">
            Saône<span className="text-forest-green">Local</span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Navigation principale">
          {publicLinks.map((link) => (
            <NavLink href={link.href} key={link.href}>
              {link.label}
            </NavLink>
          ))}
          {isAuthenticated ? (
            <NavLink href={accountPath}>{isAdmin ? "Espace admin" : isProducer ? "Espace producteur" : "Espace client"}</NavLink>
          ) : null}
        </nav>

        <div className="hidden items-center gap-1 lg:flex">
          <Button aria-label="Rechercher" as="a" href="/catalogue" size="sm" variant="ghost">
            <Icon type="search" />
          </Button>
          {isAuthenticated ? (
            <Button aria-label="Notifications" as="a" href={accountPath} size="sm" variant="ghost">
              <Icon type="bell" />
            </Button>
          ) : null}
          <Button aria-label="Panier" as="a" href="/panier" size="sm" variant="ghost">
            <Icon type="cart" />
          </Button>
          <Button aria-label={isAuthenticated ? "Profil" : "Connexion"} as="a" href={isAuthenticated ? accountPath : "/connexion"} size="sm" variant="ghost">
            <Icon type="user" />
          </Button>
          {isAuthenticated ? (
            <Button onClick={handleLogout} size="sm" variant="secondary">
              Déconnexion
            </Button>
          ) : null}
        </div>

        <Button
          aria-controls="mobile-navigation"
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          className="lg:hidden"
          onClick={() => setIsMenuOpen((current) => !current)}
          size="sm"
          variant="secondary"
        >
          <MenuToggleIcon isOpen={isMenuOpen} />
        </Button>
      </div>

      {isMenuOpen ? (
        <nav
          aria-label="Navigation mobile"
          className={`mx-auto mt-2 max-w-6xl rounded-card border border-coffee-beans/20 shadow-sm lg:hidden ${
            isAuthenticated ? "bg-white p-0" : "grid gap-2 bg-white p-3"
          }`}
          id="mobile-navigation"
        >
          {isAuthenticated ? (
            <>
              <button
                className="mb-3 min-h-10 w-full cursor-pointer rounded-button border border-coffee-beans/20 bg-golden-glow px-4 py-2 text-center text-base font-extrabold text-coffee-beans shadow-sm transition hover:bg-mustard focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-green"
                onClick={handleLogout}
                type="button"
              >
                Me déconnecter
              </button>
              <div className="grid gap-4 px-3 pb-4">
                {mobileAccountLinks.map((item) => (
                  <MobileLink item={item} key={item.label} onClick={closeMenu} />
                ))}
              </div>
            </>
          ) : (
            <>
              {publicLinks.map((link) => (
                <NavLink href={link.href} key={link.href} onClick={closeMenu}>
                  {link.label}
                </NavLink>
              ))}
              <Button as="a" href="/panier" onClick={closeMenu} variant="ghost">
                <Icon type="cart" />
                Panier
              </Button>
              <Button as="a" href="/connexion" onClick={closeMenu} variant="secondary">
                <Icon type="user" />
                Connexion
              </Button>
            </>
          )}
        </nav>
      ) : null}
    </header>
  );
}
