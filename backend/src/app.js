// Express app entry point

const express = require('express');
const dotenv = require('dotenv');

// Routes
const authRoutes = require('./features/auth/auth.routes.js');
const producerRoutes = require('./features/producers/producers.routes.js')

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

// Test routes
app.get('/api/test/protected', authMiddleware, (req, res) => {
    res.status(200).json({ message: 'Accès autorisé', user: req.user });
});

app.get('/api/test/admin-only', authMiddleware, rolesMiddleware(['admin']), (req, res) => {
    res.status(200).json({ message: 'Accès admin autorisé' });
});

// Error handler
app.use(errorMiddleware);

module.exports = app;