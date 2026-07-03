// function

/**
* @description Check if the given id is a number
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @param {Function: next} next, the next function
* @return {Function: next} or {Error} the next function or an error if the id is not valid
*/
const validationId = (req, res, next) => {
    const string_id = req.body["id"];

    if (string_id === undefined || string_id === null) {
        return res.status(400).json({ error: 'Id manquant.' });
    }
    const int_id = parseInt(string_id, 10);
    if (Number.isNaN(int_id) || int_id <= 0) {
        return res.status(400).json({ error: "L'Id doit être un nombre." });
    }
    req.body["id"] = int_id;
    next();
}

// export
module.exports = { validationId };
