const { PutObjectCommand } = require('@aws-sdk/client-s3')
const { s3Client, BUCKET_NAME } = require('../../s3.config')
const { v4: uuidv4 } = require('uuid')
const path = require('path')

/**
 * Upload buffer file to S3
 * @param {Object} file - Multer file (contains buffer, originalname, mimetype)
 * @param {String} folder - Target folder : 'profiles', 'products', 'producers', 'site'
 * @param {String} subFolder - Optional subfolder : 'clients', 'admins', 'locations'
 */

async function uploadToS3(file, folder, subFolder = '') {
    // Generate an uniq name : timestamp-uuid.ext
    const extension = path.extname(file.originalname)
    const fileName = `${folder}/${subFolder ? subFolder + '/' : ''}${Date.now()}-${uuidv4()}${extension}`

    const command = new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: fileName,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: 'public-read'
    })

    try {
        await s3Client.send(command)
        // Return complet URL
        return `https://${BUCKET_NAME}.s3.eu-north-1.amazonaws.com/${fileName}`
    } catch(error) {
        console.error('Erreur S3 :', error)
        throw new Error('Echec de l\'upload sur S3')
    }
}

module.exports = { uploadToS3 }