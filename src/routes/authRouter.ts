import express from 'express'

import handleValidationErrors from '../utils/handle-validations-error'

import { authLogin, authMe, authRegister } from '../controllers/authController'
import authLoginValidation from '../validations/auth/auth-login-validation'
import authRegisterValidation from '../validations/auth/auth-register-validation'

const router = express.Router()

router.post('/register', authRegisterValidation, handleValidationErrors, authRegister)

router.post('/login', authLoginValidation, handleValidationErrors, authLogin)

router.get('/me', authMe)

export default router
