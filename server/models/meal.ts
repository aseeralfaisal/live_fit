const mongoose = require('mongoose')

const SpecificMeal = new mongoose.Schema({
  food: String,
  calories: Number,
  carbs: Number,
  protein: Number,
  fats: Number,
})
const Meal = new mongoose.Schema({
  date: String,
  breakfast: [SpecificMeal],
  lunch: [SpecificMeal],
  snack: [SpecificMeal],
  dinner: [SpecificMeal],
})

module.exports = mongoose.model('Meal', Meal)
export {}
