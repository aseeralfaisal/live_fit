const mongoose = require('mongoose')
const exercisesSchema = require('./exercise')

const Workouts = new mongoose.Schema(
  {
    userName: String,
    workoutName: String,
    exercises: [exercisesSchema],
  },
  { timestamps: true }
)

module.exports = mongoose.model('Workouts', Workouts)
