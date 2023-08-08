import dotenv from 'dotenv'

dotenv.config()

export const { PORT } = process.env || 5000
export const DB_URL = process.env.DB_URL || ''
export const IS_PROD = process.env.NODE_ENV === 'production'
export const SERVER_URL = IS_PROD ? process.env.SERVER_URL : `http://localhost:${PORT}`
export const SECRET = process.env.SECRET || 'secret123'

export const MAX_AVATAR_SIZE = 7 * 1024 * 1024
