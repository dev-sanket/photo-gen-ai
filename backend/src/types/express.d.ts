/* eslint-disable @typescript-eslint/no-explicit-any */
// Extend the Request interface to include session and userId
import 'express'

declare global {
  namespace Express {
    interface Request {
      userId?: string
      session?: any
      user?: any
    }
  }
}
