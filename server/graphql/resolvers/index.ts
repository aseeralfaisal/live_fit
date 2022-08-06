import User from '../../models/user'
import bcrypt from 'bcrypt'
import { ApolloError } from 'apollo-server-express'
const saltRounds = process.env.SALT_ROUNDS as unknown as number
import axios from 'axios'

interface argsType {
  user: string
  pass: string
}

const resolvers = {
  Query: {
    getUser: () => User.findAll().then((item: any) => item),
    getExercise: async () => {
      try {
        const BASE_URL = `https://exercisedb.p.rapidapi.com/exercises/bodyPart/back`
        const config = {
          headers: {
            'X-RapidAPI-Key':
              'adc17d2ademsh0e623b3458ffb2dp19ade4jsn0d7711bcfd5f',
            'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
          },
        }
        const exercises = await axios.get(BASE_URL, config)
        return exercises.data
      } catch (err) {
        console.log(err)
      }
    },
  },
  Mutation: {
    async addUser(parent: string, args: argsType) {
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
    async loginUser(parent: string, args: argsType) {
      const { user, pass } = args
      try {
        const findUser = await User.findOne({ where: { user: user } })
        if (findUser) {
          const passCompare = await bcrypt.compare(pass, findUser.pass)
          if (passCompare) {
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
  },
}
export default resolvers
