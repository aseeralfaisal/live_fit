export const EXERCISE_DELETE_QUERY = `mutation DeleteSet($workoutName: String!, $userName: String!, $deleteSetId: String!) {
    deleteSet(workoutName: $workoutName, userName: $userName, id: $deleteSetId) {
      exercises {
        sets {
          set
          reps
          weight
          _id
        }
      }
    }
  }`
