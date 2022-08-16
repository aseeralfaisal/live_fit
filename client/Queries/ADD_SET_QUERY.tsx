export const ADD_SET_QUERY = `mutation AddSetsReps($userName: String, $workoutName: String, $exerciseName: String, $setsReps: [setRepsWeightinput]) {
    addSetsReps(userName: $userName, workoutName: $workoutName, exerciseName: $exerciseName, setsReps: $setsReps) {
      userName
      workoutName
      exercises {
        sets {
          reps
          set
          weight
          _id
        }
      }
    }
  }`
