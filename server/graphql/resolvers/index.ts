import bcrypt from 'bcrypt'
import { ApolloError } from 'apollo-server-express'
const saltRounds = process.env.SALT_ROUNDS as unknown as number
import exercises from '../../Data/exercises.json' assert { type: 'json' }
import User from '../../models/user'
import Workouts from '../../models/workouts'

interface argsType {
  name: string
  pass: string
}

const resolvers = {
  Query: {
    getUser: () => User.find(),
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
    async createWorkout(_: any, { userName, workoutName, exercises }) {
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
        if (user) {
          const workoutsFound = await Workouts.find({ userName })
          return workoutsFound
        }
      } catch (err) {
        console.log(err)
      }
    },
    async getUserWorkout(_: any, { workoutName, userName }) {
      try {
        const user = await User.findOne({ user: userName })
        if (user) {
          const workoutsFound = await Workouts.find({ workoutName })
          if (workoutsFound) {
            return workoutsFound
          }
        } else {
          return new Error('User not found')
        }
      } catch (err) {
        console.log(err)
      }
    },
  },
}
export default resolvers
