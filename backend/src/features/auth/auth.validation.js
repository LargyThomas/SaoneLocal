// Validate and sanitize user input before it reaches the controller for auth

// Validate a registration by checking if all required fields are present, the email is a valid format,and the password is strong
exports.validateRegister = (req, res, next) => {
    const { email, password, gender, lastName, firstName } = req.body;
    
    const emailRegex = /^(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*)@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;

    if (!email || !password || !gender || !lastName || !firstName) {
        return res.status(400).json({ message: "Tous les champs sont requis." });
    }

    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Format d'email invalide." });
    }

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < 8 || !hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar) {
        return res.status(400).json({ message: "Le mot de passe doit contenir au moins 8 caractères et inclure au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial." });
    }

    next();
}

// Validate a login by checking the email and password fields are present and not empty
exports.validateLogin = (req, res, next) => {
    const { email, password, adminCheckbox } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "L'email et le mot de passe sont requis." });
    }

    // If the admin checkbox is not checked, reject the login attempt
    if (adminCheckbox !== true) {
        return res.status(400).json({ message: "Vous devez être un administrateur pour vous connecter." });
    }

    next();
}