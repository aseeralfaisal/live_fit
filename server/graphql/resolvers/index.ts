const { ApolloError } = require('apollo-server-express')
const User = require('../../models/user')
const bcrypt = require('bcrypt')
const saltRounds = process.env.SALT_ROUNDS as unknown as number

interface argsType {
  name: string
  pass: string
}
const resolvers = {
  Query: {
    getUser: () => User.find().then((item: Array<string>) => item),
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
      const userExists = await User.findOne({ name })
      const compareExists = await bcrypt.compare(pass, userExists.pass)
      return compareExists
    },
  },
}
module.exports = resolvers
