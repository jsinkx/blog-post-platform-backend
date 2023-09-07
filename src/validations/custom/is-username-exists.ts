import User from '../../models/User'

const isUsernameExists = async (username: string) => {
	const userWithThisUsername = await User.find({ username })

	if (userWithThisUsername.length !== 0)
		throw Error('A user already exists with this username')
}

export default isUsernameExists
