import mongoose from "mongoose"
const exercisesSchema = new mongoose.Schema(
    {
      equipment: String,
      gifUrl: String,
      id: String,
      name: String,
      target: String
    },
  )

  export default exercisesSchema