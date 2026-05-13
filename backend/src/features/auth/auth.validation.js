// Validate and sanitize user input before it reaches the controller for auth
export const validateRegister = (req, res, next) => {
    // Implement validation logic for registration
    const { email, password } = req.body;
    
    const emailRegex = /^(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*)@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;

    // Verification if email and password are present in the request body
    if (!email || !password) {
        return res.status(400).json({ message: "L'email et le mot de passe sont requis" });
    }

    // Verification if email is valid
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Format d'email invalide" });
    }

    // Password rules : at leats 8 characters, one uppercase letter and one lowercase letter, one number and on special character
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < 8 || !hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar) {
        return res.status(400).json({ message: "Le mot de passe doit contenir au moins 8 caractères et inclure au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial" });
    }

    next();
}

export const validateLogin = (req, res, next) => {
    // Implement validation logic for login
    const { email, password } = req.body;

    // Verification if email and password are present in the request body
    if (!email || !password) {
        return res.status(400).json({ message: "L'email et le mot de passe sont requis" });
    }

    next();
}

// Call the validation middleware in /midelware