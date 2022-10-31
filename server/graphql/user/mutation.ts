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
  async changeInfo(_: any, { type, userName, value }) {
    const infoTypes = {
      calorieGoal: 'calorieGoal',
      squat: 'squat',
      bench: 'bench',
      deadlift: 'deadlift',
      height: 'height',
      weight: 'weight',
      bodyFat: 'bodyFat',
    }
    let filter
    switch (type) {
      case infoTypes.calorieGoal:
        filter = { calorieGoal: value }
        break
      case infoTypes.squat:
        filter = { squat: value }
        break
      case infoTypes.bench:
        filter = { bench: value }
        break
      case infoTypes.deadlift:
        filter = { deadlift: value }
        break
      case infoTypes.height:
        filter = { height: value }
        break
      case infoTypes.weight:
        filter = { weight: value }
        break
      case infoTypes.bodyFat:
        filter = { bodyFat: value }
        break
    }
    const options = { upsert: true, new: true, setDefaultsOnInsert: true }
    const res = await User.findOneAndUpdate({ user: userName }, filter, options)
    const save = res.save()
    return save
  },
  async getUserInfo(_: any, { user }) {
    const response = await User.findOne({ user })
    console.log(response)
    return response
  },
}
module.exports = user
export {}
