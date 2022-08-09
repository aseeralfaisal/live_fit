
import mongoose, { mongo } from "mongoose"
const Schema = mongoose.Schema

const User = new Schema({
    user: {
      type: String,
      required: true,
    },
    pass: {
      type: String,
    },
  },
  { timestamps: true }
)

export default mongoose.model("User", User)