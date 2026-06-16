import { routes } from "../routes.jsx";

const navRoutes = routes.filter((route) => route.showInNav);

export function PublicLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-[#fbfaf5] text-slate-900">
      <header className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between">
        <a className="text-xl font-extrabold text-[#16251b]" href="/">
          SaoneLocal
        </a>
        <nav
          className="flex flex-wrap gap-x-4 gap-y-2 text-sm font-medium text-slate-600"
          aria-label="Navigation principale"
        >
          {navRoutes.map((route) => (
            <a className="hover:text-[#287347]" key={route.path} href={route.path}>
              {route.label}
            </a>
          ))}
        </nav>
      </header>

      {children}

      <footer className="mx-auto mt-auto w-full max-w-6xl border-t border-slate-200 px-4 py-6 text-sm text-slate-500">
        <p>SaoneLocal - plateforme locale en construction.</p>
      </footer>
    </div>
  );
}
