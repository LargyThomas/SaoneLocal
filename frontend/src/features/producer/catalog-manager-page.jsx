import { useEffect, useMemo, useState } from "react";
import { createProduct, deleteProduct, updateProduct } from "../../api/catalog-api.js";
import { fetchProducerProfile, uploadProductPicture } from "../../api/producer-space-api.js";
import Badge from "../../ui/badge.jsx";
import Button from "../../ui/button.jsx";
import Card from "../../ui/card.jsx";
import Container from "../../ui/container.jsx";
import Input from "../../ui/input.jsx";
import Modal from "../../ui/modal.jsx";
import SectionTitle from "../../ui/section-title.jsx";
import { formatPrice } from "../../utils/format.js";
import { categoryOptions, subcategoryOptions } from "./producer-data.js";
import { ProducerGuard } from "./producer-guard.jsx";

const emptyForm = {
  categoryId: "",
  productDesc: "",
  productImage: "",
  productName: "",
  productPrice: "",
  relatedProduct: "",
  subcategoryId: "",
};

function toForm(product) {
  return {
    categoryId: String(product.categoryid || ""),
    productDesc: product.productdesc || "",
    productImage: product.productpicture || "",
    productName: product.productname || "",
    productPrice: String(product.productprice ?? ""),
    relatedProduct: "",
    subcategoryId: String(product.subcategoryid || ""),
  };
}

