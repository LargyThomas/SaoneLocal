// producers.controller.js\n// TODO: implement producers controller logic\n\nmodule.exports = {};\n

const producerService = require('./producers.service');

AllProducers = async (req, res)=> {
    try {
        const result = await producerService.findAllProducer(req, res);
        res.status(201).json({ message: "Information correctement récupéré", result: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur. Veuillez réessayer plus tard." });
    }
}

ProducerId = async (req, res)=> {
    try {
        const result = await producerService.findProducerId(req, res);
        res.status(201).json({ message: "Information correctement récupéré", result: result });
    } catch (error) {
        if (error.message === 'THIS_ID_DOES_NOT_EXIST') {
            return res.status(404).json({ message: "L'Id demandé n'existe pas" });
        }
        if (error.message === 'PRODUCER_NOT_ACTIVE') {
            return res.status(423).json({ message: "Informations inaccesibles" });
        }
        console.error(error);
        res.status(500).json({ message: "Erreur serveur. Veuillez réessayer plus tard." });
    }
}

ProducerIdProducts = async (req, res)=> {
    try {
        const result = await producerService.findAllProductProducerId(req, res);
        res.status(201).json({ message: "Information correctement récupéré", result:result });
    } catch (error) {
        if (error.message === 'THIS_ID_DOES_NOT_EXIST') {
            return res.status(404).json({ message: "L'Id demandé n'existe pas" });
        }
        if (error.message === 'PRODUCER_NOT_ACTIVE') {
            return res.status(423).json({ message: "Informations inaccesibles" });
        }
        console.error(error);
        res.status(500).json({ message: "Erreur serveur. Veuillez réessayer plus tard." });
    }
}

module.exports = {AllProducers, ProducerId, ProducerIdProducts}