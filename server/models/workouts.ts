import mongoose from 'mongoose'

const exercisesSchema = new mongoose.Schema({
  equipment: { type: String },
  gifUrl: { type: String },
  id: { type: String },
  name: { type: String },
  target: { type: String },
})

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
