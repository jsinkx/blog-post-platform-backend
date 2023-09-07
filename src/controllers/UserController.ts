import type { Request, Response } from 'express'

import IUser from '../models/User/types'

import { TypedRequestBody, TypedRequestParams } from '../interfaces/TypedRequest'

import disabledUserProperties from '../shared/disabled-user-properties'

import { IsAuthedReq } from '../middlewares/is-authed'

import User from '../models/User'

type EditUserRequestBody = Omit<IUser, 'passwordHash' | 'posts' | 'blogs'>

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

/**
 * @route PATCH
 * @description Edit profile
 */
export const editUser = async (
	req: IsAuthedReq & TypedRequestBody<EditUserRequestBody>,
	res: Response,
) => {
	try {
		const id = String(req?.user?._id)

		const { username, firstName, lastName, patronymic, avatarUrl } = req.body

		if (id) {
			const updatedUser = await User.findByIdAndUpdate(
				id,
				{
					username,
					firstName,
					lastName,
					patronymic,
					avatarUrl,
				},
				{ new: true },
			).select('-__v -passwordHash')

			return res.status(200).json(updatedUser)
		}

		throw Error
	} catch {
		res.status(500).json({ message: 'Failed to edit user profile, try again later' })
	}
}

/**
 * @route POST
 * @description Check is values for user available
 */
export const checkIsAvailableUser = async (_: Request, res: Response) => {
	try {
		res.status(200).json({ message: 'Available' })
	} catch {
		res
			.status(500)
			.json({ message: 'Failed to check is available user profile fields, try again later' })
	}
}
