// require
const { getFavoriteProductByUser, getFavoriteProducerByUser, createFavoriteProduct, removeFavoriteProduct, createFavoriteProducer, removeFavoriteProducer } = require('./favorites.service');

// function

/**
* @description controller of the route GET /api/favorites/ , get all the favorite of the connected user
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {status} and {json} a message for the status and the information collected from the database if there is no error 
*/
const getFavorite = async (req, res) => {
    try {
        const userEmail = req.user.email;
        const favorite_product = await getFavoriteProductByUser(userEmail);
        const favorite_producer = await getFavoriteProducerByUser(userEmail);
        res.status(200).json({ message: "Informations correctement récupérées.", result_favorite_producer: favorite_producer, result_favorite_product: favorite_product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur serveur.' });
    }
}

/**
* @description controller of the route POST /api/favorites/product , add a favorite product to the connected user
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {status} and {json} a message for the status 
*/
const addFavoriteProduct = async (req, res) => {
    try {
        const userEmail = req.user.email;
        const { id } = req.body;
        await createFavoriteProduct(userEmail, id);
        res.status(201).json({ message: 'Favori ajouté.' });
    } catch (error) {
        if (error.message === 'ALREADY_FAVORITE') {
            return res.status(409).json({ error: 'Produit déjà en favoris.' });
        }
        if (error.message == 'PRODUCT_NOT_FOUND') {
            return res.status(404).json({ error: 'Produit introuvable' });
        }
        console.error(error);
        res.status(500).json({ error: 'Erreur serveur.' });
    }
}

/**
* @description controller of the route DELETE /api/favorites/product/:id/ , delete a favorite product of the connected user
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {status} and {json} a message for the status 
*/
const deleteFavoriteProduct = async (req, res) => {
    try {
        const userEmail = req.user.email;
        const producerId = parseInt(req.params.id, 10);
        await removeFavoriteProduct(userEmail, producerId);
        res.status(200).json({ message: 'Favori retiré.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur serveur.' });
    }
}

/**
* @description controller of the route POST /api/favorites/producer , add a favorite producer to the connected user
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {status} and {json} a message for the status 
*/
const addFavoriteProducer = async (req, res) => {
    try {
        const userEmail = req.user.email;
        const { id } = req.body;
        await createFavoriteProducer(userEmail, id);
        res.status(201).json({ message: 'Favori ajouté.' });
    } catch (error) {
        if (error.message === 'ALREADY_FAVORITE') {
            return res.status(409).json({ error: 'Producer déjà en favoris.' });
        }
        if (error.message == 'PRODUCER_NOT_FOUND') {
            return res.status(404).json({ error: 'Producteur introuvable' });
        }
        console.error(error);
        res.status(500).json({ error: 'Erreur serveur.' });
    }
}

/**
* @description controller of the route DELETE /api/favorites/producer/:id/ , delete a favorite producer of the connected user
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {status} and {json} a message for the status 
*/
const deleteFavoriteProducer = async (req, res) => {
    try {
        const userEmail = req.user.email;
        const productId = parseInt(req.params.id, 10);
        await removeFavoriteProducer(userEmail, productId);
        res.status(200).json({ message: 'Favori retiré.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur serveur.' });
    }
}

// export
module.exports = { getFavorite, addFavoriteProduct, deleteFavoriteProduct, addFavoriteProducer, deleteFavoriteProducer }