import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'

import { DB_URL, PORT } from './shared/constants.js'

import authRoutes from './routes/authRoutes.js'
import avatarRoutes from './routes/avatarRoutes.js'
import userRoutes from './routes/userRoutes.js'

const app = express()

// Middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Static
app.use('/api/avatars', express.static('./static/avatars'))

// Connect routes
app.use('/api/users', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/avatars', avatarRoutes)

mongoose
	.connect(DB_URL)
	.then(() => {
		app.listen(PORT, () => {
			console.log(`[status] App listening on port ${PORT}`)
		})
	})
	.catch((err) => {
		console.error('[status] Connection failed with error', err)
	})
