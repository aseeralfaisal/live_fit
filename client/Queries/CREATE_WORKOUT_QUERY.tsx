export const CREATE_WORKOUT_QUERY = `mutation CreateUpdateWorkout($userName: String!, $workoutName: String!, $exercises: [WorkoutInput]) {
    createUpdateWorkout(userName: $userName, workoutName: $workoutName, exercises: $exercises) {
      workoutName
      userName
      exercises {
        equipment
        gifUrl
        id
        name
        target
      }
    }
  }`