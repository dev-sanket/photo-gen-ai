// express.d.ts
declare module 'express' {
  interface Request {
    userId?: string
    session?: any
    user?: any
  }
}

export {}
