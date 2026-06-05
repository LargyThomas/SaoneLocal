// AWS SDK go automaticaly search credentials with EC2 IAM role

const { S3Client } = require('@aws-sdk/client-s3')

const s3Client = new S3Client({
    region: 'eu-north-1',
})

const BUCKET_NAME = 'saonelocal-tL-2026'

module.exports = { s3Client, BUCKET_NAME }