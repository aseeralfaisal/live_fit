import bcrypt from 'bcrypt'
import { ApolloError } from 'apollo-server-express'
const saltRounds = process.env.SALT_ROUNDS as unknown as number
import exercises from '../../Data/exercises.json' assert { type: 'json' }
import User from '../../models/user'

interface argsType {
  name: string
  pass: string
}

const resolvers = {
  Query: {
    getUser: () => User.find(),
  },
  Mutation: {
    async addUser(parent: undefined, args: argsType) {
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
          return new ApolloError("Password do not match")
        }
      } else {
        return new ApolloError("User doesn't exist")
      }
    },
    async getExercise(_: undefined, { target }: { target: string }) {
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
  },
}
export default resolvers
