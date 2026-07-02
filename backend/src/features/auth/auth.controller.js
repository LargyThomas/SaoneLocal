// require
const { registerService, loginService } = require('./auth.service');

// function

/**
* @description controller of the route POST /api/auth/register , Handle registering a new user
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {status} and {json} a message for the status and the information collected from the database if there is no error 
*/
const register = async (req, res) => {
    try {
        const user = await registerService(req.body);
        res.status(201).json({ message: "Compte créé avec succès.", user });
    } catch (error) {
        if (error.message === 'EMAIL_EXISTE_DEJA') {
            return res.status(409).json({ error: "Cet email est déjà utilisé." });
        }
        console.error(error);
        res.status(500).json({ error: "Erreur serveur. Veuillez réessayer plus tard." });
    }
}

/**
* @description controller of the route POST /api/auth/login , Handle logging in a user
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {status} and {json} a message for the status and the information collected from the database if there is no error 
*/
const login = async (req, res) => {
    try {
        const result = await loginService(req.body);
        res.status(202).json({ message: "Connexion réussie.", token: result.token, user: result.user });
    } catch (error) {
        if (error.message === 'COMPTE_INACTIF') {
            return res.status(403).json({ error: "Ce compte n'est pas actif." });
        }
        if (error.message === 'INFORMATIONS_INCORRECTES') {
            return res.status(401).json({ error: "Informations de connexion incorrectes." });
        }
        if (error.message === 'ADMIN_CHECKBOX_REQUIRED') {
            return res.status(400).json({ error: "Vous devez confirmer la connexion administrateur." });
        }
        if (error.message === 'PRODUCER_CHECKBOX_REQUIRED') {
            return res.status(400).json({ error: "Vous devez confirmer la connexion à l'espace producteur." });
        }
        console.error(error);
        res.status(500).json({ error: "Erreur serveur. Veuillez réessayer plus tard." });
    }
}

// export
module.exports = { register, login }
