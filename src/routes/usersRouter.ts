import express from 'express'

import handleValidationErrors from '../utils/handle-validations-error'

import { getUserById, getUsers } from '../controllers/usersController'
import getUserByIdValidations from '../validations/users/get-user-by-id-validations'

const router = express.Router()

router.get('/', getUsers)

router.get('/:id', getUserByIdValidations, handleValidationErrors, getUserById)

export default router
