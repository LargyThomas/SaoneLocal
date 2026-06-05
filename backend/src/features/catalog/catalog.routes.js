// Defines catalog endpoints and branches validation and auth middlewares
// GET    /api/catalog          - list all products with filters and pagination (public)
// GET    /api/catalog/:id      - get a single product by ID (public)
// POST   /api/catalog          - create a product (producer only)
// PATCH  /api/catalog/:id      - update a product (producer only)
// DELETE /api/catalog/:id      - delete a product (producer only)

const express = require('express')
const router = express.Router()
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('./catalog.controller.js')
const { validateGetCatalog, validateCreateProduct, validateUpdateProduct } = require('./catalog.validation.js')
const authMiddleware = require('../../security/middleware/auth.middleware.js')
const rolesMiddleware = require('../../security/middleware/roles.middleware.js')

// Public routes
router.get('/', validateGetCatalog, getProducts)
router.get('/:id', getProductById)

// Producer protected routes
router.post('/', authMiddleware, rolesMiddleware(['commercant']), validateCreateProduct, createProduct)
router.patch('/:id', authMiddleware, rolesMiddleware(['commercant']), validateUpdateProduct, updateProduct)
router.delete('/:id', authMiddleware, rolesMiddleware(['commercant']), deleteProduct)

module.exports = router