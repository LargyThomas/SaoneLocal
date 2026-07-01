// require
const express = require('express')
const router = express.Router()

const authMiddleware = require('../../security/middleware/auth.middleware.js')
const rolesMiddleware = require('../../security/middleware/roles.middleware.js')
const { ShowProduct, showProductById, addProduct, updateProduct, removeProduct } = require('./catalog.controller.js')
const { validationId, validateGetCatalog, validateCreateProduct, validateUpdateProduct } = require('./catalog.validation.js')

// implementation of the routes logic for the catalog

// public routes, list all products with filters and pagination
router.get('/', validateGetCatalog, ShowProduct)

// public routes, get a single product by ID
router.get('/:id', validationId, showProductById)

// create a product for the producer  
router.post('/', authMiddleware, rolesMiddleware(['producteur']), validateCreateProduct, addProduct)

// update a product for the producer 
router.patch('/:id', authMiddleware, rolesMiddleware(['producteur']), validationId, validateUpdateProduct, updateProduct)

// delete a product for the produce
router.delete('/:id', authMiddleware, rolesMiddleware(['producteur']), validationId, removeProduct)

// export
module.exports = router