const mongoose = require('mongoose')
const Schema = mongoose.Schema

interface SpecificMealType {
  food: string
  calories: number
  carbs: number
  protein: number
  fats: number
}
interface MealType {
  date: String
  calories: Number
  breakfast: object[]
  lunch: object[]
  snack: object[]
  dinner: object[]
}

const SpecificMeal: SpecificMealType = new Schema({
  food: String,
  calories: Number,
  carbs: Number,
  protein: Number,
  fats: Number,
})
const Meal: MealType = new Schema(
  {
    date: String,
    calories: Number,
    breakfast: [SpecificMeal],
    lunch: [SpecificMeal],
    snack: [SpecificMeal],
    dinner: [SpecificMeal],
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Meal', Meal)
export {}
