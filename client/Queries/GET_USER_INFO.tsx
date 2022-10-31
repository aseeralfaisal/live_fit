export const GET_USER_INFO = `mutation GetUserInfo($user: String) {
    getUserInfo(user: $user) {
      user
      calorieGoal
      squat
      bench
      deadlift
      height
      weight
      bodyFat
    }
  }`