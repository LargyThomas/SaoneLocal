// Express app entry point

const express = require('express');
const dotenv = require('dotenv');

// Routes
const authRoutes = require('./features/auth/auth.routes.js');
const producerRoutes = require('./features/producers/producers.routes.js');
const favoritesRoutes = require('./features/favorites/favorites.routes.js');
const catalogRoutes = require('./features/catalog/catalog.routes.js');
const basketRoutes = require('./features/basket/basket.routes.js');

// Middlewares
const injectionMiddleware = require('./security/middleware/injection.middleware.js');
const errorMiddleware = require('./security/middleware/error-message.middleware.js');
const authMiddleware = require('./security/middleware/auth.middleware.js');
const rolesMiddleware = require('./security/middleware/roles.middleware.js');

dotenv.config();

const app = express();

// Parse JSON
app.use(express.json());

// Protection injections XSS
app.use(injectionMiddleware);

// Auth routes
app.use('/api/auth', authRoutes);

// Producer routes
app.use('/api/producer', producerRoutes);

// Favorites routes
app.use('/api/favorites', favoritesRoutes);

// Catalog routes
app.use('/api/catalog', catalogRoutes);
// Basket routes
app.use('/api/basket', basketRoutes);

// Test routes
app.get('/api/test/order', authMiddleware, (req, res) => {
    res.status(200).json({ message: 'Accès autorisé', user: req.user });
});

app.get('/api/test/order', authMiddleware, rolesMiddleware(['producer']), (req, res) => {
    res.status(200).json({ message: 'Accès producer autorisé' });
});

// Error handler
app.use(errorMiddleware);

module.exports = app;