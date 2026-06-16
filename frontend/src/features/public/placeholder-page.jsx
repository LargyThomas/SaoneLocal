export function PlaceholderPage({ title }) {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-4 py-16">
      <p className="mb-3 text-xs font-extrabold uppercase tracking-widest text-[#287347]">Page prevue</p>
      <h1 className="text-4xl font-extrabold text-[#16251b]">{title}</h1>
      <p className="mt-4 max-w-xl leading-7 text-slate-600">
        Cette page est declaree dans les routes publiques, mais elle sera construite
        plus tard pour garder une progression simple.
      </p>
    </main>
  );
}
