import express from 'express'
import mongoose from 'mongoose'

import { DB_URL, PORT } from './shared/constants.js'

import usersRouter from './routes/usersRouter.js'

const app = express()

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Connect routes
app.use('/api/users', usersRouter)

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
