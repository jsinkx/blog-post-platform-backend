import type { Request, Response } from 'express'
import mongoose from 'mongoose'

import { TypedRequestParams } from '../interfaces/TypedRequest'

import User from '../models/User'

/**
 * @route GET
 * @description Getting all users
 */
export const getUsers = async (_req: Request<{}>, res: Response) => {
	try {
		const users = await User.find({})

		res.status(200).json(users)
	} catch (err) {
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

		if (!id) {
			res.status(400).json({ message: 'Please provide id to get user' })
			return
		}

		if (!mongoose.Types.ObjectId.isValid(id)) {
			res.status(400).json({ message: 'Please provide valid id to get user' })
			return
		}

		const user = await User.findById(id)

		res.status(200).json(user)
	} catch (err) {
		res.status(500).json({ message: 'Failed to get user, try again later' })
	}
}
