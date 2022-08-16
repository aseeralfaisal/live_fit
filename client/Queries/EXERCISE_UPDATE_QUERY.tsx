export const EXERCISE_UPDATE_QUERY = `mutation updateSet($workoutName: String!, $userName: String!, $updateSetId: String!, $reps: Int, $weight: Int) {
    updateSet(workoutName: $workoutName, userName: $userName, id: $updateSetId, reps: $reps, weight: $weight) {
      exercises {
        sets {
          reps
        weight
      }
    }
  }
}`
