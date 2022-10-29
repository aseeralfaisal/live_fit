export const SET_MEALS = `mutation SetMeals($meal: [SpecificMealInput], $date: String, $type: String) {
    setMeals(meal: $meal, date: $date, type: $type) {
      food
      calories
      carbs
      protein
      fats
    }
  }`