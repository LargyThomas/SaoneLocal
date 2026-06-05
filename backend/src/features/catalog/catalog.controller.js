// Receives HTTP requests from catalog routes
// Calls catalog service functions and sends JSON responses back to the client

const catalogService = require('./catalog.service.js')

const getProducts = async (req, res) => {
    try {
        const result = await catalogService.getProducts(req.query)
        res.status(200).json(result)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Erreur serveur' })
    }
}

const getProductById = async (req, res) => {
    try {
        const product = await catalogService.getProductById(req.params.id)
        res.status(200).json(product)
    } catch (err) {
        if (err.message === 'PRODUCT_NOT_FOUND') {
            return res.status(404).json({ error: 'Produit introuvable' })
        }
        console.error(err)
        res.status(500).json({ error: 'Erreur serveur' })
    }
}

const createProduct = async (req, res) => {
    try {
        const product = await catalogService.createProduct(req.user.email, req.body)
        res.status(201).json(product)
    } catch (err) {
        if (err.message === 'PRODUCER_NOT_FOUND') {
            return res.status(404).json({ error: 'Compte producteur introuvable' })
        }
        console.error(err)
        res.status(500).json({ error: 'Erreur serveur' })
    }
}

const updateProduct = async (req, res) => {
    try {
        const product = await catalogService.updateProduct(req.user.email, req.params.id, req.body)
        res.status(200).json(product)
    } catch (err) {
        if (err.message === 'PRODUCT_NOT_FOUND_OR_UNAUTHORIZED') {
            return res.status(404).json({ error: 'Produit introuvable ou accès non autorisé' })
        }
        if (err.message === 'NO_FIELDS_TO_UPDATE') {
            return res.status(400).json({ error: 'Aucun champ à mettre à jour' })
        }
        console.error(err)
        res.status(500).json({ error: 'Erreur serveur' })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const result = await catalogService.deleteProduct(req.user.email, req.params.id)
        res.status(200).json(result)
    } catch (err) {
        if (err.message === 'PRODUCT_NOT_FOUND_OR_UNAUTHORIZED') {
            return res.status(404).json({ error: 'Produit introuvable ou accès non autorisé' })
        }
        console.error(err)
        res.status(500).json({ error: 'Erreur serveur' })
    }
}

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct }