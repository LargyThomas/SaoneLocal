// TODO panier client
// Cette page devra afficher le panier de l'utilisateur connecté.
// Le backend existe déjà avec ces routes :
// - GET /api/basket       -> récupérer le panier
// - POST /api/basket      -> ajouter un produit au panier
// - DELETE /api/basket/:id -> supprimer une ligne du panier

// Étapes à faire demain :
// 1. Créer les fonctions API dans src/api/basket-api.js.
// 2. Récupérer le token JWT stocké après connexion.
// 3. Envoyer le token dans les headers avec Authorization: Bearer <token>.
// 4. Dans cette page, charger le panier avec useEffect.
// 5. Stocker les articles du panier avec useState.
// 6. Afficher chaque article : image, nom, quantité, prix total.
// 7. Ajouter un bouton "Supprimer" qui appelle DELETE /api/basket/:id.
// 8. Calculer le total du panier côté front pour l'affichage.
// 9. Ajouter un bouton "Valider mon panier" vers /commande.
// 10. Si l'utilisateur n'est pas connecté, le rediriger vers /connexion.

// Structure :
// const [cartItems, setCartItems] = useState([]);
// const [isLoading, setIsLoading] = useState(true);
// const [error, setError] = useState("");

// Pour l'instant, la route /panier utilise encore une page placeholder.
// Quand cette page sera prête, il faudra l'importer dans routes.jsx.
