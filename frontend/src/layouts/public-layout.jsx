import NavbarPublic from "../ui/navbar.jsx";
import Footer from "../ui/footer.jsx"

export function PublicLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-[#fbfaf5] text-slate-900">
      <NavbarPublic />

      <main className="flex-1">
        {children}
      </main>

      <Footer />
    </div>
  );
}