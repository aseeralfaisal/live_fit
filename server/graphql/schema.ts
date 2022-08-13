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
  input WorkoutInput {
    equipment: String!
    gifUrl: String!
    id: String!
    name: String!
    target: String!
  }
  type Workout {
    workoutName: String!
    userName: String!
    exercises: [Exercise!]
  }
  input setRepsWeightinput {
    set: Int
    reps: Int
    weight: Int
  }
  type setRepsWeightMain {
    set: Int
    reps: Int
    weight: Int
  }
  type Mutation {
    addUser(name: String!, pass: String!): User!
    loginUser(name: String!, pass: String!): User!
    getExercise(target: String!): [Exercise!]
    createWorkout(userName: String!, workoutName: String!, exercises: [WorkoutInput]): [Workout]
    getUserWorkouts(userName: String!): [Workout]
    getUserWorkout(userName: String!, workoutName: String!): [Workout]
    addSetsReps(
      userName: String
      workoutName: String
      exerciseName: String
      setsReps: [setRepsWeightinput]
    ): Workout
  }
`
export default typeDefs
