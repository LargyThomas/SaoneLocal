import { useState } from "react";
import Button from "./button.jsx";

const navLinks = [
  { label: "Catalogue", href: "/catalogue" },
  { label: "Producteurs", href: "/producteurs" },
  { label: "Calendrier", href: "/calendrier" },
  { label: "À propos", href: "/a-propos" },
];

function Icon({ type }) {
  const paths = {
    search: "m20 20-4.5-4.5m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z",
    cart: "M4 5h2l2 10h9l2-7H7m3 12h.01M17 20h.01",
    user: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm7 8a7 7 0 0 0-14 0",
  };

  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
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

function MenuToggleIcon({ isOpen }) {
  return (
    <span
      aria-hidden="true"
      className="relative flex h-5 w-5 items-center justify-center"
    >
      <span
        className={`absolute h-0.5 w-5 rounded-full bg-coffee-beans transition duration-200 ${
          isOpen ? "rotate-45" : "-translate-y-1.5"
        }`}
      />
      <span
        className={`absolute h-0.5 w-5 rounded-full bg-coffee-beans transition duration-200 ${
          isOpen ? "opacity-0" : "opacity-100"
        }`}
      />
      <span
        className={`absolute h-0.5 w-5 rounded-full bg-coffee-beans transition duration-200 ${
          isOpen ? "-rotate-45" : "translate-y-1.5"
        }`}
      />
    </span>
  );
}

export default function NavbarPublic() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 bg-soft-linen/95 px-3 py-3 backdrop-blur">
      <div className="mx-auto flex min-h-16 max-w-6xl items-center justify-between gap-3 rounded-card border border-coffee-beans/10 bg-white px-4 shadow-sm">
        <a className="flex min-w-0 items-center gap-3" href="/" onClick={closeMenu}>
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-card bg-vanilla-custard text-sm font-extrabold text-forest-green">
            SL
          </span>
          <span className="truncate text-lg font-extrabold text-coffee-beans">SaôneLocal</span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Navigation principale">
          {navLinks.map((link) => (
            <NavLink href={link.href} key={link.href}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-1 lg:flex">
          <Button aria-label="Rechercher" as="a" href="/catalogue" size="sm" variant="ghost">
            <Icon type="search" />
          </Button>
          <Button aria-label="Panier" as="a" href="/panier" size="sm" variant="ghost">
            <Icon type="cart" />
          </Button>
          <Button aria-label="Connexion" as="a" href="/connexion" size="sm" variant="ghost">
            <Icon type="user" />
          </Button>
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
          className="mx-auto mt-2 grid max-w-6xl gap-2 rounded-card border border-coffee-beans/10 bg-white p-3 shadow-sm lg:hidden"
          id="mobile-navigation"
        >
          {navLinks.map((link) => (
            <NavLink href={link.href} key={link.href} onClick={closeMenu}>
              {link.label}
            </NavLink>
          ))}
          <div className="grid gap-2 pt-2 sm:grid-cols-3">
            <Button as="a" href="/catalogue" onClick={closeMenu} variant="ghost">
              <Icon type="search" />
              Recherche
            </Button>
            <Button as="a" href="/panier" onClick={closeMenu} variant="ghost">
              <Icon type="cart" />
              Panier
            </Button>
            <Button as="a" href="/connexion" onClick={closeMenu} variant="secondary">
              <Icon type="user" />
              Connexion
            </Button>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
