// Validates request body for basket routes
// Checks productId and quantity before reaching the controller

const validateAddToBasket = (req, res, next) => {
    const { productId, quantity } = req.body

    if (!productId || isNaN(productId)) {
        return res.status(400).json({ message: 'Un identifiant de produit valide est requis.' })
    }

    if (!quantity || isNaN(quantity) || parseInt(quantity) < 1) {
        return res.status(400).json({ message: 'La quantité doit être un entier positif.' })
    }

    req.body.productId = parseInt(productId)
    req.body.quantity = parseInt(quantity)

    next()
}

module.exports = { validateAddToBasket }