import express from 'express'
import dotenv from 'dotenv'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'

import productsRoutes from './routes/productRoutes.js'

dotenv.config()

connectDB()
const app = express()

app.get('/', (req, res) => {
  res.send('API is running')
})

app.use('/api/products', productsRoutes)

// middleware to handle custom error message - wrong url
app.use(notFound)
// middleware to handle custom error message - wrong product id
app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(
  PORT,
  console.log(`running in ${process.env.NODE_ENV} on port ${PORT}`)
)
