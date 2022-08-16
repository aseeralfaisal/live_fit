export const GET_TARGET_EXERCISE_QUERY = `mutation Mutation($target: String!) {
    getExercise(target: $target) {
      gifUrl
      id
      name
      target
      equipment
    }
  }`
