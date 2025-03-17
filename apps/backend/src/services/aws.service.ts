import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

export class AWSService {
  private s3Client: S3Client
  expirationSeconds = 60 * 5

  constructor() {
    this.s3Client = new S3Client({
      region: process.env.AWS_S3_REGION || '',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ''
      }
    })
  }

  async createPresignedUrl(filePath: string): Promise<string> {
    try {
      // Create the command
      const command = new GetObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME || '',
        Key: filePath
      })
      // Generate the presigned URL
      const presignedUrl = await getSignedUrl(this.s3Client, command, {
        expiresIn: this.expirationSeconds
      })

      console.log('Pre-signed URL:', presignedUrl)
      return presignedUrl
    } catch (err) {
      console.error('Error generating pre-signed URL:', err)
      throw err
    }
  }
}
