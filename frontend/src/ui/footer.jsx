import { useState } from "react"
import { FaFacebookF, FaInstagram, FaEnvelope, FaChevronDown, FaChevronUp } from "react-icons/fa"

function FooterSection({ id, title, children, isOpen, onToggle }) {
  return (
    <section className="w-full border-b border-gray-700 py-4 md:border-none md:py-0">
      <button type="button" onClick={onToggle} aria-expanded={isOpen} aria-controls={id} className="flex w-full items-center justify-between text-left md:pointer-events-none md:justify-center">
        <h2 className="text-lg font-bold text-white">{title}</h2>

        <span className="md:hidden"> {isOpen ? ( <FaChevronUp className="text-white" /> ) : ( <FaChevronDown className="text-white" /> )} </span>
      </button>

      <div id={id} className={`${isOpen ? "block" : "hidden"} mt-4 md:block`}>{children}</div>
    </section>
  )
}

function Footer() {
  const [openSection, setOpenSection] = useState("reseaux")

  const toggleSection = (section) => { setOpenSection(openSection === section ? "" : section) }

  return (
    <footer className="bg-gray-900 px-4 py-8 text-white md:px-16 lg:px-28">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 text-center md:grid-cols-3 md:gap-8">
        <FooterSection id="footer-links" title="Liens utiles" isOpen={openSection === "liens"} onToggle={() => toggleSection("liens")}>
          <ul className="space-y-2 text-gray-300">
            <li><a href="#" className="block rounded-md p-3 transition hover:bg-sky-500 hover:text-white">À propos</a></li>
            <li><a href="#" className="block rounded-md p-3 transition hover:bg-sky-500 hover:text-white">Calendrier</a></li>
            <li><a href="#" className="block rounded-md p-3 transition hover:bg-sky-500 hover:text-white">Difficultés à lire</a></li>
          </ul>
        </FooterSection>

        <FooterSection id="footer-info" title="Informations" isOpen={openSection === "informations"} onToggle={() => toggleSection("informations")}>
          <ul className="space-y-2 text-gray-300">
            <li><a href="#" className="block rounded-md p-3 transition hover:bg-sky-500 hover:text-white">Mentions légales</a></li>
            <li><a href="#" className="block rounded-md p-3 transition hover:bg-sky-500 hover:text-white">Politique de confidentialité</a></li>
            <li><a href="#" className="block rounded-md p-3 transition hover:bg-sky-500 hover:text-white">Politique de remboursement</a></li>
          </ul>
        </FooterSection>

        <FooterSection id="footer-socials" title="Nos réseaux" isOpen={openSection === "reseaux"} onToggle={() => toggleSection("reseaux")}>
          <ul className="space-y-2 text-gray-300">
            <li><a href="#" className="flex items-center justify-center gap-3 rounded-md p-3 transition hover:bg-sky-500 hover:text-white md:justify-start"><FaFacebookF />Facebook</a></li>
            <li><a href="#" className="flex items-center justify-center gap-3 rounded-md p-3 transition hover:bg-sky-500 hover:text-white md:justify-start"><FaInstagram />Instagram</a></li>
            <li><a href="#" className="inline-flex items-center justify-center gap-3 rounded-md bg-sky-500 px-5 py-3 font-medium text-white shadow-md transition hover:bg-sky-600"><FaEnvelope />Nous contacter</a></li>
          </ul>
        </FooterSection>
      </div>

      <div className="mx-auto mt-8 max-w-6xl border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
        <p>© 2026 SaôneLocal. Tous droits réservés.</p>
      </div>
    </footer>
  )
}

export default Footer