const bcrypt = require('bcrypt')
const { ApolloError } = require('apollo-server-express')
const saltRounds = process.env.SALT_ROUNDS as unknown as number
const exercises = require('../../Data/exercises.json')
const User = require('../../models/user')
const Meal = require('../../models/meal')
const Workouts = require('../../models/workouts')
const axios = require('axios')

interface argsType {
  name: string
  pass: string
}

const resolvers = {
  Query: {
    test: () => 'hello',
  },
  Mutation: {
    async addUser(_: any, args: argsType) {
      const { name, pass } = args
      try {
        const salt = await bcrypt.genSalt(saltRounds)
        const hash = await bcrypt.hash(pass, salt)
        const user = new User({
          user: name,
          pass: hash,
        })
        const userExists = await User.findOne({ user: user.user })
        if (!userExists) {
          await user.save()
        }
        return user
      } catch (err) {
        console.log(err)
      }
    },
    async loginUser(parent: undefined, args: argsType) {
      const { name, pass } = args
      const userExists = await User.findOne({ user: name })
      if (userExists) {
        const passCompare = await bcrypt.compare(pass, userExists.pass)
        if (passCompare) {
          return userExists
        } else {
          return new ApolloError('Password do not match')
        }
      } else {
        return new ApolloError("User doesn't exist")
      }
    },
    async getExercise(_: any, { target }: { target: string }) {
      try {
        const { chest, back, legs, shoulders, arms } = exercises
        switch (target) {
          case 'chest':
            return chest
          case 'back':
            return back
          case 'legs':
            return legs
          case 'shoulders':
            return shoulders
          case 'arms':
            return arms
          default:
            return null
        }
      } catch (err) {
        console.log(err)
      }
    },
    async createUpdateWorkout(_: any, { userName, workoutName, exercises }) {
      try {
        const user = await User.findOne({ user: userName })
        if (user) {
          const workoutFound = await Workouts.findOne({ workoutName })
          if (workoutFound) {
            exercises.forEach((exercise: object) => {
              workoutFound.exercises.push(exercise)
            })
            const found = await workoutFound.save()
            console.log(found)
            const result = await Workouts.find({ userName })
            return result
          } else {
            const workouts = new Workouts({
              userName,
              workoutName,
              exercises,
            })
            await workouts.save()
            const result = await Workouts.find({ userName })
            return result
          }
        } else {
          return new ApolloError('User not found')
        }
      } catch (err) {
        console.log(err)
      }
    },
    async getUserWorkouts(_: any, { userName }) {
      try {
        const user = await User.findOne({ user: userName })
        if (!user) return new ApolloError('Invalid User')
        const workoutsFound = await Workouts.find({ userName })
        return workoutsFound
      } catch (err) {
        console.log(err)
      }
    },
    async getUserWorkout(_: any, { workoutName, userName }) {
      try {
        const user = await User.findOne({ user: userName })
        if (!user) return new ApolloError('Invalid User')
        const workoutsFound = await Workouts.find({ workoutName })
        if (workoutsFound) return workoutsFound
      } catch (err) {
        console.log(err)
      }
    },
    async addSetsReps(_: any, { workoutName, userName, exerciseName, setsReps }) {
      try {
        const user = await User.findOne({ user: userName })
        if (user) {
          const workoutFound = await Workouts.findOne({ workoutName })
          if (workoutFound) {
            workoutFound.exercises.forEach(async (item) => {
              if (item.name === exerciseName) {
                setsReps.forEach((elem: object) => {
                  item.sets.push(elem)
                })
                await workoutFound.save()
              }
            })
            return workoutFound
          }
        }
      } catch (err) {
        console.log(err)
      }
    },
    async deleteSet(_: any, { workoutName, userName, id }) {
      try {
        const user = await User.findOne({ user: userName })
        if (user) {
          const workoutFound = await Workouts.findOne({ workoutName })
          if (!workoutFound) return new ApolloError('Invalid workout name')
          workoutFound.exercises.forEach(async (item) => {
            item.sets.forEach(async (set) => {
              if (set.id === id) {
                await set.remove()
              }
            })
          })
          await workoutFound.save()
          return workoutFound
        }
      } catch (err) {
        console.log(err)
      }
    },
    async updateSet(_: any, { workoutName, userName, id, reps, weight }) {
      try {
        const user = await User.findOne({ user: userName })
        if (user) {
          const workoutFound = await Workouts.findOne({ workoutName })
          if (!workoutFound) return new ApolloError('Invalid workout name')
          workoutFound.exercises.forEach(async (item) => {
            item.sets.forEach(async (set) => {
              if (set.id === id) {
                set.$set({
                  reps,
                  weight,
                })
                // console.log(set)
              }
            })
          })
          await workoutFound.save()
          return workoutFound
        }
      } catch (err) {
        console.log(err)
      }
    },
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
    async setMeals(_: any, { meal, type }) {
      try {
        const date = new Date().toISOString().split('T')[0]
        const mealFound = await Meal.findOne({ date: date.toString() })
        const mealType = { breakfast: 'breakfast', lunch: 'lunch', snack: 'snack', dinner: 'dinner' }
        if (mealFound) {
          meal.forEach(async (item) => {
            switch (type) {
              case mealType.breakfast:
                mealFound.breakfast.push(item)
              case mealType.lunch:
                mealFound.lunch.push(item)
              case mealType.snack:
                mealFound.snack.push(item)
              case mealType.dinner:
                mealFound.dinner.push(item)
              default:
                return null
            }
          })
          const res = await mealFound.save()
          console.log(res.snack)
          return res.snack
        }
        const Meals = new Meal({
          breakfast: meal,
          date,
        })
        const res = await Meals.save()
        console.log(res.snack)
        return res.snack
      } catch (error) {
        console.log(error)
      }
    },
  },
}
module.exports = resolvers
export {}
