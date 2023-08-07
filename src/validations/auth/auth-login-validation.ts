import { body } from 'express-validator'

const authLoginValidation = [
	body('username', 'Please provide username length from 1 to 25 symbols')
		.isString()
		.isLength({
			min: 1,
			max: 25,
		}),
	body('password', 'Please provide password with length greater than 5 symbols')
		.isString()
		.isLength({ min: 5 }),
]

export default authLoginValidation
