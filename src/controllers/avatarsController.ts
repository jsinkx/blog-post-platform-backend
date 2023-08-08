/* eslint-disable import/order */

/* eslint-disable import/prefer-default-export */
import { Request, Response } from 'express'
import fs from 'fs'
import multer from 'multer'
import path from 'path'

import { MAX_AVATAR_SIZE } from '../shared/constants'

import { IsAuthedReq } from '../middlewares/is-authed'

type DefaultAvatar = {
	name: string
	fileName: string
}

const storage = multer.diskStorage({
	destination: (_, __, cb) => {
		if (!fs.existsSync('static/avatars')) fs.mkdirSync('static/avatars')

		cb(null, 'static/avatars')
	},
	filename: (req: IsAuthedReq, file, cb) => {
		const { user } = req
		const ext = path.extname(file.originalname)

		if (user) {
			return cb(null, `${user._id}-avatar${ext}`)
		}

		cb(null, '')
	},
})

const upload = multer({
	storage,
	limits: { fileSize: MAX_AVATAR_SIZE },
	fileFilter: (_, file, cb) => {
		const ext = path.extname(file.originalname)
		const allowedExt = ['.png', '.jpg', '.jpeg']
		const fileMimeType = file.mimetype.split('/')[0]

		if (fileMimeType === 'image' && allowedExt.includes(ext)) {
			return cb(null, true)
		}

		return cb(new Error('Only png or jpg images are allowed'))
	},
}).single('avatar')

/**
 * @route POST
 * @description Upload avatar
 */
export const uploadAvatar = (req: Request, res: Response) => {
	try {
		upload(req, res, (err) => {
			const { file } = req

			if (!err && file) {
				return res.status(200).json({
					url: `/avatars/${file.filename}`,
				})
			}

			res.status(400).json({
				message: err.message,
			})
		})
	} catch {
		res.status(500).json({ message: 'Failed to upload avatar, try again later' })
	}
}

/**
 * @route GET
 * @description Getting all default avatars
 */
export const getAllDefaultAvatars = (_req: Request, res: Response) => {
	try {
		const avatarsPath = path.resolve(`${__dirname}../../../static/avatars/default-avatars/`)
		const avatars: DefaultAvatar[] = []

		fs.readdirSync(avatarsPath).forEach((file) => {
			avatars.push({
				name: file
					.split('-')
					.slice(2)
					.join('')
					.replace(/\.[^/.]+$/, ''),
				fileName: `/${file}`,
			})
		})

		res.status(200).json(avatars)
	} catch {
		res.status(500).json({ message: 'Failed to get default avatars, try again later' })
	}
}
