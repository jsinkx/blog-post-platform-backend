import bcrypt from 'bcrypt'
import type { Response } from 'express'
import jwt from 'jsonwebtoken'

import type IUser from '../models/User/types'

import { TypedRequestBody, TypedRequestHeaders } from '../interfaces/TypedRequest'

import { SECRET } from '../shared/constants'
import disabledUserProperties from '../shared/disabled-user-properties'

import User from '../models/User'

type AuthRegisterBody = Omit<IUser, 'posts' | 'blogs' | 'passwordHash'> & {
	password: string
}

type AuthLoginBody = {
	username: string
	password: string
}

type AuthMeHeaders = {
	authorization?: string
}

/**
 * @route Post
 * @description Register account
 */
export const authRegister = async (
	req: TypedRequestBody<AuthRegisterBody>,
	res: Response,
) => {
	try {
		const { username, firstName, lastName, patronymic, email, password, avatar } = req.body

		const salt = await bcrypt.genSalt(10)
		const passwordHash = await bcrypt.hash(password, salt)

		const user = (await User.create({
			username,
			firstName,
			lastName: lastName || '',
			patronymic: patronymic || '',
			email,
			passwordHash,
			avatar: avatar || '/default-avatars/default-avatar-question.png',
			posts: [],
			blogs: [],
		})) as unknown as IUser & { _doc: IUser & { __v: string; _id: string } }

		const { __v, passwordHash: _passwordHash, ...userData } = user._doc

		res.status(200).json({
			...userData,
			token: jwt.sign({ id: userData._id }, SECRET, { expiresIn: '30d' }),
		})
	} catch {
		res.status(500).json({ message: 'Failed to register, try again later' })
	}
}

/**
 * @route POST
 * @description Login
 */
export const authLogin = async (req: TypedRequestBody<AuthLoginBody>, res: Response) => {
	try {
		const { username, password } = req.body

		const user = (await User.findOne({
			username,
		})) as unknown as IUser & { _doc: IUser & { __v: string; _id: string } }

		if (user) {
			const isValidPassword = await bcrypt.compare(password, user.passwordHash)

			if (isValidPassword) {
				const token = jwt.sign(
					{
						_id: user._doc._id,
					},
					SECRET,
					{
						expiresIn: '30d',
					},
				)

				const { passwordHash, __v, ...userData } = user._doc

				return res.status(200).json({
					...userData,
					token,
				})
			}
		}

		res.status(400).json({
			message: 'Failed to login, wrong username or password',
		})
	} catch {
		res.status(500).json({ message: 'Failed to login, try again later' })
	}
}

/**
 * @route GET
 * @description Getting is user authenticated
 */
export const authMe = async (req: TypedRequestHeaders<AuthMeHeaders>, res: Response) => {
	try {
		const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')

		if (token) {
			const decode = jwt.verify(token, SECRET) as unknown as { _id: string }

			const user = await User.findById(decode._id, disabledUserProperties)

			return res.status(200).json(user)
		}

		throw Error
	} catch {
		res.status(500).json({ message: 'Failed to auth, try again later' })
	}
}
