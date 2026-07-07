import logoVisa from "../../assets/icons/logo-visa.png";
import logoMastercard from "../../assets/icons/logo-mastercard.png";
import logoPaypal from "../../assets/icons/logo-paypal.png";

const footerLinks = [
  {
    title: "Liens utiles",
    links: [
      { label: "Catalogue", href: "/catalogue" },
      { label: "Producteurs", href: "/producteurs" },
      { label: "Calendrier", href: "/calendrier" },
      { label: "À propos", href: "/a-propos" },
    ],
  },
  {
    title: "Informations",
    links: [
      { label: "Mentions légales", href: "/mentions-legales" },
      { label: "Confidentialité", href: "/confidentialite" },
      { label: "Contact", href: "mailto:contact@saonelocal.fr" },
    ],
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-soft-linen px-3 pb-5">
      <div className="mx-auto max-w-6xl rounded-card border border-coffee-beans/10 bg-white p-5 shadow-sm sm:p-6">
        <div className="grid gap-7 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <section>
            <a className="text-xl font-extrabold text-coffee-beans" href="/">
              Saône<span className="text-forest-green">Local</span>
            </a>
            <p className="mt-3 max-w-sm text-sm leading-6 text-coffee-beans/70">
              Le meilleur du terroir, en direct de producteurs proches de chez vous.
            </p>
          </section>

          {footerLinks.map((section) => (
            <section key={section.title}>
              <h2 className="text-sm font-extrabold uppercase tracking-wide text-coffee-beans">{section.title}</h2>
              <ul className="mt-3 grid gap-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <a className="text-sm font-semibold text-coffee-beans/65 hover:text-green" href={link.href}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ))}

          <section>
            <h2 className="text-sm font-extrabold uppercase tracking-wide text-coffee-beans">Paiement sécurisé</h2>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <img src={logoVisa} alt="Visa" className="h-6 w-auto object-contain" />
              <img src={logoMastercard} alt="Mastercard" className="h-6 w-auto object-contain" />
              <img src={logoPaypal} alt="PayPal" className="h-6 w-auto object-contain" />
            </div>
            <p className="mt-3 text-sm leading-6 text-coffee-beans/65">Retrait local ou livraison selon les producteurs.</p>
          </section>
        </div>

        <p className="mt-6 border-t border-coffee-beans/10 pt-4 text-center text-xs font-semibold text-coffee-beans/55">
          Copyright {currentYear} SaôneLocal. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
