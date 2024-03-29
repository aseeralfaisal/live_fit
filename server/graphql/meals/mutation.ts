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
  async setMeals(
    _: any,
    { meal, date, type, userName }: { meal: object[]; date: String; type: string; userName: string }
  ) {
    try {
      const mealType = { breakfast: 'breakfast', lunch: 'lunch', snack: 'snack', dinner: 'dinner' }
      const setCalories = async () => {
        const calories = await getTotal('calories')
        return await Meal.findOneAndUpdate({ date }, { calories })
      }
      const mealFound = await Meal.findOne({ date, userName })
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
        date,
        userName,
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
    let foundMealObj: any
    let sum = 0
    if (mealFound) {
      if (type === mealType.breakfast) {
        foundMealObj = mealFound.breakfast
      } else if (type === mealType.snack) {
        foundMealObj = mealFound.snack
      } else if (type === mealType.lunch) {
        foundMealObj = mealFound.lunch
      } else {
        foundMealObj = mealFound.dinner
      }
      foundMealObj.forEach(({ calories }) => {
        sum += calories
      })
      return sum.toString()
    }
  },
  async getNutritionByDate(_: any, { dateString, userName }) {
    console.log(dateString)
    const response = await Meal.findOne({ date: dateString, userName })
    return response
  },
  async removeFoodItem(_: any, { food, date, type }) {
    const foundMeal = await Meal.findOne({ date })
    let foundMealObj
    switch (type) {
      case 'breakfast':
        foundMealObj = foundMeal.breakfast
        break
      case 'lunch':
        foundMealObj = foundMeal.lunch
        break
      case 'dinner':
        foundMealObj = foundMeal.dinner
        break
      default:
        foundMealObj = foundMeal.snack
    }
    if (foundMealObj) {
      const remove = await foundMealObj.forEach(async (foodItem) => {
        if (foodItem.food === food) {
          await foodItem.remove()
        }
      })
      const save = await foundMeal.save()
      if (save) {
        const calories = await getTotal('calories')
        await foundMeal.updateOne({ calories: calories })
        return await foundMeal.save()
      }
    }
  },
}
module.exports = meals
export {}
