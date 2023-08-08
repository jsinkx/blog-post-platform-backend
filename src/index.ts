import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'

import { DB_URL, PORT } from './shared/constants.js'

import authRouter from './routes/authRouter.js'
import defaultAvatarsRouter from './routes/defaultAvatarsRouters.js'
import usersRouter from './routes/usersRouter.js'

const app = express()

// Middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Static
app.use('/default-avatars', express.static('./static/default-avatars'))

// Connect routes
app.use('/api/users', usersRouter)
app.use('/api/auth', authRouter)
app.use('/api/default-avatars', defaultAvatarsRouter)

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
