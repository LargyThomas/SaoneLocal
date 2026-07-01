// function

/**
* @description Check productId and quantity before reaching the controller
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @param {Function: next} next, the next function
* @return {Function: next} or {Error} the next function or an error if the id is not valid
*/
const validateAddToBasket = (req, res, next) => {
    const { productId, quantity } = req.body

    if (!productId || isNaN(productId)) {
        return res.status(400).json({ error: 'Un identifiant de produit valide est requis.' })
    }

    if (!quantity || isNaN(quantity) || parseInt(quantity) < 1) {
        return res.status(400).json({ error: 'La quantité doit être un entier positif.' })
    }

    req.body.productId = parseInt(productId)
    req.body.quantity = parseInt(quantity)

    next()
}

// export
module.exports = { validateAddToBasket }