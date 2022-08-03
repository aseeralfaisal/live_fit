import User from '../../models/user'
import bcrypt from 'bcrypt'
import { ApolloError } from 'apollo-server-express'
const saltRounds = process.env.SALT_ROUNDS as unknown as number

interface argsType {
  user: string
  pass: string
}

const resolvers = {
  Query: {
    getUser: () => User.findAll().then((item: any) => item),
  },
  Mutation: {
    async addUser(parent: string, args: argsType) {
      const { user, pass } = args
      try {
        const salt = await bcrypt.genSalt(+saltRounds)
        const hashPass = await bcrypt.hash(pass, salt)
        User.sync()
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
