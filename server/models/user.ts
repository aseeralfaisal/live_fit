const mongoose = require('mongoose')

const User = new mongoose.Schema(
  {
    user: String,
    pass: String,
    squat: Number,
    bench: Number,
    deadlift: Number,
    calorieGoal: Number,
    height: Number,
    weight: Number,
    bodyFat: Number,
  },
  { timestamps: true }
)

module.exports = mongoose.model('User', User)
export {}
