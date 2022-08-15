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
    sets: [setRepsWeight]
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
  type setRepsWeight {
    set: Int
    reps: Int
    weight: Int
    id: String
  }
  input setRepsWeightinput {
    set: Int
    reps: Int
    weight: Int
    id: String
  }
  type Mutation {
    addUser(name: String!, pass: String!): User!
    loginUser(name: String!, pass: String!): User!
    getExercise(target: String!): [Exercise!]
    createUpdateWorkout(userName: String!, workoutName: String!, exercises: [WorkoutInput]): [Workout]
    getUserWorkouts(userName: String!): [Workout]
    getUserWorkout(userName: String!, workoutName: String!): [Workout]
    addSetsReps(
      userName: String
      workoutName: String
      exerciseName: String
      setsReps: [setRepsWeightinput]
    ): Workout
    deleteSet(workoutName: String!, userName: String!, id: String!): Workout
    updateSet(workoutName: String!, userName: String!, id: String!, reps: Int, weight: Int): Workout
  }
`
export default typeDefs
