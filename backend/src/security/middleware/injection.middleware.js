// Protection against SQL injections and XSS

const injectionMiddleware = (req, res, next) => {
    const xssRegex = /<[^>]*>/g

    const sanitize = (value) => {
        if (typeof value === 'string') {
            // Block HTYML tags to prevent XSS
            if (xssRegex.test(value)) {
                return null
            }
            return value.trim()
        }
        if (typeof value === 'object' && value !== null) {
            // Verify nested objects (e.g., req.body)
            for (const key in value) {
                value[key] = sanitize(value[key])
                if (value[key] === null) {
                    return null
                }
            }
        }
        return value
    }

    if (req.body) {
        const sanitized = sanitize(req.body)
        if (sanitized === null) {
            return res.status(400).json({ message: 'Contenu non autorisé détecté.' })
        }
        req.body = sanitized
    }

    next()
}

module.exports = injectionMiddleware