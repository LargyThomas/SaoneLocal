// require
const { getProduct, getProductById, createProduct, modifyProduct, deleteProduct } = require('./catalog.service.js')

// function

/**
* @description controller of the route GET /api/catalog/ , list all products with filters and pagination
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {status} and {json} a message for the status and the information collected from the database if there is no error 
*/
const ShowProduct = async (req, res) => {
    try {
        const result = await getProduct(req.body)
        res.status(200).json({ message: "Information correctement récupéré", result: result })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Erreur serveur' })
    }
}

/**
* @description controller of the route GET /api/catalog/:id , get a single product by ID
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {status} and {json} a message for the status and the information collected from the database if there is no error 
*/
const showProductById = async (req, res) => {
    try {
        const result = await getProductById(req.params.id)
        res.status(200).json({ message: "Information correctement récupéré", result: result })
    } catch (err) {
        if (err.message === 'PRODUCT_NOT_FOUND') {
            return res.status(404).json({ error: 'Produit introuvable' })
        }
        console.error(err)
        res.status(500).json({ error: 'Erreur serveur' })
    }
}

/**
* @description controller of the route POST /api/catalog/ , create a product
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {status} and {json} a message for the status and the information collected from the database if there is no error 
*/
const addProduct = async (req, res) => {
    try {
        const result = await createProduct(req.user.email, req.body)
        res.status(201).json({ message: "Produit correctement ajouté", result: result })
    } catch (err) {
        if (err.message === 'PRODUCER_NOT_FOUND') {
            return res.status(404).json({ error: 'Compte producteur introuvable' })
        }
        console.error(err)
        res.status(500).json({ error: 'Erreur serveur' })
    }
}

/**
* @description controller of the route PATCH /api/catalog/:id , update a product
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {status} and {json} a message for the status and the information collected from the database if there is no error 
*/
const updateProduct = async (req, res) => {
    try {
        const result = await modifyProduct(req.user.email, req.params.id, req.body)
        res.status(200).json({ message: "Produit correctement modifié", result: result })
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

/**
* @description controller of the route DELETE /api/catalog/:id , delete a product
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {status} and {json} a message for the status and the information collected from the database if there is no error 
*/
const removeProduct = async (req, res) => {
    try {
        await deleteProduct(req.user.email, req.params.id)
        res.status(200).json({ message: "Produit correctement supprimé" })
    } catch (err) {
        if (err.message === 'PRODUCT_NOT_FOUND_OR_UNAUTHORIZED') {
            return res.status(404).json({ error: "Produit introuvable ou accès non autorisé" })
        }
        console.error(err)
        res.status(500).json({ error: "Erreur serveur" })
    }
}

// export
module.exports = { ShowProduct, showProductById, addProduct, updateProduct, removeProduct }
