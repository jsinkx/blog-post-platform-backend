import mongoose from 'mongoose'

interface IUser extends Document {
	username: string
	firstName: string
	lastName?: string
	patronymic?: string
	email: string
	passwordHash: string
	avatarUrl?: string
	posts: mongoose.Schema.Types.ObjectId[]
	blogs: mongoose.Schema.Types.ObjectId[]
}
export default IUser
