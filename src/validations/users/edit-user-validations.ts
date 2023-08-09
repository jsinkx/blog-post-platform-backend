import { body } from 'express-validator'

import isUsernameExists from '../custom/is-username-exists'

const editUserValidations = [
	body('username', 'Please provide username length from 1 to 25 symbols')
		.optional()
		.isString()
		.isLength({
			min: 1,
			max: 25,
		})
		.custom(isUsernameExists),
	body('firstName', 'Please provide your first name').optional().isString(),
	body('lastName', 'Please provide your last name').optional().isString(),
	body('patronymic', 'Please provide valid patronymic').optional().isString(),
	body('avatarUrl', 'Please provide your email').optional().isString(),
]

export default editUserValidations
