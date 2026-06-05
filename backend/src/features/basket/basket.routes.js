// Defines basket endpoints and branches validation and auth middlewares

// GET    /api/basket      - get client basket
// POST   /api/basket      - add product to basket
// DELETE /api/basket/:id  - remove product from basket

const express = require('express')
const router = express.Router()
const { getBasket, addToBasket, removeFromBasket } = require('./basket.controller.js')
const { validateAddToBasket } = require('./basket.validation.js')
const authMiddleware = require('../../security/middleware/auth.middleware.js')
const rolesMiddleware = require('../../security/middleware/roles.middleware.js')

router.get('/', authMiddleware, rolesMiddleware(['client']), getBasket)
router.post('/', authMiddleware, rolesMiddleware(['client']), validateAddToBasket, addToBasket)
router.delete('/:id', authMiddleware, rolesMiddleware(['client']), removeFromBasket)

module.exports = router