/* eslint-disable import/order */

/* eslint-disable import/prefer-default-export */
import { Request, Response } from 'express'
import fs from 'fs'
import path from 'path'

type DefaultAvatars = {
	name: string
	fileName: string
}

export const getAllDefaultAvatars = async (_req: Request, res: Response) => {
	try {
		const avatarsPath = path.resolve(`${__dirname}../../../static/default-avatars/`)
		const avatars: DefaultAvatars[] = []

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
	} catch (e) {
		console.log(e)
		res.status(500).json({ message: 'Failed to get default avatars, try again later' })
	}
}
