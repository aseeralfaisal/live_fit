const axios = require('axios')
const Meal = require('../../models/meal')
const { isEqual } = require('date-fns')

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
  async getFoodCalories(_: any, { query }) {
    try {
      const res = await axios.get(`https://api.calorieninjas.com/v1/nutrition?query=${query}`, {
        headers: {
          'X-Api-Key': 'LUqUEvZwtBGEm9YqPvcb5g==rwCrBFMK8LHjYWQI',
        },
      })
      return res.data.items
    } catch (err) {
      console.log(err)
    }
  },
  async setMeals(_: any, { meal, date, type }: { meal: object[]; date: String; type: string }) {
    try {
      const mealType = { breakfast: 'breakfast', lunch: 'lunch', snack: 'snack', dinner: 'dinner' }
      const todaysDateString = new Date().toISOString().split('T')[0]
      const setCalories = async () => {
        const calories = await getTotal('calories')
        const filter = { date: todaysDateString }
        const update = { calories: calories }
        return await Meal.findOneAndUpdate(filter, update)
      }
      const mealFound = await Meal.findOne({ date })
      let mealFoundType: object[]
      if (mealFound) {
        meal.forEach((item: object[]) => {
          if (type === mealType.breakfast) {
            mealFoundType = mealFound.breakfast
          } else if (type === mealType.lunch) {
            mealFoundType = mealFound.lunch
          } else if (type === mealType.snack) {
            mealFoundType = mealFound.snack
          } else if (type === mealType.dinner) {
            mealFoundType = mealFound.dinner
          }
          mealFoundType.push(item)
        })
        await mealFound.save()
        await setCalories()
        return mealFoundType
      }
      const setMealHelper = (mealType: string) => (type === mealType ? meal : [])
      const Meals = new Meal({
        breakfast: setMealHelper(mealType.breakfast),
        lunch: setMealHelper(mealType.lunch),
        snack: setMealHelper(mealType.snack),
        dinner: setMealHelper(mealType.dinner),
        date: todaysDateString,
      })
      await Meals.save()
      await setCalories()
      return mealFoundType
    } catch (error) {
      console.log(error)
    }
  },
  async getCaloriesCount(_: any, { type }) {
    const mealType = { breakfast: 'breakfast', lunch: 'lunch', snack: 'snack', dinner: 'dinner' }
    const date = new Date().toISOString().split('T')[0]
    const mealFound = await Meal.findOne({ date: date.toString() })
    let mealObj: any
    let sum = 0
    if (mealFound) {
      if (type === mealType.breakfast) {
        mealObj = mealFound.breakfast
      } else if (type === mealType.snack) {
        mealObj = mealFound.snack
      } else if (type === mealType.lunch) {
        mealObj = mealFound.lunch
      } else {
        mealObj = mealFound.dinner
      }
      mealObj.forEach(({ calories }) => {
        sum += calories
      })
      return sum.toString()
    }
  },
  async getNutritionByDate(_: any, { dateString }) {
    const date = new Date(dateString).toISOString().split('T')[0]
    const response = await Meal.findOne({ date })
    return response
  },
  async removeFoodItem(_: any, { food, date, type }) {
    const foundMeal = await Meal.findOne({ date })
    let foundMealType
    switch (type) {
      case 'breakfast':
        foundMealType = foundMeal.breakfast
        break
      case 'lunch':
        foundMealType = foundMeal.lunch
        break
      case 'dinner':
        foundMealType = foundMeal.dinner
        break
      default:
        foundMealType = foundMeal.snack
    }
    if (foundMealType) {
      foundMealType.forEach(async (foodItem) => {
        if (foodItem.food === food) {
          await foodItem.remove()
        }
      })
      const save = await foundMeal.save()
      return save
    }
  },
}
module.exports = meals
export {}
