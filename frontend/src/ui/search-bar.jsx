export function SearchBar({ value, onChange, onSubmit, disabled = false }) {
  return (
    <form className="flex w-full flex-col gap-2 sm:flex-row" onSubmit={onSubmit}>
      <label className="sr-only" htmlFor="catalog-search">
        Rechercher un produit
      </label>
      <input
        className="min-h-11 flex-1 rounded-md border border-slate-300 bg-white px-3 text-base text-slate-900 outline-none transition focus:border-[#287347] focus:ring-2 focus:ring-[#287347]/20"
        disabled={disabled}
        id="catalog-search"
        name="q"
        onChange={(event) => onChange(event.target.value)}
        placeholder="Rechercher un produit"
        type="search"
        value={value}
      />
      <button
        className="min-h-11 rounded-md bg-[#287347] px-4 text-sm font-bold text-white transition hover:bg-[#1f5f39] disabled:cursor-not-allowed disabled:bg-slate-300"
        disabled={disabled}
        type="submit"
      >
        Rechercher
      </button>
    </form>
  );
}
