import express from 'express'
import APIRoutes from './routes/api/index'
import { responseHandler, finalResponseHandler } from './middlewares'

const app = express()

app.use(express.json()) // Parse JSON bodies

app.use(responseHandler) // Attach response helper

app.use('/api', APIRoutes) // API Routes

// Or send JSON for API requests
app.use((req, res, next) => {
  res.status(404).json({ message: 'Not Found' })
})

app.use(finalResponseHandler) // Global response handler

export default app
