import User from '../../models/user'
import bcrypt from 'bcrypt'
import { ApolloError } from 'apollo-server-express'
const saltRounds = process.env.SALT_ROUNDS as unknown as number
import axios from 'axios'
import exercises from '../../Data/exercises.json' assert { type: 'json' }

interface userArgsType {
  user: string
  pass: string
}

const resolvers = {
  Query: {
    getUser: () => User.findAll().then((item: any) => item),
  },
  Mutation: {
    async addUser(_: undefined, args: userArgsType) {
      const { user, pass } = args
      try {
        const salt = await bcrypt.genSalt(+saltRounds)
        const hashPass = await bcrypt.hash(pass, salt)
        const findOne = await User.findOne({ where: { user } })
        if (findOne) {
          return new ApolloError('User already exists')
        } else {
          const newUser = await User.create({ user, pass: hashPass })
          return newUser.toJSON()
        }
      } catch (err) {
        // console.log(err)
      }
    },
    async loginUser(_: undefined, args: userArgsType) {
      const { user, pass } = args
      try {
        const findUser = await User.findOne({ where: { user: user } })
        console.log('USER__FOUND: ___', findUser)
        if (findUser) {
          const passCompare = await bcrypt.compare(pass, findUser.pass)
          console.log('PASSWORD: ___', passCompare)
          if (passCompare) {
            console.log('FIND__USER__JSON: ___', findUser.toJSON())
            return findUser.toJSON()
          } else {
            return new ApolloError("Password's do not match")
          }
        } else {
          return new ApolloError("User doesn't exists")
        }
      } catch (err) {
        // console.log(err)
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
