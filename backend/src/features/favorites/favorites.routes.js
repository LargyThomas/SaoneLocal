const express = require('express');
const router = express.Router();

const favoritesController = require('./favorites.controller');
const { validateAddFavorite, validateDeleteFavorite } = require('./favorites.validation');
const authMiddleware = require('../../security/middleware/auth.middleware');
const rolesMiddleware = require('../../security/middleware/roles.middleware');

// All favorites routes are protected and only accessible to clients
router.get('/', authMiddleware, rolesMiddleware(['client']), favoritesController.getFavorites);
router.post('/', authMiddleware, rolesMiddleware(['client']), validateAddFavorite, favoritesController.addFavorite);
router.delete('/:id', authMiddleware, rolesMiddleware(['client']), validateDeleteFavorite, favoritesController.deleteFavorite);

module.exports = router;
