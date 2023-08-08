import type { Request, Response } from 'express'

import { TypedRequestParams } from '../interfaces/TypedRequest'

import disabledUserProperties from '../shared/disabled-user-properties'

import User from '../models/User'

/**
 * @route GET
 * @description Getting all users
 */
export const getUsers = async (_req: Request<{}>, res: Response) => {
	try {
		const users = await User.find({}, disabledUserProperties)

		res.status(200).json(users)
	} catch {
		res.status(500).json({ message: 'Failed to get users, try again later' })
	}
}

/**
 * @route GET
 * @description Getting user by id
 */
export const getUserById = async (
	req: TypedRequestParams<{ id?: string }>,
	res: Response,
) => {
	try {
		const { id } = req.params

		const user = await User.findById(id, disabledUserProperties)

		if (user) return res.status(200).json(user)

		res.status(404).json({ message: 'Failed to get this user' })
	} catch {
		res.status(500).json({ message: 'Failed to get user, try again later' })
	}
}