export function CatalogManagerPage() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const loadProducts = async () => {
    setIsLoading(true);
    setError("");

    try {
      const result = await fetchProducerProfile();
      setProducts(result.resultProduct || []);
    } catch (requestError) {
      setProducts([]);
      setError(requestError.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const availableSubcategories = useMemo(
    () => subcategoryOptions.filter((subcategory) => String(subcategory.categoryId) === String(form.categoryId)),
    [form.categoryId],
  );

  const sameRangeProducts = useMemo(
    () => products.filter((product) => String(product.categoryid) === String(form.categoryId) && product.productid !== editingProduct?.productid),
    [editingProduct, form.categoryId, products],
  );

  const updateField = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
      ...(field === "categoryId" ? { relatedProduct: "", subcategoryId: "" } : {}),
    }));
  };

  const resetForm = () => {
    setEditingProduct(null);
    setForm(emptyForm);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setForm(toForm(product));
    setMessage("");
    window.scrollTo({ behavior: "smooth", top: 0 });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSaving(true);
    setError("");
    setMessage("");

    const payload = {
      categoryId: Number(form.categoryId),
      productDesc: form.productDesc,
      productImage: form.productImage,
      productName: form.productName,
      productPrice: Number(form.productPrice),
      subcategoryId: form.subcategoryId ? Number(form.subcategoryId) : null,
    };

    try {
      if (editingProduct) {
        await updateProduct(editingProduct.productid, payload);
        setMessage("Produit modifié.");
      } else {
        await createProduct(payload);
        setMessage("Produit ajouté.");
      }

      resetForm();
      await loadProducts();
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (!productToDelete) {
      return;
    }

    setIsSaving(true);
    setError("");
    setMessage("");

    try {
      await deleteProduct(productToDelete.productid);
      setMessage("Produit supprimé.");
      setProductToDelete(null);
      await loadProducts();
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleProductImageUpload = async (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setIsUploadingImage(true);
    setError("");
    setMessage("");

    try {
      const result = await uploadProductPicture(file);
      updateField("productImage", result.imageUrl || "");
      setMessage("Image produit ajoutée.");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsUploadingImage(false);
      event.target.value = "";
    }
  };

  return (
    <div className="bg-soft-linen pb-12">
      <Container className="pt-4">
        <ProducerGuard>
          <SectionTitle
            eyebrow="Catalogue producteur"
            title={editingProduct ? "Modifier un produit" : "Ajouter un produit"}
            description="Ajoutez ou mettez à jour vos produits en quelques champs."
          />

          <Card className="mt-5 bg-white p-4 sm:p-6">
            <form className="grid gap-4" onSubmit={handleSubmit}>
              <div className="grid gap-4 md:grid-cols-[180px_1fr]">
                <div className="flex min-h-40 items-center justify-center rounded-photo border border-coffee-beans/15 bg-soft-linen p-3 text-center text-sm font-bold text-coffee-beans/70">
                  {form.productImage ? (
                    <img alt="" className="h-full max-h-48 w-full rounded-photo object-cover" src={form.productImage} />
                  ) : (
                    "Ajouter l'image du produit"
                  )}
                </div>
                <div className="grid gap-4">
                  <Input label="Nom du produit" name="productName" onChange={(event) => updateField("productName", event.target.value)} required value={form.productName} />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Input label="Prix TTC" min="0" name="productPrice" onChange={(event) => updateField("productPrice", event.target.value)} required step="0.01" type="number" value={form.productPrice} />
                    <label className="grid gap-2 text-base font-bold text-coffee-beans">
                      Image du produit
                      <span className="flex min-h-12 cursor-pointer items-center justify-center rounded-card border border-coffee-beans/20 bg-golden-glow px-4 text-center text-base font-extrabold text-coffee-beans transition hover:bg-mustard">
                        {isUploadingImage ? "Envoi de l'image..." : form.productImage ? "Changer l'image" : "Choisir une image"}
                        <input
                          accept="image/jpeg,image/png,image/webp"
                          className="sr-only"
                          disabled={isUploadingImage}
                          onChange={handleProductImageUpload}
                          type="file"
                        />
                      </span>
                      <span className="text-xs font-semibold text-coffee-beans/60">
                        Formats acceptés : JPG, PNG ou WebP. Taille max : 5 Mo.
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              <label className="grid gap-2 text-base font-bold text-coffee-beans">
                Description du produit
                <textarea
                  className="min-h-28 rounded-card border border-coffee-beans/20 bg-white px-4 py-3 outline-none focus:border-green focus:ring-2 focus:ring-golden-glow"
                  onChange={(event) => updateField("productDesc", event.target.value)}
                  value={form.productDesc}
                />
              </label>

              <div className="grid gap-4 sm:grid-cols-3">
                <label className="grid gap-2 text-base font-bold text-coffee-beans">
                  Catégorie
                  <select className="min-h-12 rounded-card border border-coffee-beans/20 bg-white px-4" onChange={(event) => updateField("categoryId", event.target.value)} required value={form.categoryId}>
                    <option value="">Choisir</option>
                    {categoryOptions.map((category) => (
                      <option key={category.id} value={category.id}>{category.label}</option>
                    ))}
                  </select>
                </label>
                <label className="grid gap-2 text-base font-bold text-coffee-beans">
                  Sous-catégorie
                  <select className="min-h-12 rounded-card border border-coffee-beans/20 bg-white px-4" onChange={(event) => updateField("subcategoryId", event.target.value)} value={form.subcategoryId}>
                    <option value="">Choisir</option>
                    {availableSubcategories.map((subcategory) => (
                      <option key={subcategory.id} value={subcategory.id}>{subcategory.label}</option>
                    ))}
                  </select>
                </label>
                <label className="grid gap-2 text-base font-bold text-coffee-beans">
                  Produits de la même gamme
                  <select className="min-h-12 rounded-card border border-coffee-beans/20 bg-white px-4" onChange={(event) => updateField("relatedProduct", event.target.value)} value={form.relatedProduct}>
                    <option value="">Aucun</option>
                    {sameRangeProducts.map((product) => (
                      <option key={product.productid} value={product.productid}>{product.productname}</option>
                    ))}
                  </select>
                </label>
              </div>

              {error ? <p className="rounded-card bg-white px-3 py-2 text-sm font-bold text-inferno">{error}</p> : null}
              {message ? <p className="rounded-card bg-green px-3 py-2 text-sm font-bold text-white">{message}</p> : null}

              <div className="grid gap-3 sm:flex">
                <Button className="w-full sm:w-auto" disabled={isSaving} type="submit">
                  {isSaving ? "Enregistrement..." : editingProduct ? "Modifier le produit" : "Ajouter le produit"}
                </Button>
                {editingProduct ? (
                  <Button className="w-full sm:w-auto" onClick={resetForm} variant="ghost">
                    Annuler
                  </Button>
                ) : null}
              </div>
            </form>
          </Card>

          <section className="mt-8">
            <SectionTitle eyebrow="Mes produits" title="Catalogue actuel" />
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {isLoading ? (
                Array.from({ length: 2 }).map((_, index) => (
                  <Card className="bg-white p-5" key={index}>
                    <div className="h-24 animate-pulse rounded-card bg-vanilla-custard" />
                  </Card>
                ))
              ) : null}

              {!isLoading && products.map((product) => (
                <Card className="grid gap-3 bg-white p-4 sm:grid-cols-[88px_1fr] sm:items-start" key={product.productid}>
                  <div className="flex h-24 items-center justify-center rounded-photo bg-vanilla-custard text-sm font-bold text-brown-bark">
                    {product.productpicture ? (
                      <img alt="" className="h-full w-full rounded-photo object-cover" src={product.productpicture} />
                    ) : "Produit"}
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <h2 className="break-words text-lg font-extrabold text-coffee-beans">{product.productname}</h2>
                        <p className="text-sm font-bold text-green">{formatPrice(product.productprice)}</p>
                      </div>
                      <Badge variant={product.productstatus === "active" ? "success" : "muted"}>{product.productstatus || "statut"}</Badge>
                    </div>
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-coffee-beans/70">{product.productdesc}</p>
                    <div className="mt-4 grid gap-2 sm:flex">
                      <Button className="w-full sm:w-auto" onClick={() => handleEdit(product)} size="sm" variant="secondary">
                        Modifier
                      </Button>
                      <Button className="w-full sm:w-auto" onClick={() => setProductToDelete(product)} size="sm" variant="danger">
                        Supprimer ce produit
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}

              {!isLoading && products.length === 0 ? (
                <Card className="bg-white p-6 text-center font-bold text-coffee-beans">Aucun produit dans votre catalogue.</Card>
              ) : null}
            </div>
          </section>

          <Modal open={Boolean(productToDelete)} onClose={() => setProductToDelete(null)} title="Supprimer ce produit ?">
            <p className="text-base leading-7 text-coffee-beans/75">
              Voulez-vous supprimer “{productToDelete?.productname}” ?
            </p>
            <div className="mt-5 grid gap-3 sm:flex">
              <Button className="w-full sm:w-auto" disabled={isSaving} onClick={confirmDelete} variant="danger">
                Oui
              </Button>
              <Button className="w-full sm:w-auto" onClick={() => setProductToDelete(null)} variant="ghost">
                Non
              </Button>
            </div>
          </Modal>
        </ProducerGuard>
      </Container>
    </div>
  );
}
