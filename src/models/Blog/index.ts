import mongoose from 'mongoose'

import IBlog from './types'

const BlogSchema = new mongoose.Schema<IBlog>({})

export default BlogSchema
