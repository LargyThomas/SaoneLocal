import { useEffect, useState } from "react";
import { fetchCatalog } from "../../api/catalog-api.js";
import Badge from "../../ui/badge.jsx";
import Button from "../../ui/button.jsx";
import ProductCard from "../../ui/product-card.jsx";
import { SearchBar } from "../../ui/search-bar.jsx";

const categories = [
  { id: "", label: "Tout" },
  { id: "1", label: "Vin" },
  { id: "2", label: "Pain" },
  { id: "3", label: "Viande" },
  { id: "4", label: "Légumes" },
];

const subcategories = [
  { id: "", categoryId: "", label: "Toutes" },
  { id: "1", categoryId: "1", label: "Vin rouge" },
  { id: "2", categoryId: "1", label: "Vin blanc" },
  { id: "3", categoryId: "3", label: "Viande rouge" },
  { id: "4", categoryId: "3", label: "Viande blanche" },
  { id: "5", categoryId: "3", label: "Charcuterie" },
  { id: "6", categoryId: "2", label: "Pain au levain" },
  { id: "7", categoryId: "4", label: "Légumes de saison" },
  { id: "8", categoryId: "2", label: "Viennoiserie" },
];

export function CatalogPage() {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({ total: 0, page: 1, totalPages: 1, limit: 10 });
  const [filters, setFilters] = useState({ q: "", category: "", subcategory: "", page: 1 });
  const [draftSearch, setDraftSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    async function loadCatalog() {
      setIsLoading(true);
      setError("");

      try {
        const result = await fetchCatalog(filters);

        if (!ignore) {
          setProducts(result.products || []);
          setPagination(result.pagination || { total: 0, page: filters.page, totalPages: 1, limit: 10 });
        }
      } catch (requestError) {
        if (!ignore) {
          setProducts([]);
          setError(requestError.message);
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    loadCatalog();

    return () => {
      ignore = true;
    };
  }, [filters]);

  const updateFilter = (key, value) => {
    setFilters((current) => ({
      ...current,
      [key]: value,
      ...(key === "category" ? { subcategory: "" } : {}),
      page: 1,
    }));
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    updateFilter("q", draftSearch);
  };

  const goToPage = (page) => {
    setFilters((current) => ({
      ...current,
      page,
    }));
  };

  const clearFilters = () => {
    setDraftSearch("");
    setFilters({ q: "", category: "", subcategory: "", page: 1 });
  };

  const currentPage = pagination.page || filters.page;
  const totalPages = Math.max(pagination.totalPages || 1, 1);
  const availableSubcategories = subcategories.filter(
    (subcategory) => !subcategory.categoryId || !filters.category || subcategory.categoryId === filters.category
  );
  const hasActiveFilters = Boolean(filters.q || filters.category || filters.subcategory);
  const visibleProductTotal = pagination.total;

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-12 pt-4">
      <section className="mb-6 rounded-card bg-white p-5 shadow-sm sm:p-7">
        <Badge>Catalogue</Badge>
        <h1 className="mt-4 font-display text-3xl leading-tight text-coffee-beans sm:text-4xl">Produits locaux</h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-coffee-beans/75">
          Recherchez, filtrez et trouvez les produits du territoire disponibles dans SaôneLocal.
        </p>
      </section>

      <section className="mb-6 space-y-5 rounded-card bg-white p-4 shadow-sm sm:p-5" aria-label="Recherche et filtres">
        <SearchBar
          disabled={isLoading}
          onChange={setDraftSearch}
          onSubmit={handleSearchSubmit}
          value={draftSearch}
        />

        <div className="grid gap-5 lg:grid-cols-2">
          <fieldset>
            <legend className="mb-3 text-base font-extrabold text-coffee-beans">Catégories</legend>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const isActive = filters.category === category.id;

                return (
                  <button
                    aria-pressed={isActive}
                    className={`min-h-11 cursor-pointer rounded-card border px-4 text-base font-bold transition focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-golden-glow focus-visible:outline-offset-2 ${
                      isActive
                        ? "border-coffee-beans bg-golden-glow text-coffee-beans"
                        : "border-coffee-beans/15 bg-soft-linen text-coffee-beans hover:bg-vanilla-custard"
                    }`}
                    disabled={isLoading}
                    key={category.id || "all"}
                    onClick={() => updateFilter("category", category.id)}
                    type="button"
                  >
                    {category.label}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <fieldset>
            <legend className="mb-3 text-base font-extrabold text-coffee-beans">Sous-catégories</legend>
            <div className="flex flex-wrap gap-2">
              {availableSubcategories.map((subcategory) => {
                const isActive = filters.subcategory === subcategory.id;

                return (
                  <button
                    aria-pressed={isActive}
                    className={`min-h-11 cursor-pointer rounded-card border px-4 text-base font-bold transition focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-golden-glow focus-visible:outline-offset-2 ${
                      isActive
                        ? "border-coffee-beans bg-golden-glow text-coffee-beans"
                        : "border-coffee-beans/15 bg-soft-linen text-coffee-beans hover:bg-vanilla-custard"
                    }`}
                    disabled={isLoading}
                    key={subcategory.id || "all-subcategories"}
                    onClick={() => updateFilter("subcategory", subcategory.id)}
                    type="button"
                  >
                    {subcategory.label}
                  </button>
                );
              })}
            </div>
          </fieldset>
        </div>

        {hasActiveFilters ? (
          <div className="flex flex-col gap-3 rounded-card bg-soft-linen p-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2 text-sm font-bold text-coffee-beans">
              {filters.q ? <span className="rounded-card bg-golden-glow px-3 py-1">Recherche : {filters.q}</span> : null}
              {filters.category ? (
                <span className="rounded-card bg-golden-glow px-3 py-1">
                  Catégorie : {categories.find((category) => category.id === filters.category)?.label}
                </span>
              ) : null}
              {filters.subcategory ? (
                <span className="rounded-card bg-golden-glow px-3 py-1">
                  Sous-catégorie : {subcategories.find((subcategory) => subcategory.id === filters.subcategory)?.label}
                </span>
              ) : null}
            </div>
            <Button className="w-full sm:w-auto" disabled={isLoading} onClick={clearFilters} variant="ghost">
              Réinitialiser
            </Button>
          </div>
        ) : null}
      </section>

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 text-base font-semibold text-coffee-beans">
        <p>{visibleProductTotal} produit{visibleProductTotal > 1 ? "s" : ""}</p>
        <p className="text-sm text-coffee-beans/70">Page {currentPage} sur {totalPages}</p>
      </div>

      {error ? (
        <div className="rounded-card border border-inferno bg-white px-4 py-5 text-base text-inferno">
          <p className="font-display text-xl">Impossible de charger le catalogue</p>
          <p className="mt-2 font-bold">{error}</p>
        </div>
      ) : null}

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-live="polite">
          {Array.from({ length: 6 }).map((_, index) => (
            <div className="rounded-card bg-white p-3 shadow-sm" key={index}>
              <div className="aspect-[4/3] animate-pulse rounded-card bg-vanilla-custard" />
              <div className="mt-4 h-4 w-24 animate-pulse rounded-card bg-golden-glow/70" />
              <div className="mt-4 h-6 w-3/4 animate-pulse rounded-card bg-coffee-beans/10" />
              <div className="mt-3 h-4 w-full animate-pulse rounded-card bg-coffee-beans/10" />
              <div className="mt-5 h-11 w-full animate-pulse rounded-button bg-muted-olive/30" />
            </div>
          ))}
        </div>
      ) : null}

      {!isLoading && !error && products.length === 0 && hasActiveFilters ? (
        <div className="rounded-card border border-coffee-beans/10 bg-white px-4 py-8 text-center text-coffee-beans">
          <p className="font-display text-2xl">Aucun résultat</p>
          <p className="mx-auto mt-3 max-w-md text-base leading-7 text-coffee-beans/75">
            Aucun produit ne correspond aux filtres. Essayez une autre recherche ou réinitialisez les filtres.
          </p>
          {hasActiveFilters ? (
            <Button className="mt-5 w-full sm:w-auto" onClick={clearFilters} variant="secondary">
              Réinitialiser les filtres
            </Button>
          ) : null}
        </div>
      ) : null}

      {!isLoading && !error && products.length > 0 ? (
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-label="Liste des produits">
          {products.map((product) => (
            <ProductCard key={product.productid} product={product} />
          ))}
        </section>
      ) : null}

      <nav className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center" aria-label="Pagination catalogue">
        <Button
          className="w-full sm:justify-self-start"
          disabled={isLoading || currentPage <= 1}
          onClick={() => goToPage(currentPage - 1)}
          variant="ghost"
        >
          Précédent
        </Button>
        <span className="order-first rounded-card bg-vanilla-custard px-3 py-2 text-center text-sm font-extrabold text-coffee-beans sm:order-none">
          Page {currentPage} / {totalPages}
        </span>
        <Button
          className="w-full sm:justify-self-end"
          disabled={isLoading || currentPage >= totalPages}
          onClick={() => goToPage(currentPage + 1)}
          variant="ghost"
        >
          Suivant
        </Button>
      </nav>
    </div>
  );
}
