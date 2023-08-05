import mongoose from 'mongoose'

import IPost from './types'

const PostSchema = new mongoose.Schema<IPost>({})

export default PostSchema
