import { Request, Response, NextFunction } from 'express'
import { clerkClient } from '@clerk/clerk-sdk-node'
import { verifyToken } from '@clerk/backend'

// Middleware to verify the token
export const verifyClerkJWTToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Get the token from the Authorization header
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ error: 'Unauthorized: No token provided' })
      return
    }

    const token = authHeader.split(' ')[1]

    // Verify the session token
    const decodedJwt = await verifyToken(token, {
      jwtKey: process.env.CLERK_JWT_PUBLIC_KEY
    })

    if (!decodedJwt) {
      res.status(401).json({ error: 'Unauthorized: Invalid token' })
      return
    }
    // Add the session and user to the request object
    // Add the session and user to the request object
    req.session = decodedJwt
    req.userId = decodedJwt.sub

    // Get the user information
    req.user = await clerkClient.users.getUser(decodedJwt.sub)

    next()
  } catch (error) {
    console.error('Token verification error:', error)
    res.status(401).json({ error: 'Unauthorized: Invalid token' })
    return
  }
}
