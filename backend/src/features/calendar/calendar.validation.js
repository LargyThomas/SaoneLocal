// function

/**
* @description Check if the eventsId given is corrected
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @param {Function: next} next, the next function
* @return {Function: next} or {Error} the next function or an error if the status given is not valid
*/
const validationEvent = (req, res, next) => {
    if (isNaN(parseInt(req.body.events))) {
        return res.status(400).json({ message: "L'Id de l'événement doit être un nombre" });
    }
    next();
}

// export
module.exports = {validationEvent}