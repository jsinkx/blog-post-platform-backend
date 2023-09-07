import User from '../../models/User'

const isEmailExists = async (email: string) => {
	const userWithThisEmail = await User.find({ email })

	if (userWithThisEmail.length !== 0)
		throw Error('A user already exists with this e-mail address')
}

export default isEmailExists
