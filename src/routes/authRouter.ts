import express from 'express'

import { authLogin, authMe, authRegister } from '../controllers/authController'

const router = express.Router()

router.post('/register', authRegister)

router.post('/login', authLogin)

router.get('/me', authMe)

export default router
