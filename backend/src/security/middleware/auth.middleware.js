// Verifies JWT token and protects routes

const { verifyToken } = require('../jwt.js');

// Middleware to protect routes and verify JWT token from the Authorization header
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Without Bearer

    if (!token) {
        return res.status(401).json({ message: "Token d'authentification manquant."});
    }
    
    try {
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token d'authentification invalide ou expiré." });
    }
}

module.exports = authMiddleware;