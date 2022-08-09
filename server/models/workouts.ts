import mongoose from 'mongoose'

const Workouts = new mongoose.Schema(
  {
    userName: { type: String },
    workoutName: { type: String },
    equipment: { type: String },
    gifUrl: { type: String },
    id: { type: String },
    name: { type: String },
    target: { type: String },
  },
  { timestamps: true }
)

export default mongoose.model('Workouts', Workouts)
