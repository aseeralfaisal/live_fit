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
  input selectExercises {
    equipment: String!
    gifUrl: String!
    name: String!
    user: String!
    target: String!
  }
  type chosenExercises {
    equipment: String!
    gifUrl: String!
    name: String!
    user: String!
    target: String!
  }
  type Mutation {
    addUser(user: String!, pass: String!): User!
    loginUser(user: String!, pass: String!): User!
    getExercise(target: String!): [Exercise!]
    setSelectedExercises(exercises: [selectExercises]): [chosenExercises!]
    getSelectedExercises(user: String!): [chosenExercises!]
    deleteSelectedExercises(equipment: String!, user: String!): [chosenExercises!]
  }
`
export default typeDefs
