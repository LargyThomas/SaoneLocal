// require
const clientService = require('./client.service');

// function

const clientProfil = async (req,res)=>{
    try {
        const user = await clientService.findProfilUser(req, res);
        const basket = await clientService.findProfilBasket(req, res);
        const order = await clientService.findProfilOrder(req, res);
        const favoritesProduct = await clientService.findProfilFavoritesProduct(req, res);
        const favoritesProducer = await clientService.findProfilFavoritesProducer(req, res);
        res.status(201).json({ message: "Information correctement récupéré", "resultUser":user, "resultOrder": order, "resultBasket": basket, "resultFavoriteProduct": favoritesProduct, "resultFavoriteProducer": favoritesProducer});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur. Veuillez réessayer plus tard." });
    }
}

const updateClientProfil = async (req, res)=>{
    try {
        await clientService.updateClientInformation(req, res);
        res.status(201).json({ message: "Information correctement modifié"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur. Veuillez réessayer plus tard." });
    }
}

// export
module.exports = {clientProfil, updateClientProfil}