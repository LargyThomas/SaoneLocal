export function PlaceholderPage({ title }) {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-4 py-16">
      <p className="mb-4 inline-flex w-fit rounded-card bg-golden-glow px-3 py-1 font-display text-sm text-coffee-beans">
        Page prévue
      </p>
      <h1 className="font-display text-4xl text-coffee-beans">{title}</h1>
      <p className="mt-4 max-w-xl text-lg leading-8 text-coffee-beans/75">
        Cette page est déclarée dans les routes publiques, mais elle sera construite
        plus tard pour garder une progression simple.
      </p>
    </div>
  );
}
