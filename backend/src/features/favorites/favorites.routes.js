// require
const express = require('express');
const router = express.Router();

const authMiddleware = require('../../security/middleware/auth.middleware');
const rolesMiddleware = require('../../security/middleware/roles.middleware');
const { getFavorite, addFavorite, deleteFavorite } = require('./favorites.controller');
const { validationId } = require('./favorites.validation');

// Implementation of the routes logic for the favorites

// show all the favorites of the connected client
router.get('/', authMiddleware, rolesMiddleware(['client']), getFavorite);

// add a favorites to the connected client
router.post('/', authMiddleware, rolesMiddleware(['client']), validationId, addFavorite);

// delete a favorites to the connected client
router.delete('/:id', authMiddleware, rolesMiddleware(['client']), deleteFavorite);

// export
module.exports = router;
