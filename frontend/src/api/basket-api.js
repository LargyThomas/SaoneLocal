// TODO API panier
// Ces fonctions serviront à connecter CartPage au backend.
// Elles devront toutes envoyer le JWT dans le header Authorization.

// Exemple de header attendu :
// headers: {
//   "Content-Type": "application/json",
//   Authorization: `Bearer ${token}`,
// }

// Fonctions à créer :
// - fetchBasket() -> GET /api/basket
// - addBasketItem(productId, quantity) -> POST /api/basket
// - removeBasketItem(basketItemsId) -> DELETE /api/basket/:id

// Attention :
// Le backend protège ces routes avec authMiddleware + rôle client.
// Donc sans token valide, le backend refusera la requête.
