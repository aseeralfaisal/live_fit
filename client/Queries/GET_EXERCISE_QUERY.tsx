export const GET_EXERCISE_QUERY = `mutation GetUserWorkout($userName: String!, $workoutName: String!) {
    getUserWorkout(userName: $userName, workoutName: $workoutName) {
      workoutName
      userName
      exercises {
        equipment
        gifUrl
        id
        name
        target
        sets {
          reps
          weight
          _id
        }
      }
    }
  }`
