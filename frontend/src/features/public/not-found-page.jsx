import Button from "../../ui/button.jsx";
import { useSeo } from "../../hooks/use-seo.js";

export function NotFoundPage() {
  useSeo({
    title: "Page introuvable",
    description: "La page demandée n'existe pas ou n'est plus disponible sur SaôneLocal.",
  });

  return (
    <main className="relative isolate flex min-h-[calc(100vh-140px)] overflow-hidden bg-soft-linen px-4 py-12">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 opacity-70"
        style={{
          backgroundImage:
            "radial-gradient(circle at 18% 20%, rgba(232, 214, 48, 0.28) 0 90px, transparent 92px), radial-gradient(circle at 84% 12%, rgba(57, 130, 54, 0.16) 0 130px, transparent 132px), radial-gradient(circle at 78% 82%, rgba(119, 80, 44, 0.12) 0 150px, transparent 152px)",
        }}
      />

      <div className="mx-auto flex w-full max-w-6xl items-center">
        <section className="relative w-full overflow-hidden rounded-card border border-coffee-beans/10 bg-[#fffdf7]/95 p-6 shadow-[0_24px_70px_rgba(36,17,5,0.12)] backdrop-blur sm:p-8 lg:grid lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-10 lg:p-10">
          <div
            aria-hidden="true"
            className="absolute -right-16 -top-16 h-40 w-40 rounded-full border-[18px] border-golden-glow/40"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-20 -left-20 h-52 w-52 rounded-full bg-muted-olive/20"
          />

          <div className="relative flex min-h-64 items-center justify-center rounded-card bg-gradient-to-br from-vanilla-custard via-soft-linen to-golden-glow/45 p-6">
            <div
              aria-hidden="true"
              className="absolute inset-4 rounded-card border border-coffee-beans/10"
            />

            <div className="text-center">
              <p className="font-display text-[5rem] leading-none text-coffee-beans drop-shadow-sm sm:text-[7rem] lg:text-[8rem]">
                404
              </p>
              <div className="mx-auto mt-4 flex w-fit items-center gap-2 rounded-full border border-coffee-beans/10 bg-white/80 px-4 py-2 text-sm font-extrabold text-forest-green shadow-sm">
                Panier égaré
              </div>
            </div>
          </div>

          <div className="relative mt-8 lg:mt-0">
            <p className="inline-flex rounded-card bg-golden-glow px-3 py-1 font-display text-sm text-coffee-beans shadow-sm">
              Erreur 404
            </p>

            <h1 className="mt-5 max-w-2xl break-words font-display text-4xl leading-tight text-coffee-beans sm:text-5xl">
              Oups, cette page n’est pas dans le marché.
            </h1>

            <p className="mt-5 max-w-xl text-lg leading-8 text-coffee-beans/75">
              L'adresse demandée ne correspond à aucune page publique de SaôneLocal. 
              Le produit a peut-être changé d’étal, ou le lien n’existe plus.
            </p>

            <div className="mt-8 grid gap-3 sm:flex">
              <Button as="a" className="w-full sm:w-auto" href="/">
                Retour à l'accueil
              </Button>

              <Button as="a" className="w-full sm:w-auto" href="/catalogue" variant="secondary">
                Voir le catalogue
              </Button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
