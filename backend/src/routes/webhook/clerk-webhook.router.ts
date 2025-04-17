import express from 'express'
import { UserRepository } from '../../repositories/user.repository'
import { Webhook } from 'svix'
import { logger } from '../../utils'

const router = express.Router()
const userRepository = new UserRepository()

router.post('/user', async (req, res) => {
  console.log('Webhook received')
  const SIGNING_SECRET = process.env.SIGNING_SECRET

  if (!SIGNING_SECRET) {
    throw new Error(
      'Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env'
    )
  }

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET)

  // Get headers and body
  const headers = req.headers
  const payload = req.body

  // Get Svix headers for verification
  const svix_id = headers['svix-id']
  const svix_timestamp = headers['svix-timestamp']
  const svix_signature = headers['svix-signature']

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return void res.status(400).json({
      success: false,
      message: 'Error: Missing svix headers'
    })
  }

  let evt: any

  // Attempt to verify the incoming webhook
  // If successful, the payload will be available from 'evt'
  // If verification fails, error out and return error code
  try {
    evt = wh.verify(JSON.stringify(payload), {
      'svix-id': svix_id as string,
      'svix-timestamp': svix_timestamp as string,
      'svix-signature': svix_signature as string
    })
  } catch (err) {
    console.log('Error: Could not verify webhook:', (err as Error).message)
    return void res.status(400).json({
      success: false,
      message: (err as Error).message
    })
  }

  // Do something with payload
  // For this guide, log payload to console
  const { id } = evt.data
  const eventType = evt.type

  try {
    switch (eventType) {
      case 'user.created':
      case 'user.updated':
        {
          const user = {
            clerkId: id || null,
            name: `${evt.data.first_name ?? ''} ${
              evt.data.last_name ?? ''
            }`.trim(),
            email: evt.data.email_addresses[0].email_address,
            profilePicture: evt.data.profile_image_url
          }

          await userRepository.createOrUpdate(user)
          logger.info(`User ${user.clerkId} created or updated`)
        }

        break
      default:
        console.log(`Unhandled event type: ${eventType}`)
        break
    }
  } catch (error) {
    console.error('Error: Could not process webhook:', error)
    return void res.status(500).json({
      success: false,
      message: 'Error: Could not process webhook'
    })
  }

  return void res.status(200).json({
    success: true,
    message: 'Webhook received'
  })
})

export default router
