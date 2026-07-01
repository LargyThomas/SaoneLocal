// require
const { getBasket, InsertIntoBasket, deleteFromBasket } = require('./basket.service.js')

// function

/**
* @description controller of the route GET /api/basket/ , show the connected client basket 
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {status} and {json} a message for the status and the basket of the connected client if there is no error
*/
const ShowBasket = async (req, res) => {
    try {
        const basket = await getBasket(req.user.email)
        res.status(200).json({message: "Information correctement récupéré", result: basket})
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Erreur serveur' })
    }
}

/**
* @description controller of the route POST /api/basket/ , add a product to the connected client basket
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {status} and {json} a message for the status and the basket of the connected client if there is no error
*/
const addToBasket = async (req, res) => {
    try {
        const basket = await InsertIntoBasket(req.user.email, req.body)
        res.status(200).json({message: "Produit correctement ajouté", result: basket})
    } catch (err) {
        if (err.message === 'PRODUCT_NOT_FOUND') {
            return res.status(404).json({ error: 'Produit introuvable' })
        }
        console.error(err)
        res.status(500).json({ error: 'Erreur serveur' })
    }
}

/**
* @description controller of the route DELETE /api/basket/:id , remove a product from the connected client basket
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {status} and {json} a message for the status and the basket of the connected client if there is no error 
*/
const removeFromBasket = async (req, res) => {
    try {
        const basket = await deleteFromBasket(req.user.email, req.params.id)
        res.status(200).json({message: "Produit correctement supprimé", result: basket})
    } catch (err) {
        if (err.message === 'ITEM_NOT_FOUND') {
            return res.status(404).json({ error: 'Produit introuvable dans le panier' })
        }
        console.error(err)
        res.status(500).json({ error: 'Erreur serveur' })
    }
}

// export
module.exports = { ShowBasket, addToBasket, removeFromBasket }