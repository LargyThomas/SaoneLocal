import NavbarPublic from "../ui/navbar.jsx";
import Footer from "../ui/footer.jsx";

export function PublicLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-soft-linen text-coffee-beans">
      <NavbarPublic />

      <main className="flex-1 overflow-x-hidden">
        {children}
      </main>

      <Footer />
    </div>
  );
}
