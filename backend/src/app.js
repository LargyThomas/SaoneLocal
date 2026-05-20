// Express app entry point

const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./features/auth/auth.routes.js');
const verifierToken = require('./security/middleware/auth.middleware');
const autoriserRole = require('./security/middleware/roles.middleware');

dotenv.config();

const app = express();

// Middleware to parse JSON data
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.status(200).send("Ok");
});

// Example of a protected route with role-based access control
app.get('/admin', verifierToken, autoriserRole(['admin']), (req, res) => {
    res.json({ message: "Bienvenue dans la section admin" });
});

module.exports = app;