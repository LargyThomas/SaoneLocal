import Button from "./button.jsx";
import Input from "./input.jsx";

export function SearchBar({ value, onChange, onSubmit, disabled = false }) {
  return (
    <form
      className="grid w-full gap-3 rounded-card border border-coffee-beans/15 bg-vanilla-custard p-3 shadow-sm sm:grid-cols-[1fr_auto]"
      onSubmit={onSubmit}
    >
      <Input
        aria-label="Rechercher un produit"
        className="bg-white"
        disabled={disabled}
        id="catalog-search"
        name="q"
        onChange={(event) => onChange(event.target.value)}
        placeholder="Rechercher un produit local"
        type="search"
        value={value}
      />
      <Button className="w-full sm:w-auto" disabled={disabled} type="submit">
        Rechercher
      </Button>
    </form>
  );
}
