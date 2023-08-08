import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { Document, Types } from 'mongoose'

import IUser from '../models/User/types'

import { TypedRequestHeaders } from '../interfaces/TypedRequest'

import { SECRET } from '../shared/constants'
import disabledUserProperties from '../shared/disabled-user-properties'

import User from '../models/User'

type AuthMeHeaders = {
	authorization?: string
}

export interface IsAuthedReq extends Request {
	user?:
		| (Document<unknown, {}, IUser> &
				IUser & {
					_id: Types.ObjectId
				})
		| null
}

export const isAuthed = async (
	req: TypedRequestHeaders<AuthMeHeaders> & IsAuthedReq,
	res: Response,
	next: NextFunction,
) => {
	try {
		const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')

		if (token) {
			const decode = jwt.verify(token, SECRET) as unknown as { _id: string }

			const user = await User.findById(decode._id, disabledUserProperties)

			if (user) {
				req.user = user

				return next()
			}
		}

		throw Error
	} catch {
		res.status(500).json({ message: 'Failed to required action, you must be logged in' })
	}
}
