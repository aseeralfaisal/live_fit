import mongoose from 'mongoose'
import exercisesSchema from './exercise'

const Workouts = new mongoose.Schema(
  {
    userName: { type: String },
    workoutName: { type: String },
    exercises: {
      type: [exercisesSchema],
    },
  },
  { timestamps: true }
)

export default mongoose.model('Workouts', Workouts)
