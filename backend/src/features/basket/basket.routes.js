// require
const express = require('express')
const router = express.Router()

const authMiddleware = require('../../security/middleware/auth.middleware.js')
const rolesMiddleware = require('../../security/middleware/roles.middleware.js')
const { ShowBasket, addToBasket, removeFromBasket } = require('./basket.controller.js')
const { validateAddToBasket } = require('./basket.validation.js')

// implementation of the routes logic for the basket

// get client basket
router.get('/', authMiddleware, rolesMiddleware(['client']), ShowBasket)

// add product to basket
router.post('/', authMiddleware, rolesMiddleware(['client']), validateAddToBasket, addToBasket)

// remove product from basket
router.delete('/:id', authMiddleware, rolesMiddleware(['client']), removeFromBasket)

// export
module.exports = router