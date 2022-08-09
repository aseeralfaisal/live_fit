import { gql } from 'apollo-server-express'

const typeDefs = gql`
  type User {
    user: String!
    pass: String!
  }
  type Exercise {
    equipment: String!
    gifUrl: String!
    id: String!
    name: String!
    target: String!
  }
  type Query {
    getUser: [User!]
  }
  type Workout {
    workoutName: String!
    userName: String!
    equipment: String!
    gifUrl: String!
    id: String!
    name: String!
    target: String!
  }
  type Mutation {
    addUser(name: String!, pass: String!): User!
    loginUser(name: String!, pass: String!): User!
    getExercise(target: String!): [Exercise!]
    createWorkout(
      workoutName: String!
      userName: String!
      equipment: String!
      gifUrl: String!
      id: String!
      name: String!
      target: String!
    ): [Workout]
    getUserWorkouts(userName: String!): [Workout]
    getUserWorkout(workoutName: String!): [Workout]
  }
  
`
export default typeDefs
