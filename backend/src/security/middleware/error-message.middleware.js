// Global error handler

// Middleware to catch and handle errors in the application, its placed at the end of the middleware stack in app.js
const errorMiddleware = (err, req, res, next) => {
    console.error(`[ERROR] ${err.message}`)

    const isDev = process.env.NODE_ENV === 'development'

    res.status(err.status || 500).json({
        message: err.message || 'Une erreur interne est survenue.',
        ...(isDev && { stack: err.stack })
    })
}

module.exports = errorMiddleware