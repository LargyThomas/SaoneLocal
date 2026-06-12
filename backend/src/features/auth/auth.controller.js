// Receive requests from the routes, call service functions, and send responses back

const authService = require('./auth.service');

// Handler registering a new user
exports.register = async (req, res) => {
    try {
        const user = await authService.register(req.body);
        res.status(201).json({ message: "Compte créé avec succès.", user });
    } catch (error) {
        if (error.message === 'EMAIL_EXISTE_DEJA') {
            return res.status(409).json({ message: "Cet email est déjà utilisé." });
        }
        console.error(error);
        res.status(500).json({ message: "Erreur serveur. Veuillez réessayer plus tard." });
    }
}

// Handler for logging in a user
exports.login = async (req, res) => {
    try {
        const result = await authService.login(req.body);
        res.status(202).json({ message: "Connexion réussie.", token: result.token, user: result.user });
    } catch (error) {
        if (error.message === 'INFORMATIONS_INCORRECTES') {
            return res.status(401).json({ message: "Informations de connexion incorrectes." });
        }
        if (error.message === 'ADMIN_CHECKBOX_REQUIRED') {
            return res.status(400).json({ message: "Vous devez confirmer la connexion administrateur." });
        }
        console.error(error);
        res.status(500).json({ message: "Erreur serveur. Veuillez réessayer plus tard." });
    }
}