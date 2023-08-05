import mongoose from 'mongoose'

import IUser from './types'

const UserSchema = new mongoose.Schema<IUser>(
	{
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		patronymic: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		passwordHash: {
			type: String,
			required: true,
		},
		avatar: {
			type: String,
			required: false,
		},
		posts: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Post',
			required: true,
		},
		blogs: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Blog',
			required: true,
		},
	},
	{
		timestamps: true,
	},
)

export default mongoose.model('User', UserSchema)
