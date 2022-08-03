import { gql } from 'apollo-server-express'

const typeDefs = gql`
type User {
    id: ID! 
    user: String!
    pass: String!
}
type Query {
    getUser: [User!]
}
type Mutation {
    addUser(name: String!, pass: String!): User!
    loginUser(name: String!, pass: String!): Boolean!
}
`;
export default typeDefs