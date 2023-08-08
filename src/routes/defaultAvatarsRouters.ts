import express from 'express'

import { getAllDefaultAvatars } from '../controllers/defaultAvatarsController'

const router = express.Router()

router.get('/', getAllDefaultAvatars)

export default router
