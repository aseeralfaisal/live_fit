const Meal = require('../../models/meal')
const { startOfDay, subDays } = require('date-fns')

interface mealsType {
  carbs: number
  protein: number
  fats: number
  calories: number
}
const getTotal = async (macro: string) => {
  let sum = 0
  const getSum = (meal: object[]) =>
    meal.forEach(({ carbs, protein, fats, calories }: mealsType) => {
      switch (macro) {
        case 'carbs':
          sum += carbs
        case 'protein':
          sum += protein
        case 'fats':
          sum += fats
        default:
          sum += calories
      }
    })
  const date = new Date().toISOString().split('T')[0].toString()
  const mealFound = await Meal.findOne({ date })
  if (mealFound) {
    const { breakfast, snack, lunch, dinner } = mealFound
    getSum(breakfast)
    getSum(snack)
    getSum(lunch)
    getSum(dinner)
  }
  return sum.toString()
}
const meals = {
  carbsTotal: async () => await getTotal('carbs'),
  proteinTotal: async () => await getTotal('protein'),
  fatsTotal: async () => await getTotal('fats'),
  caloriesTotal: async () => await getTotal('calories'),
  sevenDaysIntake: async () => {
    const filter = startOfDay(subDays(new Date(), 6))
    const filtered = await Meal.find().where('createdAt').gt(filter)
    return filtered
  },
}
module.exports = meals
export {}