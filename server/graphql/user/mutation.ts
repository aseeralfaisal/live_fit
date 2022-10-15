const bcrypt = require('bcrypt')
const saltRounds = process.env.SALT_ROUNDS as unknown as number
const User = require('../../models/user')
const { ApolloError } = require('apollo-server-express')

interface argsType {
  name: string
  pass: string
}
const user = {
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
}
module.exports = user
export {}
