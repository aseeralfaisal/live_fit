const mealsQuery = require('./meals/query')
const mealsMutaion = require('./meals/mutation')
const userMutation = require('./user/mutation')
const workoutMutation = require('./workout/mutation')

const resolvers = {
  Query: {
    ...mealsQuery,
  },
  Mutation: {
    ...userMutation,
    ...workoutMutation,
    ...mealsMutaion,
  },
}
module.exports = resolvers
export {}
