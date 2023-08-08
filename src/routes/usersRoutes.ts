import express from 'express'

import handleValidationErrors from '../utils/handle-validations-error'

import { editUser, getUserById, getUsers } from '../controllers/UsersController'
import { isAuthed } from '../middlewares/is-authed'
import editUserValidations from '../validations/users/edit-user-validations'
import getUserByIdValidations from '../validations/users/get-user-by-id-validations'

const router = express.Router()

router.get('/', getUsers)

router.get('/:id', getUserByIdValidations, handleValidationErrors, getUserById)

router.post('/edit', isAuthed, editUserValidations, handleValidationErrors, editUser)

export default router
