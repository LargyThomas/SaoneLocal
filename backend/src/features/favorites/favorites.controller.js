const favoritesService = require('./favorites.service');

// GET /api/favorites
exports.getFavorites = async (req, res) => {
    try {
        const userEmail = req.user.email;
        const favorites = await favoritesService.getFavoritesByUser(userEmail);
        res.status(200).json({ favorites });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur.' });
    }
}

// POST /api/favorites
exports.addFavorite = async (req, res) => {
    try {
        const userEmail = req.user.email;
        const { productId } = req.body;
        await favoritesService.addFavorite(userEmail, productId);
        res.status(201).json({ message: 'Favori ajouté.' });
    } catch (error) {
        if (error.message === 'ALREADY_FAVORITE') {
            return res.status(409).json({ message: 'Produit déjà en favoris.' });
        }
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur.' });
    }
}

// DELETE /api/favorites/:id
exports.deleteFavorite = async (req, res) => {
    try {
        const userEmail = req.user.email;
        const productId = parseInt(req.params.id, 10);
        await favoritesService.removeFavorite(userEmail, productId);
        res.status(200).json({ message: 'Favori retiré.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur.' });
    }
}
