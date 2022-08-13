import mongoose from 'mongoose'

const sets = new mongoose.Schema({
  set: Number,
  reps: Number,
  weight: Number,
})

const setsSchema = new mongoose.Schema(
  {
    workoutName: String,
    userName: String,
    sets: [sets]
  },
  { timestamps: true }
)

export default mongoose.model('Sets', setsSchema)
