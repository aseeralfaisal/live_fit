import User from '../../models/user'
import bcrypt from 'bcrypt'
import { ApolloError } from 'apollo-server-express'
const saltRounds = process.env.SALT_ROUNDS as unknown as number
import exercises from '../../Data/exercises.json' assert { type: 'json' }
import chosenExercise from '../../models/chosenExercises'

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
        console.log(err)
      }
    },
    async loginUser(_: undefined, args: userArgsType) {
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
        console.log(err)
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
    async setSelectedExercises(_: undefined, { exercises }: any) {
      const bulkCreate = await chosenExercise.bulkCreate(exercises, {
        returning: true,
      })
      console.log(bulkCreate)
      return bulkCreate
    },
    async getSelectedExercises(_: undefined, { user }) {
      const getExercises = await chosenExercise.findAll({
        where: { user: user },
      })
      console.log(getExercises)
      return getExercises
    },
    async deleteSelectedExercises(_: undefined, { equipment, user }) {
      const deleteExercises = await chosenExercise.destroy({
        where: { equipment, user },
      })
      const getExercises = await chosenExercise.findAll({
        where: { user: user, equipment: equipment },
      })
      return getExercises
    },
  },
}
export default resolvers
