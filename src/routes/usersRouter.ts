import express from 'express'

import handleValidationErrors from '../utils/handle-validations-error'

import { getUserById, getUsers } from '../controllers/usersController'
import getUserByIdValidation from '../validations/user/get-user-by-id-validation'

const router = express.Router()

router.get('/', getUsers)

router.get('/:id', getUserByIdValidation, handleValidationErrors, getUserById)

export default router
