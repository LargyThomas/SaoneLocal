const { PutObjectCommand } = require('@aws-sdk/client-s3')
const { s3Client, BUCKET_NAME, AWS_REGION } = require('../../s3.config')
const { connexion } = require('../../database/database')
const { v4: uuidv4 } = require('uuid')
const path = require('path')

/**
 * Upload buffer file to S3
 * @param {Object} file - Multer file (contains buffer, originalname, mimetype)
 * @param {String} folder - Target folder : 'profiles', 'products', 'producers', 'site'
 * @param {String} subFolder - Optional subfolder : 'clients', 'admins', 'locations'
 */

async function uploadToS3(file, folder, subFolder = '') {
    if (!BUCKET_NAME) {
        throw new Error('S3_BUCKET_MISSING')
    }

    // Generate an uniq name : timestamp-uuid.ext
    const extension = path.extname(file.originalname)
    const fileName = `${folder}/${subFolder ? subFolder + '/' : ''}${Date.now()}-${uuidv4()}${extension}`

    const commandInput = {
        Bucket: BUCKET_NAME,
        Key: fileName,
        Body: file.buffer,
        ContentType: file.mimetype,
    }

    if (process.env.AWS_S3_ACL) {
        commandInput.ACL = process.env.AWS_S3_ACL
    }

    const command = new PutObjectCommand(commandInput)

    try {
        await s3Client.send(command)
        // Return complet URL
        return `https://${BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/${fileName}`
    } catch(error) {
        console.error('Erreur S3 :', error)
        throw new Error('Echec de l\'upload sur S3')
    }
}

async function uploadProfilePicture(userEmail, file) {
    const imageUrl = await uploadToS3(file, 'profiles', 'users')
    const result = await connexion.query(
        'UPDATE users SET usersProfilPicture = $1 WHERE usersEmail = $2 RETURNING usersProfilPicture',
        [imageUrl, userEmail]
    )

    if (result.rows.length === 0) {
        throw new Error('USER_NOT_FOUND')
    }

    return result.rows[0].usersprofilpicture
}

module.exports = { uploadToS3, uploadProfilePicture }
