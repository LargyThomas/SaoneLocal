/**
* @description Check if the id given is a number
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @param {Function: next} next, the next function
* @return {Function: next} or {Error} the next function or an error if the id is not valid
*/
const validationId = (req, res, next) => {
    if (isNaN(parseInt(req.params.id))) {
        return res.status(400).json({ message: "L'Id du producteur doit être un nombre" });
    }
    next();
}

// export
module.exports = {validationId}