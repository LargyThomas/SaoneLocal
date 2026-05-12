// Express app entry point

const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./features/auth/auth.routes.js');

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

module.exports = app;