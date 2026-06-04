// Simple validation middleware for favorites endpoints

const validateAddFavorite = (req, res, next) => {
    const { productId } = req.body;
    if (productId === undefined) {
        return res.status(400).json({ message: 'productId manquant.' });
    }
    const id = parseInt(productId, 10);
    if (Number.isNaN(id) || id <= 0) {
        return res.status(400).json({ message: 'productId invalide.' });
    }
    req.body.productId = id;
    next();
}

const validateDeleteFavorite = (req, res, next) => {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id) || id <= 0) {
        return res.status(400).json({ message: 'Identifiant invalide.' });
    }
    next();
}

module.exports = { validateAddFavorite, validateDeleteFavorite };
