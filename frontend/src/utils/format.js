export function formatPrice(value) {
  const price = Number(value);

  if (Number.isNaN(price)) {
    return "";
  }

  return new Intl.NumberFormat("fr-FR", {
    currency: "EUR",
    style: "currency",
  }).format(price);
}
