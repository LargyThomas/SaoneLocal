// function

/**
* @description Check if the given id is a number
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @param {Function: next} next, the next function
* @return {Function: next} or {Error} the next function or an error if the id is not valid
*/
const validationId = (req, res, next) => {
    const productId = req.params.id;

    if (productId === undefined) {
        return res.status(400).json({ error: 'Id manquant.' });
    }
    const id = parseInt(productId, 10);
    if (Number.isNaN(id) || id <= 0) {
        return res.status(400).json({ error: "L'Id doit être un nombre." });
    }
    req.params.productId = id;
    next();
}

/**
* @description Check if the information to generate in the catalog is correct
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @param {Function: next} next, the next function
* @return {Function: next} or {Error} the next function or an error if the id is not valid
*/
const validateGetCatalog = (req, res, next) => {
    const { page, category, subcategory, producer, q, search } = req.query

    if (page && (isNaN(page) || parseInt(page) < 1)) {
        return res.status(400).json({ message: 'Le numero de page doit etre un entier positif.' })
    }

    if (category && (isNaN(category) || parseInt(category) < 1)) {
        return res.status(400).json({ message: 'L\'identifiant de la categorie doit etre un nombre positif.' })
    }

    if (subcategory && (isNaN(subcategory) || parseInt(subcategory) < 1)) {
        return res.status(400).json({ message: 'L\'identifiant de la sous-categorie doit etre un nombre positif.' })
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

/**
* @description Check required fields for product creation
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @param {Function: next} next, the next function
* @return {Function: next} or {Error} the next function or an error if the id is not valid
*/
const validateCreateProduct = (req, res, next) => {
    const { productName, productPrice, categoryId } = req.body

    if (!productName || typeof productName !== 'string' || productName.trim() === '') {
        return res.status(400).json({ error: 'Le nom du produit est requis.' })
    }

    if (productPrice === undefined || productPrice === null || isNaN(productPrice) || parseFloat(productPrice) < 0) {
        return res.status(400).json({ error: 'Le prix du produit est requis et doit être un nombre valide.' })
    }

    if (categoryId === undefined || categoryId === null || isNaN(categoryId)) {
        return res.status(400).json({ error: 'La catégorie est requise et doit être un identifiant valide.' })
    }

    next()
}

/**
* @description Check required fields for product update
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @param {Function: next} next, the next function
* @return {Function: next} or {Error} the next function or an error if the id is not valid
*/
const validateUpdateProduct = (req, res, next) => {
    const { productName, productPrice, categoryId, subcategoryId } = req.body

    if (productName !== undefined && (typeof productName !== 'string' || productName.trim() === '')) {
        return res.status(400).json({ error: 'Le nom du produit ne peut pas être vide.' })
    }

    if (productPrice !== undefined && (isNaN(productPrice) || parseFloat(productPrice) < 0)) {
        return res.status(400).json({ error: 'Le prix du produit doit être un nombre valide.' })
    }

    if (categoryId !== undefined && isNaN(categoryId)) {
        return res.status(400).json({ error: 'L\'identifiant de la catégorie doit être un nombre valide.' })
    }

    if (subcategoryId !== undefined && isNaN(subcategoryId)) {
        return res.status(400).json({ error: 'L\'identifiant de la sous-catégorie doit être un nombre valide.' })
    }

    next()
}

// export
module.exports = { validationId, validateGetCatalog, validateCreateProduct, validateUpdateProduct }
