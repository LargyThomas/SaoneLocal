// require
const { getFavoriteByUser, createFavorite, removeFavorite } = require('./favorites.service');

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
        const favorite = await getFavoriteByUser(userEmail);
        res.status(200).json({ message: "Informations correctement récupérées.", result: favorite });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur serveur.' });
    }
}

/**
* @description controller of the route POST /api/favorites/ , add a favorite of the connected user
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {status} and {json} a message for the status 
*/
const addFavorite = async (req, res) => {
    try {
        const userEmail = req.user.email;
        const { productId } = req.body;
        await createFavorite(userEmail, productId);
        res.status(201).json({ message: 'Favori ajouté.' });
    } catch (error) {
        if (error.message === 'ALREADY_FAVORITE') {
            return res.status(409).json({ error: 'Produit déjà en favoris.' });
        }
        console.error(error);
        res.status(500).json({ error: 'Erreur serveur.' });
    }
}

/**
* @description controller of the route DELETE /api/favorites/:id/ , delete a favorite of the connected user
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {status} and {json} a message for the status 
*/
const deleteFavorite = async (req, res) => {
    try {
        const userEmail = req.user.email;
        const productId = parseInt(req.params.id, 10);
        await removeFavorite(userEmail, productId);
        res.status(200).json({ message: 'Favori retiré.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur serveur.' });
    }
}

// export
module.exports = { getFavorite, addFavorite, deleteFavorite }