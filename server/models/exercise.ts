import mongoose from "mongoose"
const exercisesSchema = new mongoose.Schema(
    {
      equipment: { type: String },
      gifUrl: { type: String },
      id: { type: String },
      name: { type: String },
      target: { type: String }
    },
    { _id: false }
  )

  export default exercisesSchema