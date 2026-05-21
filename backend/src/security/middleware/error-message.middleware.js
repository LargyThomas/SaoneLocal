// Global error handler

const errorMiddleware = (err, req, res, next) => {
    console.error(`[ERROR] ${err.message}`)

    const isDev = process.env.NODE_ENV === 'development'

    res.status(err.status || 500).json({
        message: err.message || 'Une erreur interne est survenue.',
        ...(isDev && { stack: err.stack })
    })
}

module.exports = errorMiddleware