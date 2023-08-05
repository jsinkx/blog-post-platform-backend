import mongoose from 'mongoose'

interface IUser {
	firstName: string
	lastName: string
	patronymic: string
	email: string
	passwordHash: string
	avatar?: string
	posts: mongoose.Schema.Types.ObjectId
	blogs: mongoose.Schema.Types.ObjectId
}
export default IUser
