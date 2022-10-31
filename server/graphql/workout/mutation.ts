const exercises = require('../../../Data/exercises.json')
const User = require('../../models/user')
const { ApolloError } = require('apollo-server-express')
const Workouts = require('../../models/workouts')

const workout = {
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
}
module.exports = workout
export {}
