// require
const express = require('express');
const router = express.Router();

const authMiddleware = require('../../security/middleware/auth.middleware');
const rolesMiddleware = require('../../security/middleware/roles.middleware');
const { getFavorite, addFavoriteProduct, deleteFavoriteProduct, addFavoriteProducer, deleteFavoriteProducer } = require('./favorites.controller');
const { validationId } = require('./favorites.validation');

// Implementation of the routes logic for the favorites

// show all the favorites of the connected client
router.get('/', authMiddleware, rolesMiddleware(['client']), getFavorite);

// add a favorites product to the connected client
router.post('/product', authMiddleware, rolesMiddleware(['client']), validationId, addFavoriteProduct);

// delete a favorites product of the connected client
router.delete('/product/:id', authMiddleware, rolesMiddleware(['client']), deleteFavoriteProduct);

// add a favorites procucer to the connected client
router.post('/producer', authMiddleware, rolesMiddleware(['client']), validationId, addFavoriteProducer);

// delete a favorites procucer of the connected client
router.delete('/producer/:id', authMiddleware, rolesMiddleware(['client']), deleteFavoriteProducer);

// export
module.exports = router;
