// Validates query parameters for catalog routes
// Checks page number, category, producer filters and text search before reaching the controller

const validateGetCatalog = (req, res, next) => {
    const { page, category, producer, q, search } = req.query

    if (page && (isNaN(page) || parseInt(page) < 1)) {
        return res.status(400).json({ message: 'Le numero de page doit etre un entier positif.' })
    }

    if (category && (isNaN(category) || parseInt(category) < 1)) {
        return res.status(400).json({ message: 'L\'identifiant de la categorie doit etre un nombre positif.' })
    }

    if (producer && (isNaN(producer) || parseInt(producer) < 1)) {
        return res.status(400).json({ message: 'L\'identifiant du producteur doit etre un nombre positif.' })
    }

    const textSearch = q || search
    if (textSearch && (typeof textSearch !== 'string' || textSearch.trim().length > 100)) {
        return res.status(400).json({ message: 'La recherche doit contenir 100 caracteres maximum.' })
    }

    next()
}

// Validates request body for producer catalog management routes
// Checks required fields for product creation and update
const validateCreateProduct = (req, res, next) => {
    const { productName, productPrice, categoryId } = req.body

    if (!productName || typeof productName !== 'string' || productName.trim() === '') {
        return res.status(400).json({ message: 'Le nom du produit est requis.' })
    }

    if (productPrice === undefined || productPrice === null || isNaN(productPrice) || parseFloat(productPrice) < 0) {
        return res.status(400).json({ message: 'Le prix du produit est requis et doit etre un nombre valide.' })
    }

    if (categoryId === undefined || categoryId === null || isNaN(categoryId)) {
        return res.status(400).json({ message: 'La categorie est requise et doit etre un identifiant valide.' })
    }

    next()
}

const validateUpdateProduct = (req, res, next) => {
    const { productName, productPrice, categoryId, subcategoryId } = req.body

    if (productName !== undefined && (typeof productName !== 'string' || productName.trim() === '')) {
        return res.status(400).json({ message: 'Le nom du produit ne peut pas etre vide.' })
    }

    if (productPrice !== undefined && (isNaN(productPrice) || parseFloat(productPrice) < 0)) {
        return res.status(400).json({ message: 'Le prix du produit doit etre un nombre valide.' })
    }

    if (categoryId !== undefined && isNaN(categoryId)) {
        return res.status(400).json({ message: 'L\'identifiant de la categorie doit etre un nombre valide.' })
    }

    if (subcategoryId !== undefined && isNaN(subcategoryId)) {
        return res.status(400).json({ message: 'L\'identifiant de la sous-categorie doit etre un nombre valide.' })
    }

    next()
}

module.exports = { validateGetCatalog, validateCreateProduct, validateUpdateProduct }
