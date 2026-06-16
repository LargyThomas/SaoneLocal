// AWS SDK automatically reads credentials from the server environment or IAM role

const { S3Client } = require('@aws-sdk/client-s3')

const AWS_REGION = process.env.AWS_REGION || 'eu-north-1'
const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME

const s3Client = new S3Client({
    region: AWS_REGION,
})

module.exports = { s3Client, BUCKET_NAME, AWS_REGION }
