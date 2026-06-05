// Receives HTTP requests from basket routes
// Calls basket service functions and sends JSON responses back to the client

const basketService = require('./basket.service.js')

const getBasket = async (req, res) => {
    try {
        const basket = await basketService.getBasket(req.user.email)
        res.status(200).json(basket)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Erreur serveur' })
    }
}

const addToBasket = async (req, res) => {
    try {
        const basket = await basketService.addToBasket(req.user.email, req.body)
        res.status(200).json(basket)
    } catch (err) {
        if (err.message === 'PRODUCT_NOT_FOUND') {
            return res.status(404).json({ error: 'Produit introuvable' })
        }
        console.error(err)
        res.status(500).json({ error: 'Erreur serveur' })
    }
}

const removeFromBasket = async (req, res) => {
    try {
        const basket = await basketService.removeFromBasket(req.user.email, req.params.id)
        res.status(200).json(basket)
    } catch (err) {
        if (err.message === 'ITEM_NOT_FOUND') {
            return res.status(404).json({ error: 'Produit introuvable dans le panier' })
        }
        console.error(err)
        res.status(500).json({ error: 'Erreur serveur' })
    }
}

module.exports = { getBasket, addToBasket, removeFromBasket }