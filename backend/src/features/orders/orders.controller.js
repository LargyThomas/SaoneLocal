// require
const { createOrder, changeStatus, dispatchRole, findOrdersUser, findOrdersProducer } = require('./orders.service.js');

//function

/**
* @description controller of the route POST /api/orders/ , create a new order with the product from the basket
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {status} and {json} with the message for the status if there is no error 
*/
const newOrder = async (req, res) => {
    try {
        await createOrder(req, res)
        res.status(201).json({ message: "Commande correctement effectuée."});
    } catch (error) {
        if (error.message === 'NO_ITEM_IN_THE_BASKET') {
            res.status(400).json({ message: "Le panier doit contenir au moins un article" });
        }
        console.error(error);
        res.status(500).json({ message: "Erreur serveur. Veuillez réessayer plus tard." });
    }
}

/**
* @description controller of the route PATCH /api/orders/:id/status , update the status of the order id
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {status} and {json} a message for the status if there is no error 
*/
const updateStatus = async (req, res) => {
    try {
        await changeStatus(req, res)
        res.status(201).json({ message: "Statut de la commande correctement modifié."});
    } catch (error) {
        if (error.message === 'THIS_ID_DOES_NOT_EXIST') {
            return res.status(404).json({ message: "L'Id demandé n'existe pas" });
        }
        if (error.message === 'YOU_CANNOT_ACCESS_THIS_ORDER') {
            return res.status(423).json({ message: "Commande inaccessible." });
        }
        if (error.message === 'REPAYMENT_PROCEDURE') {
            return res.status(200).json({ message: "Commande correctement annulée, lancement de la procédure de remboursement." });
        }
        console.error(error);
        res.status(500).json({ message: "Erreur serveur. Veuillez réessayer plus tard." });
    }
}

/**
* @description controller of the route GET /api/orders/ , show the information of the orders
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {status} and {json} a message for the status and the information collected from the database if there is no error 
*/
const showOrders = async (req, res) => {
    try {
        const result = await dispatchRole(req, res)
        res.status(201).json({ message: "Informations correctement récupérées.", result: result});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur. Veuillez réessayer plus tard." });
    }
}

// export
module.exports = {newOrder, updateStatus, showOrders}
