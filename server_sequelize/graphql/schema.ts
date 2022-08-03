import { gql } from 'apollo-server-express'

const typeDefs = gql`
  type User {
    user: String!
    pass: String!
  }
  type Query {
    getUser: [User!]
  }
  type Mutation {
    addUser(user: String!, pass: String!): User!
    loginUser(user: String!, pass: String!): User!
  }
`
export default typeDefs
