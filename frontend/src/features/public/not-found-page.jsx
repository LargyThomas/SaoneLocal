import Button from "../../ui/button.jsx";

export function NotFoundPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-4 py-16">
      <p className="mb-4 inline-flex w-fit rounded-card bg-golden-glow px-3 py-1 font-display text-sm text-coffee-beans">
        Erreur 404
      </p>
      <h1 className="font-display text-4xl text-coffee-beans">Page introuvable</h1>
      <p className="mt-4 max-w-xl text-lg leading-8 text-coffee-beans/75">
        Cette adresse ne correspond à aucune page publique de SaôneLocal.
      </p>
      <Button as="a" className="mt-6 w-fit" href="/">
        Retour à l'accueil
      </Button>
    </div>
  );
}
