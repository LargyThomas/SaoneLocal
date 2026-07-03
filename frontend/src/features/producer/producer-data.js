export const categoryOptions = [
  { id: 1, label: "Vin" },
  { id: 2, label: "Pain" },
  { id: 3, label: "Viande" },
  { id: 4, label: "Légumes" },
];

export const subcategoryOptions = [
  { categoryId: 1, id: 1, label: "Vin rouge" },
  { categoryId: 1, id: 2, label: "Vin blanc" },
  { categoryId: 3, id: 3, label: "Viande rouge" },
  { categoryId: 3, id: 4, label: "Viande blanche" },
  { categoryId: 3, id: 5, label: "Charcuterie" },
  { categoryId: 2, id: 6, label: "Pain au levain" },
  { categoryId: 4, id: 7, label: "Légumes de saison" },
  { categoryId: 2, id: 8, label: "Viennoiserie" },
];

export const orderStatuses = {
  a: { label: "Annulée", variant: "danger" },
  e: { label: "En cours de préparation", variant: "warning" },
  n: { label: "Nouvelle", variant: "warning" },
  p: { label: "Prête", variant: "success" },
  r: { label: "Récupérée", variant: "muted" },
};

export const statusActions = [
  { label: "En cours de préparation", value: "e" },
  { label: "Préparée", value: "p" },
  { label: "En cours de livraison", value: "r" },
  { label: "Annuler", value: "a" },
];

export function getProducerName(profile) {
  return `${profile?.usersfirstname || ""} ${profile?.userslastname || ""}`.trim() || "Producteur";
}

export function formatDate(value) {
  if (!value) {
    return "Date à venir";
  }

  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "medium",
  }).format(new Date(value));
}

export function groupOrders(rows = []) {
  return rows.reduce((orders, row) => {
    const orderId = row.ordersid;
    const order = orders.get(orderId) || {
      clientName: `${row.usersfirstname || ""} ${row.userslastname || ""}`.trim() || "Client",
      date: row.ordersdate,
      id: orderId,
      items: [],
      status: row.ordersstatus,
      total: row.orderstotalcost || 0,
    };

    order.items.push(row);
    orders.set(orderId, order);
    return orders;
  }, new Map());
}
