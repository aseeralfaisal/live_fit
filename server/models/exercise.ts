const mongoose = require('mongoose')

const sets = new mongoose.Schema({
  set: Number,
  reps: Number,
  weight: Number,
})
const exercisesSchema = new mongoose.Schema({
  equipment: String,
  gifUrl: String,
  id: String,
  name: String,
  target: String,
  sets: [sets],
})

module.exports = exercisesSchema
export {}
