import { useEffect, useState } from "react";
import { fetchCatalog } from "../../api/catalog-api.js";
import { SearchBar } from "../../ui/search-bar.jsx";

const categories = [
  { id: "", label: "Toutes les categories" },
  { id: "1", label: "Vin" },
  { id: "2", label: "Pain" },
  { id: "3", label: "Viande" },
];

function formatPrice(value) {
  const price = Number(value);

  if (Number.isNaN(price)) {
    return "";
  }

  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(price);
}

export function CatalogPage() {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({ total: 0, page: 1, totalPages: 1, limit: 10 });
  const [filters, setFilters] = useState({ q: "", category: "", producer: "", page: 1 });
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

  const currentPage = pagination.page || filters.page;
  const totalPages = Math.max(pagination.totalPages || 1, 1);

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-12 pt-4">
      <section className="mb-6">
        <p className="text-xs font-extrabold uppercase text-[#287347]">Catalogue</p>
        <h1 className="mt-2 text-3xl font-extrabold text-[#16251b] sm:text-4xl">Produits locaux</h1>
      </section>

      <section className="mb-6 space-y-3" aria-label="Recherche et filtres">
        <SearchBar
          disabled={isLoading}
          onChange={setDraftSearch}
          onSubmit={handleSearchSubmit}
          value={draftSearch}
        />

        <div className="grid gap-3 sm:grid-cols-2">
          <label className="flex flex-col gap-1 text-sm font-semibold text-slate-700">
            Categorie
            <select
              className="min-h-11 rounded-md border border-slate-300 bg-white px-3 text-base font-normal text-slate-900 outline-none focus:border-[#287347] focus:ring-2 focus:ring-[#287347]/20"
              onChange={(event) => updateFilter("category", event.target.value)}
              value={filters.category}
            >
              {categories.map((category) => (
                <option key={category.id || "all"} value={category.id}>
                  {category.label}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1 text-sm font-semibold text-slate-700">
            Producteur
            <input
              className="min-h-11 rounded-md border border-slate-300 bg-white px-3 text-base font-normal text-slate-900 outline-none focus:border-[#287347] focus:ring-2 focus:ring-[#287347]/20"
              onChange={(event) => updateFilter("producer", event.target.value)}
              placeholder="Id producteur"
              min="1"
              type="number"
              value={filters.producer}
            />
          </label>
        </div>
      </section>

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-600">
        <p>{pagination.total} produit{pagination.total > 1 ? "s" : ""}</p>
        {filters.q ? <p>Recherche : {filters.q}</p> : null}
      </div>

      {error ? (
        <p className="rounded-md border border-red-200 bg-red-50 px-3 py-3 text-sm font-semibold text-red-700">{error}</p>
      ) : null}

      {isLoading ? (
        <p className="py-8 text-center text-sm font-semibold text-slate-600">Chargement du catalogue...</p>
      ) : null}

      {!isLoading && !error && products.length === 0 ? (
        <p className="rounded-md border border-slate-200 bg-white px-3 py-6 text-center text-sm font-semibold text-slate-600">
          Aucun produit ne correspond aux filtres.
        </p>
      ) : null}

      {!isLoading && products.length > 0 ? (
        <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3" aria-label="Liste des produits">
          {products.map((product) => (
            <article className="rounded-md border border-slate-200 bg-white p-4 shadow-sm" key={product.productid}>
              <div className="mb-4 flex aspect-[4/3] items-center justify-center rounded-md bg-[#eef3ed] text-sm font-semibold text-slate-500">
                {product.productpicture ? (
                  <img
                    alt=""
                    className="h-full w-full rounded-md object-cover"
                    src={product.productpicture}
                  />
                ) : (
                  <span>Image a venir</span>
                )}
              </div>
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase text-[#287347]">{product.categoryname || "Produit local"}</p>
                <h2 className="text-lg font-extrabold text-[#16251b]">{product.productname}</h2>
                <p className="text-sm leading-6 text-slate-600">{product.productdesc}</p>
                <div className="flex items-center justify-between gap-3 pt-2">
                  <span className="text-base font-extrabold text-slate-900">{formatPrice(product.productprice)}</span>
                  <span className="text-xs font-semibold text-slate-500">Producteur {product.producerid}</span>
                </div>
              </div>
            </article>
          ))}
        </section>
      ) : null}

      <nav className="mt-6 flex items-center justify-between gap-3" aria-label="Pagination catalogue">
        <button
          className="min-h-11 rounded-md border border-slate-300 bg-white px-4 text-sm font-bold text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={isLoading || currentPage <= 1}
          onClick={() => goToPage(currentPage - 1)}
          type="button"
        >
          Precedent
        </button>
        <span className="text-sm font-semibold text-slate-600">
          Page {currentPage} / {totalPages}
        </span>
        <button
          className="min-h-11 rounded-md border border-slate-300 bg-white px-4 text-sm font-bold text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={isLoading || currentPage >= totalPages}
          onClick={() => goToPage(currentPage + 1)}
          type="button"
        >
          Suivant
        </button>
      </nav>
    </main>
  );
}
