const { ApolloError } = require('apollo-server-express')
const User = require('../../models/user')
const bcrypt = require('bcrypt')
const saltRounds = process.env.SALT_ROUNDS 

// interface argsType {
//   name: string
//   pass: string
// }
const resolvers = {
  Query: {
    getUser: () => User.find().then((item) => item),
  },
  Mutation: {
    async addUser(parent, args) {
      const { name, pass } = args
      try {
        const salt = await bcrypt.genSalt(+saltRounds)
        const hashPass = await bcrypt.hash(pass, salt)
        User.sync()
        const userExists = await User.findOne({ where: { user: name } })
        if (userExists?.dataValues.user !== name) {
          const user = await User.create({ user: name, pass: hashPass })
          return user
        }
      } catch (err) {
        console.log(err)
      }
    },

    async loginUser(parent, args) {
      const { name, pass } = args
      const userExists = await User.findOne({ name })
      const compareExists = await bcrypt.compare(pass, userExists.pass)
      return compareExists
    },
  },
}
module.exports = resolvers
