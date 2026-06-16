const { uploadProfilePicture } = require('./upload.service')

const uploadUserProfilePicture = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Aucune image fournie.' })
        }

        const imageUrl = await uploadProfilePicture(req.user.email, req.file)

        return res.status(200).json({
            message: 'Photo de profil mise a jour avec succes.',
            imageUrl
        })
    } catch (error) {
        if (error.message === 'S3_BUCKET_MISSING') {
            return res.status(500).json({ message: 'Configuration S3 manquante.' })
        }

        if (error.message === 'USER_NOT_FOUND') {
            return res.status(404).json({ message: 'Utilisateur introuvable.' })
        }

        if (error.message === 'Echec de l\'upload sur S3') {
            return res.status(502).json({ message: 'Erreur lors de l\'upload de l\'image.' })
        }

        console.error(error)
        return res.status(500).json({ message: 'Erreur serveur. Veuillez reessayer plus tard.' })
    }
}

module.exports = { uploadUserProfilePicture }
