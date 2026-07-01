// require
const { findProfilUser, findProfilBasket, findProfilOrder, findProfilFavoritesProduct, findProfilFavoritesProducer, updateClientInformation } = require('./client.service.js');

// function

/**
* @description controller of the route GET /api/client/profil/ , get the profil of the connected client
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {status} and {json} a message for the status and the information collected from the database if there is no error 
*/
const clientProfil = async (req,res)=>{
    try {
        const user = await findProfilUser(req, res);
        const basket = await findProfilBasket(req, res);
        const order = await findProfilOrder(req, res);
        const favoritesProduct = await findProfilFavoritesProduct(req, res);
        const favoritesProducer = await findProfilFavoritesProducer(req, res);
        res.status(201).json({ message: "Information correctement récupéré", resultUser: user, resultOrder: order, resultBasket: basket, resultFavoriteProduct: favoritesProduct, resultFavoriteProducer: favoritesProducer});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur. Veuillez réessayer plus tard." });
    }
}

/**
* @description controller of the route PATCH /api/client/profil/ , update the profil of the connected client
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {status} and {json} a message for the status 
*/
const updateClientProfil = async (req, res)=>{
    try {
        await updateClientInformation(req, res);
        res.status(201).json({ message: "Information correctement modifié"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur serveur. Veuillez réessayer plus tard." });
    }
}

// export
module.exports = { clientProfil, updateClientProfil }