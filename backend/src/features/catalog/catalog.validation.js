// Validates query parameters for catalog routes
// Checks page number, category and producer filters before reaching the controller

const validateGetCatalog = (req, res, next) => {
    const { page, category, producer } = req.query

    if (page && (isNaN(page) || parseInt(page) < 1)) {
        return res.status(400).json({ message: 'Le numéro de page doit être un entier positif.' })
    }

    if (category && typeof category !== 'string') {
        return res.status(400).json({ message: 'La catégorie doit être une chaîne de caractères.' })
    }

    if (producer && isNaN(producer)) {
        return res.status(400).json({ message: 'L\'identifiant du producteur doit être un nombre.' })
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
        return res.status(400).json({ message: 'Le prix du produit est requis et doit être un nombre valide.' })
    }

    if (categoryId === undefined || categoryId === null || isNaN(categoryId)) {
        return res.status(400).json({ message: 'La catégorie est requise et doit être un identifiant valide.' })
    }

    next()
}

const validateUpdateProduct = (req, res, next) => {
    const { productName, productPrice, categoryId, subcategoryId } = req.body

    if (productName !== undefined && (typeof productName !== 'string' || productName.trim() === '')) {
        return res.status(400).json({ message: 'Le nom du produit ne peut pas être vide.' })
    }

    if (productPrice !== undefined && (isNaN(productPrice) || parseFloat(productPrice) < 0)) {
        return res.status(400).json({ message: 'Le prix du produit doit être un nombre valide.' })
    }

    if (categoryId !== undefined && isNaN(categoryId)) {
        return res.status(400).json({ message: 'L\'identifiant de la catégorie doit être un nombre valide.' })
    }

    if (subcategoryId !== undefined && isNaN(subcategoryId)) {
        return res.status(400).json({ message: 'L\'identifiant de la sous-catégorie doit être un nombre valide.' })
    }

    next()
}

module.exports = { validateGetCatalog, validateCreateProduct, validateUpdateProduct }