import app from './app'
import { logger } from './utils'
import { connectDatabase } from './config/database'
import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT || 3000

// Extend the Request interface to include session and userId
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      userId?: string
      session?: any
      user?: any
    }
  }
}

connectDatabase().then(() => {
  app.listen(PORT, () => {
    logger.info(`🚀 Server is running on http://localhost:${PORT}`)
  })
})
