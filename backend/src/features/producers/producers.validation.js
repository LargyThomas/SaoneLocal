// const

const hashUpdate = {"usersPassword": 64, "usersGender": 1, "usersLastname": 50, "usersFirstname": 50,"usersProfilPicture": 500,"producerDesc": 1500,"producerLocalisation": 100,"producerSiretNum": 14}
const hashGender = {"M": "ok", "F": "ok", "A": "ok"}

//function

/**
* @description Check if the id given is a number
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @param {Function: next} next, the next function
* @return {Function: next} or {Error} the next function or an error if the id is not valid
*/
const validationId = (req, res, next) => {
    if (isNaN(parseInt(req.params.id))) {
        return res.status(400).json({ message: "L'Id du producteur doit être un nombre" });
    }
    next();
}

/**
* @description Check if the given key to update is valid
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @param {Function: next} next, the next function
* @return {Function: next} or {Error} the next function or an error if the id is not valid
*/
const verifyKey = (req, res) => {
    if (req.body.key == null || req.body.value == null) {
        throw new Error('MISSING_INFORMATION')
    }
    if (hashUpdate[req.body.key] == null) {
        throw new Error('NO_PERMISSION')
    }
}

/**
* @description Check if the given value to update is valid
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @param {Function: next} next, the next function
* @return {Function: next} or {Error} the next function or an error if the id is not valid
*/
const verifyValue = (req, res) => {
    if (!isNaN(parseInt(req.body.value))) {
        throw new Error('NUMBER_GIVEN')
    }

    if (req.body.value.length > hashUpdate[req.body.key]) {
        throw new Error('TO_MANY_CHARACTER')
    }

    if (req.body.key == "usersGender" && hashGender[req.body.value] == null) {
        throw new Error('INVALIDE_GENDER')
    }

    if (req.body.key == "usersPassword") {
        const hasUpperCase = /[A-Z]/.test(req.body.value);
        const hasLowerCase = /[a-z]/.test(req.body.value);
        const hasNumber = /[0-9]/.test(req.body.value);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(req.body.value);

        if (req.body.value.length < 8 || !hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar) {
            throw new Error('INVALIDE_PASSWORD')
        }
    }
}

/**
* @description Check if the information given to update are valid
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @param {Function: next} next, the next function
* @return {Function: next} or {Error} the next function or an error if the id is not valid
*/
const validationInformationToUpdate = (req, res, next) => {
    try {
        verifyKey(req, res)
        verifyValue(req,res)
        next();
    } catch (error) {
        if (error.message == 'NUMBER_GIVEN') {
            return res.status(400).json({ message: "La valeur doit être une chaîne de caractères" });
        }
        if (error.message == 'INVALIDE_INFORMATION') {
            return res.status(400).json({ message: "Information invalide" });
        }
        if (error.message == 'MISSING_INFORMATION') {
            return res.status(400).json({ message: "Les valeurs key et value doivent être renseignées" });
        }
        if (error.message == 'NO_PERMISSION') {
            return res.status(423).json({ message: "Vous n'avez pas la permission de modifier ce champ" });
        }
        if (error.message == 'TO_MANY_CHARACTER') {
            return res.status(400).json({ message: "Le champ contient un trop grand nombre de caractères" });
        }
        if (error.message == 'INVALIDE_PASSWORD') {
            return res.status(400).json({ message: "Le mot de passe doit contenir au moins 8 caractères et inclure au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial." });
        }
        console.log(error.message)  
    }
}

// export
module.exports = { validationId, validationInformationToUpdate }
