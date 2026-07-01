// const
const HASH_STATUS = {"a":"ok","n":"ok", "e":"ok", "p":"ok", "r":"ok"} // a=annulé, n=nouvelle, e=en préparation, p=prête, r=récupéré

// function

/**
* @description Check if the given id is a number
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @param {Function: next} next, the next function
* @return {Function: next} or {Error} the next function or an error if the id is not valid
*/
const validationId = (req, res, next) => {
    if (isNaN(parseInt(req.params.id))) {
        return res.status(400).json({ error: "L'Id de la commande doit être un nombre" });
    }
    next();
}

/**
* @description Check if the given status in req.body is a valid status
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @param {Function: next} next, the next function
* @return {Function: next} or {Error} the next function or an error if the given status is not valid
*/
const validationStatus = (req, res, next) => {
    if (HASH_STATUS[req.body["ordersStatus"]] == null) {
        return res.status(400).json({ error: "Le format du statut n'est pas correct" });
    }
    next();
}

// export
module.exports = { validationId , validationStatus }
