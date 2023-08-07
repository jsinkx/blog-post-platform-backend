import { param } from 'express-validator'

const getUserByIdValidation = [param('id', 'Please provide valid id').isMongoId()]

export default getUserByIdValidation
