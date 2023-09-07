import { body } from 'express-validator'

import isEmailExists from '../custom/is-email-exists'
import isUsernameExists from '../custom/is-username-exists'

const checkIsAvailableUserValidations = [
	body('email', 'Please provide email').optional().isEmail().custom(isEmailExists),
	body('username', 'Please provide email').optional().isString().custom(isUsernameExists),
]

export default checkIsAvailableUserValidations
