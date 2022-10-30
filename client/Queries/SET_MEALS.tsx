export const SET_MEALS = `mutation SetMeals($meal: [SpecificMealInput], $date: String, $type: String, $userName: String) {
    setMeals(meal: $meal, date: $date, type: $type, userName: $userName) {
      food
      calories
      carbs
      protein
      fats
    }
  }`