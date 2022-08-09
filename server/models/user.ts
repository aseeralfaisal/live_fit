import mongoose from 'mongoose'

const User = new mongoose.Schema(
  {
    user: {
      type: String,
    },
    pass: {
      type: String,
    },
  },
  { timestamps: true }
)

export default mongoose.model('User', User)
