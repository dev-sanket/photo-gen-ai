import express from 'express'
import userRoutes from './routes/user.routes'
import modelRouter from './routes/model.routes'
import { responseHandler, finalResponseHandler } from './middlewares'

const app = express()

app.use(express.json()) // Parse JSON bodies

app.use(responseHandler) // Attach response helper

app.use('/api/users', userRoutes) // User Routes
app.use('/api/model', modelRouter) // Model Routes

// Or send JSON for API requests
app.use((req, res, next) => {
  res.status(404).json({ message: 'Not Found' })
})

app.use(finalResponseHandler) // Global response handler

export default app
