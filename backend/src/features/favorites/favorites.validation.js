// function

/**
* @description Check if the given id is a number
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @param {Function: next} next, the next function
* @return {Function: next} or {Error} the next function or an error if the id is not valid
*/
const validationId = (req, res, next) => {
    const productId = req.body["productId"];
    if (productId === undefined || productId === null) {
        return res.status(400).json({ error: 'Id manquant.' });
    }
    const id = parseInt(productId, 10);
    if (Number.isNaN(id) || id <= 0) {
        return res.status(400).json({ error: "L'Id doit être un nombre." });
    }
    req.body.productId = id;
    next();
}

// export
module.exports = { validationId };
