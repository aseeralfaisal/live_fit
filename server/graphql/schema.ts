import { gql } from 'apollo-server-express'

const typeDefs = gql`
  type User {
    user: String!
    pass: String!
  }
  type Exercise {
    bodyPart: String!
    equipment: String!
    gifUrl: String!
    id: String!
    name: String!
    target: String!
  }
  type Query {
    getUser: [User!]
  }
  type Mutation {
    addUser(user: String!, pass: String!): User!
    loginUser(user: String!, pass: String!): User!
    getExercise(target: String!): [Exercise!]
  }
`
export default typeDefs
