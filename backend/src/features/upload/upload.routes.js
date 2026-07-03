const express = require('express')
const multer = require('multer')
const authMiddleware = require('../../security/middleware/auth.middleware')
const rolesMiddleware = require('../../security/middleware/roles.middleware')
const upload = require('../../security/middleware/multer.config')
const { uploadUserProfilePicture, uploadCatalogProductPicture } = require('./upload.controller')

const router = express.Router()

const handleProfilePictureUpload = (req, res, next) => {
    upload.single('image')(req, res, (error) => {
        if (!error) {
            return next()
        }

        if (error instanceof multer.MulterError && error.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ message: 'Image trop lourde. Taille maximale : 5 Mo.' })
        }

        if (error.message === 'FORMAT_IMAGE_INVALIDE') {
            return res.status(400).json({ message: 'Format invalide. Formats acceptes : jpeg, png, webp.' })
        }

        console.error(error)
        return res.status(400).json({ message: 'Image invalide.' })
    })
}

router.post('/profile-picture', authMiddleware, handleProfilePictureUpload, uploadUserProfilePicture)
router.post('/product-picture', authMiddleware, rolesMiddleware(['producteur']), handleProfilePictureUpload, uploadCatalogProductPicture)

module.exports = router
