import express from 'express'

import handleValidationErrors from '../utils/handle-validations-error'

import {
	checkIsAvailableUser,
	editUser,
	getUserById,
	getUsers,
} from '../controllers/UserController'

import checkIsAvailableUserValidations from '../validations/users/check-is-available-user-validations'
import editUserValidations from '../validations/users/edit-user-validations'
import getUserByIdValidations from '../validations/users/get-user-by-id-validations'

import { isAuthed } from '../middlewares/is-authed'

const router = express.Router()

router.get('/', getUsers)

router.get('/:id', getUserByIdValidations, handleValidationErrors, getUserById)

router.patch('/edit', isAuthed, editUserValidations, handleValidationErrors, editUser)

router.post(
	'/check-is-available',
	checkIsAvailableUserValidations,
	handleValidationErrors,
	checkIsAvailableUser,
)

export default router
