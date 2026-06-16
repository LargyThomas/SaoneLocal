export function NotFoundPage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-4 py-16">
      <p className="mb-3 text-xs font-extrabold uppercase tracking-widest text-[#287347]">Erreur 404</p>
      <h1 className="text-4xl font-extrabold text-[#16251b]">Page introuvable</h1>
      <p className="mt-4 max-w-xl leading-7 text-slate-600">
        Cette adresse ne correspond a aucune page publique de SaoneLocal.
      </p>
      <a
        className="mt-6 inline-flex w-fit rounded-lg bg-[#287347] px-5 py-3 text-sm font-bold text-white hover:bg-[#16251b]"
        href="/"
      >
        Retour a l'accueil
      </a>
    </main>
  );
}
