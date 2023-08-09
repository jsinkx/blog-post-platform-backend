import express from 'express'

import { getAllDefaultAvatars, uploadAvatar } from '../controllers/AvatarController'
import { isAuthed } from '../middlewares/is-authed'

const router = express.Router()

router.get('/default-avatars', getAllDefaultAvatars)

router.post('/upload', isAuthed, uploadAvatar)
export default router
