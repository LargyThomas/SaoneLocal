// Handles file upload validation for image assets

const multer = require('multer')
const { v4: uuidv4 } = require('uuid')
const path = require('path')

// Use memory storage for file uploads
const storage = multer.memoryStorage()

// Validate uploaded file MIME type
const fileFilter = (req, file, cb) => {
    const allowedFiles = ['image/jpeg', 'image/png', 'image/webp']
    if (allowedFiles.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(new Error('Only .jpg, .png, .webp files are allowed.'), false)
    }
}

const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024,       // 5MB max
    },
    fileFilter,
})

module.exports = upload